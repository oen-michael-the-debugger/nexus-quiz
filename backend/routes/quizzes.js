const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// 1. GET ALL QUIZZES (with optional category filter via query string)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category: category.toLowerCase() } : {};
    const quizzes = await Quiz.find(filter).populate('creator', 'username');
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET A SINGLE QUIZ BY ID
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id); // Fixed the typo here
    if (!quiz) return res.status(404).json({ message: "Quiz instance not found" });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. CREATE A NEW QUIZ ENTRY
router.post('/create', async (req, res) => {
  try {
    const { title, description, category, questions, creatorId } = req.body;

    const newQuiz = new Quiz({
      title,
      description,
      category,
      questions,
      creator: creatorId || null // Fallback if no creator ID is sent yet
    });

    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
