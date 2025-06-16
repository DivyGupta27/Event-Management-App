const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./database');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/auth', require('./routes/auth'));      // Auth routes
app.use('/api/events', require('./routes/events'));  // Event routes

// Error handling (optional but useful)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
