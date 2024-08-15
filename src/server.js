// server.js
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json()); // Add this line to parse JSON bodies

// Mock data for tasks
const tasks = [
  { id: 1, title: "Task 1", description: "Description 1", deadline: "2024-12-31", status: false },
  { id: 2, title: "Task 2", description: "Description 2", deadline: "2024-12-31", status: true },
  // Add more tasks as needed
];

// Endpoint to get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add more routes as needed

app.listen(3232, () => {
  console.log('Server is running on port 3232');
});