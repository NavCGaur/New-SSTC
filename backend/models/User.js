import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  serviceName: { 
    type: String, 
    required: true,
    enum: [
      "GST Registration", 
      "MSME Registration", 
      "Business Entity Registration",
      "GST Return Filing", 
      "Income Tax Return Filing", 
      "Accounting & BookKeeping"
    ] // Allowed service names
  }, 
  paymentStatus: { 
    type: String, 
    enum: ["Paid", "Pending"], 
    default: "Pending" 
  }, 
  nextDueDate: { type: Date }, // When the next service is due
  notes: { type: String }, // Optional field for additional details about the service
});

const userSchema = new mongoose.Schema({
  // Basic Information
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['User', 'Admin'], 
    default: 'User', 
    required: true 
  },

  // Address Information
  residential_address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
  },
  business_address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
  },

  // Business Details
  business_details: {
    trade_name: { type: String },
    legal_name: { type: String },
    business_type: { 
      type: String, 
      enum: [
        'Proprietorship', 
        'Partnership', 
        'LLP', 
        'Private Limited', 
        'Public Limited', 
        'Trust', 
        'Others'
      ] 
    },
    business_category: { 
      type: String, 
      enum: ['Manufacturer', 'Trader', 'Service Provider', 'Others'] 
    },
    business_pan: { type: String },
    date_of_establishment: { type: Date },
    annual_turnover: { type: Number },
  },

  // Services
  services: [serviceSchema], // Embedded services schema

  // Timestamps
}, { timestamps: true, collection: 'users' });

const User = mongoose.model('User', userSchema);

export default User;
