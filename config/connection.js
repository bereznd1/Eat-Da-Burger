//Sets up MySQL connection
var mysql = require("mysql");
var connection;

//If the server contains the JAWSDB_URL environmental variable, it connects to the JawsDB database.
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} 

//If the server lacks the variable, it falls back on an explicitly defined local database.
else {
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Thacarter1",
    database: "burgers_db"
  });
}

connection.connect();
//Exports connection for our ORM to use.
module.exports = connection;
