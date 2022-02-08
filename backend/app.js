const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser=require("body-parser");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./middleware/error")

app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
//Route Imports
const projectdetails = require("./routes/projectDetailsRoute");
const user = require("./routes/userRoute")
app.use("/api/v1",projectdetails);
app.use("/api/v1",user);
//middleware for errors
app.use(errorMiddleware);
module.exports = app