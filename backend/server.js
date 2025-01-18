const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/mongodb");
const connectCloudinary = require('./config/cloudinary')
// const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.route");
// const cookieParser = require("cookie-parser");

connectDB();
connectCloudinary();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

const port = process.env.PORT || 3000;


app.get("/", (req, res) => {
  res.send("hello meri jaan");
});

// app.use('/users', userRoutes);
app.use('/api/admin',adminRoutes)

// module.exports = app;
app.listen(port ,()=>{
  console.log(`Server is running on port ${port}`);
});