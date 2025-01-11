const express = require('express');
const path = require('path');
const app = express();

// Add error logging
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

app.use(express.static(path.join(__dirname, 'dist')));

// Add basic logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {  // Changed to listen on all interfaces
  console.log(`Server started! Listening on port ${port}`);
  console.log(`Current directory: ${__dirname}`);
  console.log(`Files in dist:`, require('fs').readdirSync(path.join(__dirname, 'dist')));
});