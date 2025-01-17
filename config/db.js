const mysql = require("mysql2/promise");
const dotenv = require("dotenv").config()

const mysqlPool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password:process.env.PASSWORD,
  database:process.env.DB,
});

  module.exports = mysqlPool