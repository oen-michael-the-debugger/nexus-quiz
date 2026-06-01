const mongoose = require('mongoose');
const resultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  quizTitle: String,
  score: Number,
  totalQuestions: Number,
  accuracy: Number,
  xpEarned: Number,
  answers: [{
    questionIndex: Number,
    selectedOption: Number,
    isCorrect: Boolean
  }]
}, { timestamps: true });

module.exports = mongoose.model('Result', resultSchema);
