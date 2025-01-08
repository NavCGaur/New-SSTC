import fetch from 'node-fetch';
import User from '../models/User.js';


// PayPal API endpoints
const PAYPAL_API = {
    sandbox: 'https://api-m.sandbox.paypal.com',
    production: 'https://api-m.paypal.com'
};

// Get base API URL based on environment
const baseURL = process.env.NODE_ENV === 'production' 
    ? PAYPAL_API.production 
    : PAYPAL_API.sandbox;

// Get access token from PayPal
async function getPayPalAccessToken() {
    try {
        const auth = Buffer.from(
            `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
        ).toString('base64');

        const response = await fetch(`${baseURL}/v1/oauth2/token`, {
            method: 'POST',
            body: 'grant_type=client_credentials',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(`PayPal Access Token Error: ${JSON.stringify(data)}`);
        }

        return data.access_token;
    } catch (error) {
        console.error('PayPal Access Token Error:', error);
        throw error;
    }
}

export const createPaypalOrder = async (req, res) => {
    try {
        const { amount, orderId, userId, selectedServices } = req.body;

        // Log incoming request
        console.log('Creating PayPal order:', {
            amount,
            orderId,
            userId,
            selectedServices,
            environment: process.env.NODE_ENV
        });

        // Get access token
        const accessToken = await getPayPalAccessToken();
        
        // Create order
        const orderResponse = await fetch(`${baseURL}/v2/checkout/orders`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [{
                    reference_id: orderId,
                    amount: {
                        currency_code: 'USD',
                        value: amount.toString()
                    }
                }]
            })
        });

        const orderData = await orderResponse.json();

        // Log PayPal response
        console.log('PayPal order created:', {
            orderId: orderData.id,
            status: orderData.status
        });

        if (!orderResponse.ok) {
            throw new Error(`PayPal Order Error: ${JSON.stringify(orderData)}`);
        }

        res.json({ 
            orderID: orderData.id,
            status: orderData.status ,
            userId: userId, // Send userId
            selectedServices: selectedServices // Send selectedServices
        });

    } catch (error) {
        console.error('PayPal Create Order Error:', {
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({ 
            error: 'Error creating PayPal order',
            details: error.message 
        });
    }
};

export const capturePaypalPayment = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { userId, selectedServices } = req.body; // Ensure these are in the request body



        console.log('Capturing PayPal payment:', { orderId, userId, selectedServices });

        // Get access token
        const accessToken = await getPayPalAccessToken();
        
        // Capture payment
        const captureResponse = await fetch(
            `${baseURL}/v2/checkout/orders/${orderId}/capture`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }   
        );

        const captureData = await captureResponse.json();

        // Log capture response
        console.log('PayPal payment captured:', {
            orderId: captureData.id,
            status: captureData.status
        });

        if (!captureResponse.ok) {
            throw new Error(`PayPal Capture Error: ${JSON.stringify(captureData)}`);
        }

        
        // In your PayPal capture endpoint
if (captureData.status === 'COMPLETED') {
    // Extract just the service names from the selectedServices objects
    const serviceNames = selectedServices.map(service => service.name);
    
    console.log('Updating database with service names:', serviceNames);

    const updateResult = await User.findOneAndUpdate(
        { _id: userId },
        {
            $set: {
                "services.$[service].paymentStatus": "Paid",
                "services.$[service].paidOn": new Date()
            }
        },
        {
            arrayFilters: [
                { "service.serviceName": { $in: serviceNames } }
            ],
            new: true
        }
    );

    console.log('Database updated successfully:', updateResult);
}

        // Respond with capture details
        res.json({
            orderId: captureData.id,
            status: captureData.status,
            payerId: captureData.payer?.payer_id,
            paymentSource: captureData.payment_source,
            purchaseUnits: captureData.purchase_units
        });


    } catch (error) {
        console.error('PayPal Capture Error:', {
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({ 
            error: 'Error capturing PayPal payment',
            details: error.message 
        });
    }
};