//Require mongoose
var mongoose = require("mongoose");

//reference to mongoose schema constructor
var Schema = mongoose.Schema;

//Create new Schema object 
var articleSchema = new Schema ({
    //provides the title of the article, which is required
    title: {
        type: String,
        trim: true,
        required: true
    },
    ///indicates the author of the article, but is not required
    author: {
        type: String,
        trim: true,
        default: "Unknown"
    },
    //links to the URL of the article, which is required
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
});

//create model from the above Schema 
var Articles = mongoose.model("Articles",ArticleSchema);

//export Article model
module.export = Articles;
