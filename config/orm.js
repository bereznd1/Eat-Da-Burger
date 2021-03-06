//Imports MySQL connection
var connection = require("../config/connection.js");

//Helper function for SQL syntax.
//Let's say we want to pass 3 values into the mySQL query.
//In order to write the query, we need 3 question marks.
//The helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
//["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

//Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  //Loops through the keys and pushes the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    //Checks to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      //If string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  //Translates array of strings to a single comma-separated string
  return arr.toString();
}

//Object for all our SQL statement functions
var orm = {
  //Function that selects all the records from the specified table
  selectAll: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  //Function that inserts a new record into the specified table
  insertOne: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  //Function that updates the values of an existing record in the specified table
  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

//Exports the orm object for the model (burger.js).
module.exports = orm;
