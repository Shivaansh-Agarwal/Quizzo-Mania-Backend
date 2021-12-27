const express = require("express");
const { verifyToken } = require("../../../middlewares/verifyToken.js");
const { Question } = require("../../models/question.model.js");

const router = express.Router();

router.param("quizId", async function (req, res, next, quizId) {
  const result = await Question.find({ quizId });
  if (result.length === 1) {
    req.questionsList = result[0];
    next();
  } else {
    res.status(201).json({
      status: "fail",
      data: null,
      message: "The questions for requested quiz doesn't exist.",
    });
  }
});

router.route("/:quizId").get(verifyToken, function (req, res) {
  const { questionsList } = req;
  res.status(201).json({
    status: "success",
    data: questionsList,
  });
});

router.use("/:quizId", (err, req, res, next) => {
  res.status(400).json({
    status: "error",
    data: null,
    message: "Error while fetching questions for this quiz.",
  });
});

module.exports = { router };
