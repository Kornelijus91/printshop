const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Settings = new Schema({
    maketavimoKaina: {
        type: Number,
        default: 0,
    },
})

module.exports = mongoose.model("Settings", Settings)