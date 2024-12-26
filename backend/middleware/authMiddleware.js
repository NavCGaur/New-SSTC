import jwt from 'jsonwebtoken';


export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }
  console.log("verifying token1", token);

  
  try {
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  

    req.user = decoded;
  } catch (jwtError) {
    console.error("JWT Verification Error:", {
      name: jwtError.name,
      message: jwtError.message,
      expiredAt: jwtError.expiredAt
    });
    throw jwtError;
  
   
  }
  next();

};

// Authorization Middleware
export const authorizeAdmin = (req, res, next) => {
    console.log("checking role", req, req.user.role);
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};


