require('dotenv').config();
const express = require('express');
const cors = require('cors');
const prisma = require('./prisma/client');

const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5050;

// CORS Middleware configuration

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
}));

// Middleware to parse JSON
app.use(express.json());

app.get('/ping', (req, res) => {
  res.json({ message: '✅ Server is working and CORS is enabled!' });
});


// Routes
app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);
app.get('/api/public', (req, res) => res.json({ message: 'Public endpoint' }));



// Error handling
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('💤 Database disconnected');
  process.exit(0);
});



