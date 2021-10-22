const mongoose = require("mongoose")
const Schema = mongoose.Schema
const passportLocalMongoose = require("passport-local-mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
})

const User = new Schema({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  authStrategy: {
    type: String,
    default: "local",
  },
  personalas: {
    type: Boolean,
    default: false,
  },
  administracija: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: [Session],
  },
  googleId: {
    type: String,
    default: "",
  },
  facebookId: {
    type: String,
    default: "",
  },
  linkedInId: {
    type: String,
    default: "",
  },
  moneySpent: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date, 
    default: Date.now
  },
})

User.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken
    return ret
  },
})

User.plugin(passportLocalMongoose)
User.plugin(mongoosePaginate);
module.exports = mongoose.model("User", User)