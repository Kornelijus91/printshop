const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const Comment = new Schema({
    productName: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        default: "",
    },
    comment: {
        type: String,
        default: "",
    },
    rating: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
})

Comment.plugin(mongoosePaginate);
module.exports = mongoose.model("Comment", Comment)