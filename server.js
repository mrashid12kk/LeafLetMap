const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'itvison_live_track',
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL!');
  }
});

// Define a route to fetch data from the 'branches' table
app.get('/api/branches',cors(), (req, res) => {
  const query = 'SELECT * FROM branches';

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Error fetching data from the database');
    } else {
      
        res.json(results);
    }
  });
});

// Endpoint to get all drivers by branch_id
// Define a route to fetch and print data based on branch_id
app.get('/api/getDrivers/:branch_id',cors(), (req, res) => {
  const branch_id = req.params.branch_id;

  // Construct the SQL query to fetch data based on branch_id
  const sql = `SELECT * FROM drivers WHERE branch_id = ?`;

  // Execute the query
  connection.query(sql, [branch_id], (err, results) => {
    if (err) {
      throw err;
    }

    // Print the fetched data on the console
    console.log('Drivers Data for Branch ID', branch_id);
    console.log(results);

    // Send the results as JSON to the client
    res.json(results);
  });
});

// Use cors middleware
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
