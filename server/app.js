const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
// import mongoose from "mongoose";

app.use(cors({
    origin: "(*)",
}))

const app = express();

dotenv.config({path:"./config.env"})
const PORT = process.env.PORT || 5050;

require('./db/conn')

app.use(express.json());

app.use(require('./router/auth'));

app.get("/", (req,res)=>{
    res.send("hellooo from app.js"); 
}); 

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
});