//Require Mongoose
var mongoose = require("mongoose");

var Schema = mongoos.Schema;

var noteSchema = new Schema ({
    title: String,
    body: String
    }
);

var Notes = mongoose.model("Notes", noteSchema);

module.export = Notes;