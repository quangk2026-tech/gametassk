const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const generateReferralCode = () => {
  return 'REF_' + Math.random().toString(36).substring(2, 10).toUpperCase();
};

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, referralCode } = req.body;

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new User({ username, email, password });
    newUser.referralCode = generateReferralCode();

    if (referralCode) {
      const referrer = await User.findOne({ referralCode });
      if (referrer) {
        newUser.referredBy = referrer._id;
        referrer.referralCount += 1;
        await referrer.save();
      }
    }

    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        referralCode: newUser.referralCode
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        referralCode: user.referralCode,
        totalCommission: user.totalCommission
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
