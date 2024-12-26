import express from 'express';
import dotenv from "dotenv";
import userRoutes from "./routes/user.js"
import { getAllUsers } from './controllers/user.js';
import salesRoutes from "./routes/sales.js"
import authRoutes from "./routes/auth.js"
import { addTestAdmin } from './MockDataGenerator.js';
import {sendEmail} from './controllers/email.js'
import {authenticateToken, authorizeAdmin} from './middleware/authMiddleware.js'

import initializeDueDateChecker from './jobs/dueDateChecker.js';
//import { generateMockData } from './MockDataGenerator.js';
import   UserData from "./data/index.js";
import User from "./models/User.js"


import connectMongoDB from "./config/db.js"

dotenv.config();

const app = express();
app.use(express.json());

// Manually set CORS headers to allow cross-origin requests from localhost:3000
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allow only your frontend origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allowed methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, baggage,sentry-trace'); // Allow custom headers if any
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies, Authorization headers, etc.)

  next();
});

// Handle preflight OPTIONS requests
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, baggage, sentry-trace');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.status(200).end();
});

app.use((req, res, next) => {
  console.log('Incoming request:', {
    method: req.method,
    path: req.path,
    body: req.body
  });
  next();
});

// Routes needing Middleware
app.use("/users", authenticateToken, authorizeAdmin, userRoutes);
app.use("/sales", authenticateToken, authorizeAdmin, salesRoutes);
app.get('/allusers', authenticateToken, authorizeAdmin, getAllUsers);

// Public routes
app.post('/send-email', sendEmail);
app.use("/auth", authRoutes); 





/*CONNECT TO MONGODB AND START SERVER*/
const startServer = async () => {
  await connectMongoDB(); // Wait for MongoDB to connect
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))

  //User.insertMany(UserData);
  //generateMockData();
  //addTestAdmin();

  
  /*const getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };
  
  const updateUsers = async () => {
    const users = await User.find();
  
    for (let user of users) {
      for (let service of user.services) {
        if (service.paymentStatus === "Paid") {
          service.paidOn = getRandomDate(new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000), new Date());
        } else {
          service.paidOn = ""; // Set to empty for Pending payment status
        }
      }
      await user.save();
    }
  
  };
  
  updateUsers().then(() => {
    console.log('Users updated successfully with random paidOn dates.');
  }).catch((error) => {
    console.error('Error updating users:', error);
  });
   

  initializeDueDateChecker();*/


};


startServer(); 
