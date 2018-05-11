//Requires the Express package to manage the server/routing
var express = require("express");

//Imports the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

//Activates the express Router to be able to use it with the various routing functions
var router = express.Router();

//Creates the GET route that will display all the burgers on the page when the page is loaded
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };

    //Uses the "index" Handlebars page to load the results of the query into it
    res.render("index", hbsObject);
  });
});

//Creates the POST route that will add a new Burger record to the database when a new burger is submitted
router.post("/api/burgers", function(req, res) {
  burger.create(
    ["burger_name", "devoured"],
    [req.body.burger_name, false],
    function(result) {
      //Send back the ID of the new route
      res.json({ id: result.insertId });
    }
  );
});

//Creates the PUT route that will be used to change the state of a burger from not devoured to devoured
router.put("/api/burgers/:id", function(req, res) {
  //Sets up the condition that will be used next in order to update the burger that matches this condition
  var condition = "id = " + req.params.id;

  burger.update(
    {
      devoured: req.body.devoured
    },
    condition,
    function(result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so send back a 404
        return res.status(404).end();
      }
      //If a record is actually changed, then send back a 200 (which indicates a successful request) & end the response
      res.status(200).end();
    }
  );
});

//Exports the router function for use in the "server.js" function
module.exports = router;
