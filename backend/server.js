const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Cloud'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Route Registrations
app.use('/api/auth', require('./routes/auth'));
app.use('/api/quizzes', require('./routes/quizzes')); // Added Quiz Module
app.use('/api/history', require('./routes/history'));

app.get('/', (req, res) => {
  res.send('Nexus Quiz API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
