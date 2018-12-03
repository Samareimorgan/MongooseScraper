
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// DEPENDENCIES
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

//Declare Port 
var PORT = process.env.PORT|8081;  //process.env.PORT is for heroku

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// MIDDLEWARE
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//Get app instance of Express
var app = express();

//use morgan to log requests
app.use(logger("dev"));

//Parse Application Body as JSON
app.use(express.urlencoded({ extendend: true }));
app.use(express.json());

//Set up handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// MONGOOSE CONFIG
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//if deployed, use deployed db or else use local database
var MONGOD_URI = process.env.MONGOD_URI || ("mongodb://localhost/MongooseScraper", { useNewUrlParser: true });
//connect to MongoDB

mongoose.connect(MONGOD_URI)
 .then(function() {
   console.log("connected to MongoDB");
 })
 .catch(function(err) {
    console.log(err);
 });

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ROUTER
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
//Require router
var routes = require("./controllers/routes");
app.use(routes);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// PORT LISTENER
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Start the server
app.listen(function(PORT) {
    console.log("App running on port" + PORT  + "!");
  });


