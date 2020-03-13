const mongoose = require("mongoose");
// "mongodb://localhost:27017/ClimateUturnCourse";
const connectionAddress = process.env.MONGO_URI;
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
