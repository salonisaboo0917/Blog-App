const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'',
  database:'blogs'
});

const connectDB = () => {
  connection.connect(err => {
    if (err) {
      console.error('Database connection failed:', err.stack);
      return;
    }
    console.log('Connected to MySQL database');
  });
};

module.exports = { connection, connectDB };
