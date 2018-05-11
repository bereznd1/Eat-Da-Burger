//Sets up MySQL connection
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Thacarter1",
  database: "burgers_db"
});

//Makes the connection
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

//Exports connection for our ORM to use.
module.exports = connection;
