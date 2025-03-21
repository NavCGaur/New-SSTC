import mongoose from "mongoose";
const connectMongoDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log('MongoDB connected');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err.message);
      process.exit(1);
    }
  };
  
  export default connectMongoDB;
  