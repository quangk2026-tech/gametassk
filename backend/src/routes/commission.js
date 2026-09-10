const express = require('express');
const User = require('../models/User');
const Commission = require('../models/Commission');
const Withdrawal = require('../models/Withdrawal');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/summary', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({
      totalCommission: user.totalCommission,
      availableCommission: user.availableCommission,
      referralCount: user.referralCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/history', auth, async (req, res) => {
  try {
    const commissions = await Commission.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(commissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/withdraw', auth, async (req, res) => {
  try {
    const { amount, bankAccount } = req.body;
    const user = await User.findById(req.userId);

    if (user.availableCommission < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    const withdrawal = new Withdrawal({
      user: req.userId,
      amount,
      bankAccount
    });

    await withdrawal.save();
    user.availableCommission -= amount;
    await user.save();

    res.status(201).json({ message: 'Withdrawal request submitted', withdrawal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/withdrawals', auth, async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(withdrawals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
