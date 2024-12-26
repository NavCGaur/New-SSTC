import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/User.js";

// User login
export const getLogin = async (req, res) => {

  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password validity
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const payload = {
      userId: user._id,
      email: user.email,
      name: user.name,
      role: user.role, // Store role info for role-based access control (RBAC)
    };
    console.log("Token generation time:", new Date());


    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    const decoded = jwt.decode(token);
    console.log("Token expiration time:", new Date(decoded.exp * 1000));

    // Send response with token and user info
    return res.json({
      data: {
        token,
        user: {
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

