const express = require("express");
const { verifyToken } = require("../../../middlewares/verifyToken.js");
const { Quiz } = require("../../models/quiz.model.js");

const router = express.Router();

router.route("/").get(verifyToken, async function (req, res) {
  try {
    const result = await Quiz.find({});
    res.status(201).json({
      status: "success",
      data: result,
    });
  } catch (e) {
    res.status(400).json({
      status: "error",
      data: null,
      message: "Unable to fetch List of Quiz",
    });
  }
});

module.exports = { router };
