const express = require('express')
const { userRegister, userLogin } = require('../controllers/user.controller')
const userRoutes = express.Router()
userRoutes.post('/register',userRegister)
userRoutes.post('/login',userLogin)
module.exports = userRoutes
