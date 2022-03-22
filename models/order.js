var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
    projection: String,
    width: String,
    wallmount: String,
    framecolor: String,
    handingoption: String,
    motorchoice: String,
    status: String,
    sensorchoice: String,
    number: String,
})

module.exports = mongoose.model("Order", orderSchema);