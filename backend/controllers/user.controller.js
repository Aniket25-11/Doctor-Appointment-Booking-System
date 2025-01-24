const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v2: cloudinary } = require("cloudinary");
const userModel = require("../models/user.model");
const doctorModel = require("../models/doctor.model");
const appointmentModel = require("../models/appointment.model");
module.exports.userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.json({ success: false, message: "Missing Credentials" });
    }
    if (!validator.isEmail(email)) {
      res.json({ success: false, message: "Enter a valid email" });
    }
    //vlaidating password
    if (password.length < 6) {
      return res.json({
        success: false,
        message:
          "Please enter strong password and length must be atleast 6 character",
      });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.json({ success: false, message: "Invalid Credentials" });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;
    if (!name || !dob || !phone || !gender) {
      res.json({ success: false, message: "Missing Information" });
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      gender,
      dob,
    });
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, {
        image: imageUrl,
      });
    }
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports.bookAppointment = async (req, res) => {
  try {
    const { userId, doctorId, slotTime, slotDate } = req.body;
    const doctorData = await doctorModel.findById(doctorId).select("-password");
    if (!doctorData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }
    let slotsBooked = doctorData.slot_booked;
    if (slotsBooked[slotDate]) {
      if (slotsBooked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slotsBooked[slotDate].push(slotTime);
      }
    } else {
      slotsBooked[slotDate] = [];
      slotsBooked[slotDate].push(slotTime);
    }
    const userData = await userModel.findById(userId).select("-password");
    delete doctorData.slot_booked;
    const appointmentData = {
      userId,
      doctorId,
      userData,
      doctorData,
      amount: doctorData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();
    await doctorModel.findByIdAndUpdate(doctorId, { slot_booked: slotsBooked });
    res.json({ success: true, message: "Appointment booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports.listAppointment = async (req,res) =>{
  try {
    const {userId} = req.body;
    const appointments = await appointmentModel.find({userId})
    res.json({success:true,appointments}) 
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

module.exports.cancelAppointment = async(req,res) =>{
  try {
    const {userId,appointmentId} = req.body;
    const appointmentData = await appointmentModel.find({appointmentId})
    if(appointmentData.userId !== userId){
      res.json({success:false,message:"Unauthorised Access"})
    }
    await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
    //releasing doctor slot
    const {doctorId,slotDate,slotTime} = appointmentData;
    const doctorData = await doctorModel.findById(doctorId)
    let slotsBooked = doctorData.slot_booked
    slotsBooked[slotDate] = slotsBooked[slotDate].filter(e => e !== slotTime)
    await doctorModel.findByIdAndUpdate(doctorId,{slot_booked:slotsBooked})
    res.json({success:true,message:"Appointment Cancelled"})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}
