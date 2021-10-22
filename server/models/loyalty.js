const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Loyalty = new Schema({
    money: {
        type: Number,
        default: 0,
    },
    discount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
})

module.exports = mongoose.model("Loyalty", Loyalty)