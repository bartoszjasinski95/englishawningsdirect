var mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");

var orderSchema = new mongoose.Schema({
    projection: String,
    width: String,
    wallmount: String,
    sample: String,
    framecolor: String,
    handingoption: String,
    valanceoption: String,
    motorchoice: String,
    addwarranty: String,
    status: String,
    sensorchoice: String,
    firstAddress: String,
    secondAddress: String,
    postcode : String,
    email: String,
    number: String,


})

module.exports = mongoose.model("Order", orderSchema);