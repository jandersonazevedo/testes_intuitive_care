const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "testes_csv",
  });

  module.exports = db;