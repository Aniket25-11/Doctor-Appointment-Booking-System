const express = require('express')
const { doctorList } = require('../controllers/doctor.controller')
const doctorRoutes = express.Router()
doctorRoutes.post('/list',doctorList)
module.exports = doctorRoutes
