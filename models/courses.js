const mongoose = require("mongoose");

const connectionAddress = "mongodb://localhost:27017/ClimateUturnCourse";
mongoose.connect(connectionAddress, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connections;
db.concat("error", console.error.bind(console, "Error with MongoDB: "));

const courseSchema = new mongoose.Schema({
  title: String,
  lessons: Array,
  reviews: Array,
  totalReviews: Number
});
module.exports = mongoose.model("Course", courseSchema);
