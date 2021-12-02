//import mysql2 module
const mysql2 = require('mysql2');

//create the connection to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.USER,
        password: process.env.DB_PASS,
        database: 'CMS'
    }
)

module.exports = db;