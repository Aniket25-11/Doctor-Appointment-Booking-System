const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required:true,
  },
  speciality: {
    type: String,
    required:true,
  },
  degree: {
    type: String,
    required:true,
  },
  experience: {
    type: String,
    required:true,
  },
  about: {
    type: String,
    required:true,
  },
  available: {
    type: Boolean,
    default:true,
  },
  fees: {
    type: Number,
    required:true,
  },
  address: {
    type: Object,
    required:true,
  },
  date: {
    type: Number,
    required:true,
  },
  slots_booked: {
    type: Object,
    default:{},
  },
},{minimize:false});

// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: "24h",
//   });
//   return token;
// };

// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// userSchema.statics.hashPassword = async function (password) {
//   return await bcrypt.hash(password, 12);
// };
const doctorModel =mongoose.models.doctor ||  mongoose.model("doctor", doctorSchema);
module.exports = doctorModel;
