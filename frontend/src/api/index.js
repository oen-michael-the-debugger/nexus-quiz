import axios from 'axios';

// Create an axios instance pointing to your Express backend
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Auth API Endpoints
export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);

// Quiz API Endpoints
export const fetchAllQuizzes = (category) => {
  // If a category filter is provided, append it as a query string parameter
  const url = category ? `/quizzes?category=${category}` : '/quizzes';
  return API.get(url);
};

export const fetchQuizById = (id) => API.get(`/quizzes/${id}`);
export const createQuiz = (quizData) => API.post('/quizzes/create', quizData);
