const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/mongodb");
const connectCloudinary = require('./config/cloudinary')
const doctorRoutes = require("./routes/doctor.route");
const adminRoutes = require("./routes/admin.route");
const userRoutes = require("./routes/user.route");

// const cookieParser = require("cookie-parser");

connectDB();
connectCloudinary();

app.use(cors({origin:"https://doctor-appointment-booking-system-8-one.vercel.app", credentials:true}))
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

const port = process.env.PORT || 3000;


app.get("/", (req, res) => {
  res.send("Backend Started .....");
});

app.use('/api/doctor', doctorRoutes);
app.use('/api/admin',adminRoutes)
app.use('/api/user',userRoutes)


// module.exports = app;
app.listen(port ,()=>{
  console.log(`Server is running on port ${port}`);
});