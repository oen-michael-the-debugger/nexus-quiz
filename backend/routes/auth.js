const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// REGISTER ROUTE
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creates user with a default empty history array
    user = new User({ username, email, password: hashedPassword, history: [], xp: 0 });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    
    // Return history: [] so frontend can initialize it seamlessly
    res.json({ token, user: { id: user._id, username, email, xp: 0 }, history: [] });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN ROUTE
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    
    // 🛡️ FIXED: Returns old history arrays from the DB so they append on the dashboard!
    res.json({ 
      token, 
      user: { id: user._id, username: user.username, email, xp: user.xp || 0 }, 
      history: user.history || [] 
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
