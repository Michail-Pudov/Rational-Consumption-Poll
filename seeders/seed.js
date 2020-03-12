///////Первоначальное наполнение базы данных
const mongoose = require("mongoose");

const Course = require("../models/courses");

async function createDatabase() {
  const connectionAddress = "mongodb://localhost:27017/ClimateUturnCourse";
  mongoose.connect(connectionAddress, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connections;
  db.concat("error", console.error.bind(console, "Error with MongoDB: "));

  let course1 = await Course.create({
    title: "Understanding clothes",
    lessons: [
      {
        lesson: 1,
        youtubeURL: "https://www.youtube.com/embed/a_db_q_zZ-c",
        formURL:
          "https://docs.google.com/forms/d/e/1FAIpQLSex-wQItBRVqUwFAjaUwe5bqqd4JKiyxNom67bFzt32nvn6qA/viewform"
      },
      {
        lesson: 2,
        youtubeURL: "https://www.youtube.com/embed/EaHepwHgHO0",
        formURL:
          "https://docs.google.com/forms/d/e/1FAIpQLSdUiskQ2Udp3X_aKkMzuWUtkJwgMe3yVa480bgC9_vVPXC-KA/viewform"
      },
      {
        lesson: 3,
        youtubeURL: "https://www.youtube.com/embed/6CaUcbVQpBY",
        formURL:
          "https://docs.google.com/forms/d/e/1FAIpQLSfO64f6dVLUGUgmlS_aqvNSWt8LhVpIWnvMXvyZm9q6gi36Dg/viewform"
      },
      { lesson: 4, youtubeURL: "https://www.youtube.com/embed/UWbSk-I0KwY" },
      {
        lesson: 5,
        youtubeURL: "https://www.youtube.com/embed/gJ3YqoGd9BU",
        formURL:
          "https://docs.google.com/forms/d/e/1FAIpQLSdgz2vfaaoSVIxlcGZo-6y10zzOQdN5ms2utysL1zWYvzjDlQ/viewform"
      }
    ]
  });

  await mongoose.disconnect();

  // console.log(course1)
}

createDatabase();
