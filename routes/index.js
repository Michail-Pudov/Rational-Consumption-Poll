const mongoose = require("mongoose");
const Course = require("../models/courses");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Admin = require("../models/admin");

router.get("/", async function(req, res) {
  let courses = await Course.find();

  if (req.session.user) {
    res.render("home", { courses: courses, isLoggedin: true });
  } else {
    res.render("home", { courses });
  }
});

router.get("/:id/course", async function(req, res) {
  let nameCourse = req.params.id;
  let course = await Course.findOne({ title: nameCourse });

  if (req.session.user) {
    res.render("lessons", {
      title: course.title,
      course: course.lessons,
      isLoggedin: true
    });
  } else {
    res.render("lessons", { title: course.title, course: course.lessons });
  }
});

router.get("/login", async function(req, res) {
  res.render("admin/login");
});

router.post("/ok", async function(req, res) {
  let login = req.body.login;
  let password = req.body.password;
  let trueAdmin = await Admin.findOne({ login: login });
  if (trueAdmin && (await bcrypt.compare(password, trueAdmin.password))) {
    req.session.user = trueAdmin;
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

router.use(function(req, res, next) {
  if (!req.session.user) {
    res.redirect("/");
  } else {
    next();
  }
});

router.get("/addCourse", async function(req, res) {
  res.render("admin/createNewCourseTitle");
});

router.post("/new", async function(req, res, next) {
  const newCourse = new Course({
    title: req.body.title
  });
  await newCourse.save();
  res.redirect(`/new/${req.body.title}`);
});

router.get("/new/:id", async function(req, res, next) {
  res.render("admin/new", { title: req.params.id });
});

router.post("/new/:id", async function(req, res, next) {
  let title = req.params.id;
  let currentCourse = await Course.findOne({ title: title });
  let newEntry = {
    youtubeURL: req.body.youtubeURL,
    formURL: req.body.formURL
  };
  currentCourse.lessons.push(newEntry);
  await currentCourse.save();
  res.redirect(`/new/${title}`);
});

router.get("/delete/:id", async function(req, res, next) {
  res.render("admin/deleteCourse", { title: req.params.id });
});
router.post("/delete/:id", async function(req, res, next) {
  let title = req.params.id;
  let deleteTitle = await Course.findOneAndDelete({ title: title });
  res.redirect("/");
});

router.post("/save/:id", async function(req, res) {
  let document = await Course.findOne({ title: req.params.id });
  let allYoutubeURL = req.body.youtubeURL;
  let allformURL = req.body.formURL;

  document.lessons = [];

  for (let i = 0; i < allYoutubeURL.length; i++) {
    document.lessons.push({
      youtubeURL: allYoutubeURL[i],
      formURL: allformURL[i]
    });
  }
  await document.save();
  res.redirect(`/${req.params.id}/course`);
});

module.exports = router;
