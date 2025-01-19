const express = require('express')
const upload = require('../middlewares/multer')
const {addDoctor,adminLogin, allDoctors }= require('../controllers/admin.controller')
const {authAdmin} = require('../middlewares/authAdmin')
const adminRoutes = express.Router()
adminRoutes.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRoutes.post('/login',adminLogin)
adminRoutes.post('/all-doctors',authAdmin,allDoctors)
module.exports = adminRoutes