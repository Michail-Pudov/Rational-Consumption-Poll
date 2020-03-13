require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

async function start() {
  const connectionAddress = process.env.MONGO_URI;
  await mongoose.connect(connectionAddress, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connections;
  db.concat("error", console.error.bind(console, "Error with MongoDB: "));

  const adminSchema = new mongoose.Schema({
    login: String,
    password: String
  });

  adminModel = mongoose.model("admin", adminSchema);

  await adminModel.create({
    login: "Diana",
    password: await bcrypt.hash("12345", 10)
  });

  const courseSchema = new mongoose.Schema({
    title: String,
    lessons: Array,
    reviews: Array,
    totalReviews: Number
  });
  courseModel = mongoose.model("course", courseSchema);

  await courseModel.create({
    title: "Новый курс 1"
  });

  await mongoose.disconnect();
}
start();
