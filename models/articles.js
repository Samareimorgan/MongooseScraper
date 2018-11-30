//Require mongoose
var mongoose = require("mongoose");

//reference to mongoose schema constructor
var Schema = mongoose.Schema;

//Create new Schema object 
var articleSchema = new Schema ({
    //provides the title of the article
    title: {
        type: String,
        trim: true,
        required: true
    },
    //links to the URL of the article
    link: {
        type: String,
        trim: true,
        required: true  
    },
    //links to the notes that are assocaited with the article, through the note id 
    notes: {
        type: Schema.Type.ObjectId,
        ref: "notes"
    }
})
