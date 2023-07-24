const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const fs = require("fs");
const multer = require("multer");
const mongoose = require("mongoose");
var imageModel = require('./image.model');
const connection = require("./connection");
 let cors=require("cors")
 app.use(cors())
 
app.use(bodyParser.urlencoded(
      { extended:true }
))
 
app.set("view engine","ejs");
 



const  {v2: cloudinary}=require('cloudinary');
          
cloudinary.config({ 
  cloud_name: 'dtorys7bi', 
  api_key: '723226371683247', 
  api_secret: '4YKk4aIhzr2NEz638MXvfHT_HUY' 
});
app.use(express.urlencoded({ extended: true }));
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
    //   cb(null, file.originalname + '-' + Date.now()+".jpg")
    cb(null, Date.now()+ '-' +file.originalname )
    }
  })
 
var upload = multer({ storage: storage })
app.use("/uploads",express.static("uploads"))
app.get("/",(req,res)=>{
    res.render("index");
})
 
app.post("/uploadphoto",upload.single('myImage'),async(req,res)=>{
  
    let path=req.file.path
    console.log(req.file)
    try {
      const result = await cloudinary.uploader.upload(path); // Upload image to Cloudinary
      let imageUrl = result.secure_url; // Get the URL of the uploaded image from Cloudinary
console.log(imageUrl,"54")  
res.send(imageUrl)
        // let data=new imageModel({image:path})
        // await data.save()
        // res.send("uploaded")
    } catch (error) {
        res.send("error")
    }
   
  
})
//Code to start server


app.get("/get",async(req,res)=>{
  
  try {
    let data=await imageModel.find()
    res.send(data)
  } catch (error) {
    res.send("error")
  }
})
app.listen(5000,async function () {
    try {
        await connection
        console.log("conected to mongo")
    } catch (error) {
        console.log("error in connection")
    }
      console.log("Server Started at PORT 5000");
})