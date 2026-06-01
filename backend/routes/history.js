const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Simple Inline JWT Verification Token Hook
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: "Access Denied: Missing system token credentials" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token validation" });
  }
};

// 1. FETCH FULL CHRONOLOGICAL SCORE ARCHIVE FROM DATABASE
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User matrix not found" });
    
    // Sort logs descending so newest deployments show first
    const chronologicalHistory = (user.history || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(chronologicalHistory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. APPENDBACK NEW QUIZ RESULT TO DATABASE
router.post('/save', verifyToken, async (req, res) => {
  try {
    const { quizId, quizTitle, score, totalQuestions, accuracy, xpEarned, answers } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User model execution node missing" });

    const newLogEntry = {
      quizId,
      quizTitle,
      score,
      totalQuestions,
      accuracy,
      xpEarned,
      answers,
      createdAt: new Date()
    };

    // Push new results to history array and update total cumulative XP
    user.history.unshift(newLogEntry);
    user.xp = (user.xp || 0) + xpEarned;

    await user.save();
    
    // Respond back with full unified history state to re-sync dashboard layout elements instantly
    res.json({ history: user.history, xp: user.xp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
