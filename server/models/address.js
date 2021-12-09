const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Address = new Schema({
    userId: {
        type: String,
        default: "",
    },
    asmuo: {
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
    zipCode: {
        type: String,
        default: "",
    },
    companyName: {
        type: String,
        default: "",
    },
    companyCode: {
        type: String,
        default: "",
    },
    companyAddress: {
        type: String,
        default: "",
    },
    companyPVMCode: {
        type: String,
        default: "",
    },
    // budgetCompany: {
    //     type: Boolean,
    //     default: false,
    // },
    createdAt: {
        type: Date, 
        default: Date.now
    },
})

module.exports = mongoose.model("Address", Address)