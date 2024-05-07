"use strict";

const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/WPI');

const db = mongoose.connection;

db.once("open", () => {
  console.log("successfully connected to database");
});

app.get("/", (req, res) => {
  console.log("yippy");
});

app.post('/submitMnemonics', (req, res) => {
    
})

app.listen(port, () => {
  console.log(`server is live and listeneing on port ${port}`);
});
