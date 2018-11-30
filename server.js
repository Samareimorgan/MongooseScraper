var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

//Require scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

//Require all data models
var db = require("./models");

//Declare Port 
var PORT = process.env.PORT|8080;  //process.env.PORT is for heroku

//Get app instance of Express
var app = require("express");


//Configure Middleware

//use morgan to log requests
app.use(logger("dev"));

//Parse Application Body as JSON
app.use(express.urlencoded({ extendend: true }));
app.use(express.json());

//Set up Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handelbars");

// Connection with MongoDB
mongoose.connect("mongodb://localhost/mongooseScraper", { useNewUrlParser: true });

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });


