//import mysql2 module
const mysql = require('mysql2');
require('dotenv').config();

//create the connection to the database
const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'CMS'
    }
)

module.exports = db;