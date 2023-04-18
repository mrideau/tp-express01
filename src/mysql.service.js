const mysql = require("mysql");
const config = require("./config/db.config");

const connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) {
    throw Error(err);
  }

  console.log("[MySQL]", "Connected!");
});

module.exports = connection;
