const app = require("./app");
const dotenv = require("dotenv")
const cloudinary =require("cloudinary")

const connectDatabase = require("./config/database")



  
//config
dotenv.config({path:"config/config.env"})

//connecting to Database
connectDatabase()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// app.listen(process.env.PORT,()=>{
//     console.log(`server is working on http://localhost:${process.env.PORT}`)
// })

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
  });
  
  // Unhandled Promise Rejection
  process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });