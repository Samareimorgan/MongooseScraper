// On click of the scrape button - make ajax call to get articles
$(document).on("click","scrape", function() {



  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
    })
});