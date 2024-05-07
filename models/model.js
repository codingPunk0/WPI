"use strict";
const { Schema, model } = require("mongoose");

const MnemonicSchema = new Schema(
  { mnemonic: String },
  { timestamps: true }
);
