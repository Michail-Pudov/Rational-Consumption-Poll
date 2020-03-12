const mongoose = require("mongoose");
const Course = require("../models/courses");
const express = require("express");
const router = express.Router();

router.get("/", async function(req, res) {
  let courses = await Course.find();
  res.render("home", { courses });
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

router.get("/:id", async function(req, res) {
  let nameCourse = req.params.id;
  let course = await Course.findOne({ title: nameCourse });
  res.render("lessons", { title: course.title, course: course.lessons });
});

module.exports = router;
