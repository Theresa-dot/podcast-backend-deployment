const express=require("express")
const mongoose = require("mongoose");
const registerRoute=require("./controller/registerRoute");
const searchRoute=require("./controller/searchRoute");
const contactRoute=require("./controller/contactRoute");
const cors = require("cors");
const bodyParser = require("body-parser");


const app=express();

mongoose.set("strictQuery",true);
mongoose.connect("mongodb+srv://test:12345@cluster0.lcbwf8v.mongodb.net/registerdb");
var db=mongoose.connection;
db.on("open",()=>console.log("Connected to DB"));
db.on("error",()=>console.log("Error occured"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
app.use(express.json())
app.use("/registerRoute",registerRoute)
app.use("/searchRoute",searchRoute)
app.use("/contactRoute",contactRoute)


app.listen(4000,()=>{
    console.log("Server started at 4000")
})



