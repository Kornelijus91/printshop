const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Carousel = new Schema({
    title: {
        type: String,
        default: "",
    },
    bluetext: {
        type: String,
        default: "",
    },
    redtext: {
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
    borderRadius: {
        type: Number,
        default: 1,
    },
    size: {
        type: Number,
        default: 1,
    },
    animation: {
        type: Number,
        default: 0,
    },
    imageURL: {
        type: String,
        default: "",
    },
    imageOriginalName: {
        type: String,
        default: "",
    },
    position: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
})

module.exports = mongoose.model("Carousel", Carousel)