const mongoose = require("mongoose");
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");

async function createAdmin() {
  const saltRounds = 10;

  const connectionAddress = "mongodb://localhost:27017/ClimateUturnCourse";
  mongoose.connect(connectionAddress, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connections;
  db.concat("error", console.error.bind(console, "Error with MongoDB: "));

  let passwordHash = await bcrypt.hash("admin734", saltRounds);

  const admin = new Admin({
    login: "Diana",
    password: passwordHash
  });

  await admin.save();
}
createAdmin();
