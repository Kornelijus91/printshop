const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CartItem = new Schema({
    name: {
        type: String,
        default: "",
    },
    productID: {
        type: String,
        default: "",
    },
    productLink: {
        type: String,
        default: "",
    },
    options: {
        type: Array,
        default: [],
    },
    pastaba: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        default: "",
    },
    quantity: {
        type: Number,
        default: 1,
    },
    oneDayLimit: {
        type: Number,
        default: 1,
    },
    twoDayLimit: {
        type: Number,
        default: 1,
    },
    oneDayPriceIncreace: {
        type: Number,
        default: 0,
    },
    twoDayPriceIncreace: {
        type: Number,
        default: 0,
    },
    maketavimoKaina: {
        type: Number,
        default: 0,
    },
    modifiedAt: {
        type: Date, 
        default: Date.now
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
})

module.exports = mongoose.model("CartItem", CartItem)