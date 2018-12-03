//Require Mongoose
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var noteSchema = new Schema ({
    title: String,
    body: String
    }
);

var Notes = mongoose.model("Notes", noteSchema);

module.export = Notes;