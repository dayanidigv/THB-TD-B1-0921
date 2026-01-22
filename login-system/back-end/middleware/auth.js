import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
      console.log('❌ Auth failed: No token provided');
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    console.log('✅ Token verified for user:', decoded.userId);
    next();
  } catch (error) {
    console.log('❌ Auth failed: Invalid token');
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
