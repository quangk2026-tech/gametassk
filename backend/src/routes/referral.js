const express = require('express');
const User = require('../models/User');
const Referral = require('../models/Referral');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/my-info', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json({
      referralCode: user.referralCode,
      referralCount: user.referralCount,
      totalCommission: user.totalCommission,
      availableCommission: user.availableCommission
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/list', auth, async (req, res) => {
  try {
    const referrals = await Referral.find({ referrer: req.userId })
      .populate('referred', 'username email createdAt');
    res.json(referrals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/link', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const referralLink = `${process.env.FRONTEND_URL}/register?ref=${user.referralCode}`;
    res.json({ referralCode: user.referralCode, referralLink });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
