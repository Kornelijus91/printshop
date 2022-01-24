const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const Payment = new Schema({
    clientUsername: {
        type: String,
        default: "",
    },
    orderNr: {
        type: Number,
        default: 0,
    },
    amount: {
        type: Number,
        default: 0,
    },
    currency: {
        type: String,
        default: "",
    },
    payment: {
        type: String,
        default: "",
    },
    firstName: {
        type: String,
        default: "",
    },
    lastName: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    zip: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
})

Payment.plugin(mongoosePaginate);
module.exports = mongoose.model("Payment", Payment)