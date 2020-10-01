var mongoose = require("mongoose");
// Get the Schema constructor
var Schema = mongoose.Schema;
// Using Schema constructor, create a ProductSchema
var review = new Schema({
    username : {
        type : String,
        required : true
    },
    stars : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }

});
// Create model from the schema
module.exports = mongoose.model("Review", review);
