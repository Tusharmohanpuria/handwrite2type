const mysql = require('mysql');

// Database connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tm1711tm',
  database: 'FontDatabase'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});

module.exports = db;

