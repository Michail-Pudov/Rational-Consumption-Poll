const mongoose = require("mongoose");

const connectionAddress = process.env.MONGO_URI;
mongoose.connect(connectionAddress, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connections;
db.concat("error", console.error.bind(console, "Error with MongoDB: "));

const adminSchema = new mongoose.Schema({
  login: String,
  password: String
});
module.exports = mongoose.model("Admin", adminSchema);
