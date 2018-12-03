//Dependencies
var express = require("express");
var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("../models");

//Scraping 
router.get("/scrape", function(req, res) {
  // First, we grab the body of the html with axios
  axios.get("http://www.techcrunch.com/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    console.log(response);
    var $ = cheerio.load(response.data);
    

    // Now, we grab every h3 within an article tag, and do the following:
    $("article h3").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      // Create a new Article using the `result` object built from scraping
      db.Articles.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Send a message to the client
    res.send("Scrape Complete");
  });
});



//Route to get all articles
router.get("/articles", function(req, res) {
  //Grab all documents in Articles collection
  db.Articles.find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
      console.log(dbArticle)
      
    var hbsObject = {
      articles: dbArticle
    };
    res.render("index", hbsObject);

    })
    .catch(function(err){
      res.json(err);
    });
      
  });

//route for getting a specific Article by Id and then have it's note populate 
router.get("/articles/:id", function(req,res) {
  //create query to find matching Article to the inputed id
  db.Articles.findOne({_id: req.params.id})
  //populate notes associated with it. 
    .populate("notes")
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err){
      res.json(err);
    })
});

//Save and/or update Article's Note
router.post("/articles/:id", function(req,res) {
  db.Notes.create(req.body)
    .then(function(dbNote) {
      return db.Articles.findOneAndUpdate({_id: req.params.id }, {note: dbNote._id}, {new: true});
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    })
});


module.exports = routes;