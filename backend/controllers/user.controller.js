const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
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
    const newUser = new userModel(userData)
    const user = await newUser.save()
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.json({success:true,token})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({email})
    if(!user){
     return res.json({ success: false, message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
      res.json({ success: false, message: "Invalid Credentials" });
    }else{
      const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
      res.json({success:true,token})
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
