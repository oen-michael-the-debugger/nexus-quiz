const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  xp: { type: Number, default: 0 },
  // 🛡️ CRITICAL FIELD: This holds historical cards for your dashboard logs
  history: [
    {
      quizId: { type: String, required: true },
      quizTitle: { type: String, required: true },
      score: { type: Number, required: true },
      totalQuestions: { type: Number, required: true },
      accuracy: { type: Number, required: true },
      xpEarned: { type: Number, required: true },
      createdAt: { type: Date, default: Date.now },
      answers: [
        {
          questionIndex: Number,
          selectedOption: Number,
          isCorrect: Boolean,
          questionText: String,
          selectedOptionText: String,
          correctOptionText: String
        }
      ]
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);
