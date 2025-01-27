const express = require('express')
const { doctorList, loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel, doctorDashboard, doctorProfile, updateDoctorProfile } = require('../controllers/doctor.controller')
const { authDoctor } = require('../middlewares/authDoctor')
const doctorRoutes = express.Router()
doctorRoutes.post('/list',doctorList)
doctorRoutes.post('/login',loginDoctor)
doctorRoutes.get('/appointments',authDoctor,appointmentsDoctor)
doctorRoutes.post('/complete-appointment',authDoctor,appointmentComplete)
doctorRoutes.post('/cancel-appointment',authDoctor,appointmentCancel)
doctorRoutes.get('/dashboard',authDoctor,doctorDashboard)
doctorRoutes.get('/profile',authDoctor,doctorProfile)
doctorRoutes.post('/update-profile',authDoctor,updateDoctorProfile)
module.exports = doctorRoutes
