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
    gamybosLaikas: {
        type: String,
        default: "",
    },
    // discount: {
    //     type: Number,
    //     default: 1,
    // },
    // loyaltyDiscount: {
    //     type: Number,
    //     default: 1,
    // },
    // price: {
    //     type: Number,
    //     default: 1,
    // },
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