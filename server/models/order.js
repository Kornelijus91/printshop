const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
var autoincrement = require('simple-mongoose-autoincrement');

const Order = new Schema({
    clientID: {
        type: String,
        default: "",
    },
    clientUsername: {
        type: String,
        default: "",
    },
    cartItems: {
        type: Array,
        default: [],
    },
    delivery: {
        type: Object,
        default: {},
    },
    gamybosLaikas: {
        type: String,
        default: "",
    },
    payment: {
        type: String,
        default: "",
    },
    price: {
        type: Number,
        default: 0,
    },
    discountPrice: {
        type: Number,
        default: 0,
    },
    new: {
        type: Boolean,
        default: true,
    },
    status: {
        type: String,
        default: "Pateiktas",
    },
    sanaudos: {
        type: Number,
        default: 0,
    },
    shippingMethod: {
        type: String,
        default: "",
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

Order.plugin(mongoosePaginate);
Order.plugin(autoincrement, {field: 'uzsakymoNr'});
module.exports = mongoose.model("Order", Order)