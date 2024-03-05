import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

const mongoConnect =
  "mongodb+srv://3wa_apiLearn:jKUu8yqVz7ISvHE5@cluster0.ll5ucbh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoConnect);

const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on("connection", ()=>{
    console.log(`Databse running to port`);
})
