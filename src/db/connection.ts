import mongoose = require("mongoose");

export async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Wakurent", {});
    console.log("DB connected");
  } catch (e) {
    console.log("Error. No connected DB");
    console.log(e);
  }
}
