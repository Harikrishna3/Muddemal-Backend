require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 3000;

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'myuser',
  password: process.env.DB_PASS || 'mypassword',
  database: process.env.DB_NAME || 'mydb'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.get('/', (req, res) => {
  res.send('Express & MySQL Server Running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
