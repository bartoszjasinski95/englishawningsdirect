var mongoose = require("mongoose");

var sampleSchema = new mongoose.Schema({
    number : String,
    samples : [

    ]
})

module.exports = mongoose.model("Sample", sampleSchema);