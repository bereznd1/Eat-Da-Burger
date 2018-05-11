//Imports the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

//Object that holds all the functions that will be interacting with the database
var burger = {
  //Activates the "selectAll" function from the ORM, using the "burgers" table as the specified table input
  //This function will be used to display the info for the burgers on the page
  all: function(cb) {
    orm.selectAll("burgers", function(res) {
      cb(res);
    });
  },

  //Activates the "insertOne" function from the ORM, using the "burgers" table as the specified table input
  //This function will be used to add a new burger to the database after the user submits a new burger name
  create: function(cols, vals, cb) {
    orm.insertOne("burgers", cols, vals, function(res) {
      cb(res);
    });
  },

  //Activates the "update" function from the ORM, using the "burgers" table as the specified table input
  //This function will be used to mark a burger as "devoured" when the "Devour It!" is clicked
  update: function(objColVals, condition, cb) {
    orm.update("burgers", objColVals, condition, function(res) {
      cb(res);
    });
  }
};

//Export the database functions for the controller (burger_controller.js).
module.exports = burger;
