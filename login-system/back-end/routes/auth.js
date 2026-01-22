import express from 'express';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper: Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// SIGNUP - Email & Password
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    console.log('📝 Signup attempt:', email);

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ Signup failed: User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user (password will be hashed by pre-save hook)
    const user = new User({ email, password, name });
    await user.save();
    console.log('✅ User created:', user._id);

    const token = generateToken(user._id);
    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture
      }
    });
  } catch (error) {
    console.error('❌ Signup error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// LOGIN - Email & Password
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔐 Login attempt:', email);

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ Login failed: User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('❌ Login failed: Invalid password');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    console.log('✅ Login successful:', user._id);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GOOGLE LOGIN - OAuth credential/id_token flow
router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body; // id_token from Google
    console.log('🔐 Google OAuth attempt');

    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;
    console.log('✅ Google token verified:', email);

    // Find or create user
    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (!user) {
      // Create new user with Google data
      console.log('📝 Creating new user from Google');
      user = new User({
        email,
        name,
        googleId,
        picture
      });
      await user.save();
      console.log('✅ New user created:', user._id);
    } else if (!user.googleId) {
      // Link Google account to existing email user
      console.log('🔗 Linking Google account to existing user');
      user.googleId = googleId;
      user.picture = picture || user.picture;
      await user.save();
    } else {
      console.log('✅ Existing Google user found:', user._id);
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture
      }
    });
  } catch (error) {
    console.error('❌ Google auth error:', error.message);
    res.status(500).json({ message: 'Google authentication failed', error: error.message });
  }
});

// GET PROFILE - Protected route
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    console.log('👤 Profile request for user:', req.userId);
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      console.log('❌ User not found:', req.userId);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('✅ Profile retrieved:', user.email);
    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('❌ Profile error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
