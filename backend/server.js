import express from 'express';
import dotenv from "dotenv";
import userRoutes from "./routes/user.js"
import initializeDueDateChecker from './jobs/dueDateChecker.js';

import { generateMockData } from './MockDataGenerator.js';

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
  next();
});

// Handle preflight OPTIONS requests
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, baggage, sentry-trace');
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
app.use("/users",userRoutes);




//generateMockData();



/*CONNECT TO MONGODB AND START SERVER*/
const startServer = async () => {
  await connectMongoDB(); // Wait for MongoDB to connect
  const PORT = process.env.PORT || 9001;
  app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))


  //User.insertMany(UserData);

  initializeDueDateChecker();



};




startServer(); 
