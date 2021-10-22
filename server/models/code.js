const mongoose = require("mongoose")
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2');

const Code = new Schema({
    code: {
        type: String,
        default: "",
    },
    discount: {
        type: Number,
        default: 0,
    },
    oneuse: {
        type: Boolean,
        default: false,
    },
    used: {
        type: Number,
        default: 0,
    },
    valid: {
        type: Date, 
        default: Date.now
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

Code.plugin(mongoosePaginate);
module.exports = mongoose.model("Code", Code)