import express from 'express';
import { createPaypalOrder, capturePaypalPayment } from '../controllers/payment.js';


const router = express.Router();

router.post('/paypal/create-order', createPaypalOrder);
router.post('/paypal/capture-payment/:orderId', capturePaypalPayment);


export default router;
