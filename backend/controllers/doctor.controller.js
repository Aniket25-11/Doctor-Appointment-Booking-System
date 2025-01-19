const doctorModel= require('../models/doctor.model')
module.exports.changeAvailability = async(req,res) =>{
  try {
    const {doctorId} = req.body;
    const doctorData = await doctorModel.findById(doctorId)
    await doctorModel.findByIdAndUpdate(doctorId,{availability:!doctorData.availability})
    res.json({success:true,message:"Availability Change"})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

module.exports.doctorList=async()=>{
  try {
    const doctors = await doctorModel.find({}).select(['-password,-email'])
    res.json({success:true,doctors})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}
