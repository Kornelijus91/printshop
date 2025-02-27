const mongoose = require("mongoose")
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2');

const Product = new Schema({
    name: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        default: "",
    },
    amountDiscount: {
        type: Array,
        default: [],
    },
    options: {
        type: Array,
        default: [],
    },
    galerija: {
        type: Array,
        default: [],
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
    kiekioPasirinkimoModelis: {
        type: Number,
        default: 0,
    },
    kainosModelis: {
        type: Number,
        default: 0,
    },
    basePrice: {
        type: Number,
        default: 0,
    },
    minPrice: {
        type: Number,
        default: 0,
    },
    baseDiscount: {
        type: Number,
        default: 0,
    },
    homepage: {
        type: Boolean,
        default: false,
    },
    link: {
        type: String,
        default: "",
    },
    templateID: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
})

Product.plugin(mongoosePaginate);
module.exports = mongoose.model("Product", Product)