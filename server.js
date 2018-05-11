//Sets up dependencies: various NPM packages that will be used to give our server useful functionality
var express = require("express");
var bodyParser = require("body-parser");

//Sets up the port for the server to listen to
var PORT = process.env.PORT || 3000;

//Tells node that we are creating an "express" server
var app = express();

//Serves static content for the app from the "public" directory in the application directory
app.use(express.static("public"));

//Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Requires the Handlebars templating package
var exphbs = require("express-handlebars");

//Sets up Handlebars to work properly
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Imports routes and gives the server access to them.
var routes = require("./controllers/burgers_controller.js");
app.use(routes);

//Activates the server
app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
