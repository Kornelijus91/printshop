const mongoose = require("mongoose")
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2');

const Template = new Schema({
    name: {
        type: String,
        default: "",
    },
    html: {
        type: String,
        default: "",
    },
    json: {
        type: Object,
        default: {},
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
})

Template.plugin(mongoosePaginate);
module.exports = mongoose.model("Template", Template)