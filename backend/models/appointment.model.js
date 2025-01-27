const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Reference to User model
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor", // Reference to Doctor model
    required: true,
  },
  slotDate:{
    type:String,
    required:true
  },
  slotTime:{
    type:String,
    required:true
  },
  userData:{
    type:Object,
    required:true
  },
  doctorData:{
    type:Object,
    required:true
  },
  amount:{
    type:Number,
    required:true
  },
  date:{
    type:Number,
    required:true
  },
  cancelled:{
    type:Boolean,
    required:false
  },
  payment:{
    type:Boolean,
    required:false
  },
  isCompleted:{
    type:Boolean,
    required:false
  },
})
const appointmentModel =mongoose.models.appointment ||  mongoose.model("appointment", appointmentSchema);
module.exports = appointmentModel;