const express = require('express')
const upload = require('../middlewares/multer')
const {addDoctor,adminLogin }= require('../controllers/admin.controller')
const {authAdmin} = require('../middlewares/authAdmin')
const adminRoutes = express.Router()
adminRoutes.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRoutes.post('/login',adminLogin)
module.exports = adminRoutes