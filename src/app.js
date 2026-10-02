const express = require('express');
const { add } = require('./math');

const app = express();

// Healthcheck endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Example feature endpoint
app.get('/api/add', (req, res) => {
  const a = parseInt(req.query.a) || 0;
  const b = parseInt(req.query.b) || 0;
  res.json({ result: add(a, b) });
});

module.exports = app;
