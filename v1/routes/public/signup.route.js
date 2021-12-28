const express = require("express");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const { User } = require("../../models/user.model.js");

const router = express.Router();

router
  .route("/")
  .post(
    checkIfPayloadIsPresent,
    checkForUsernameLength,
    body("email").isEmail(),
    checkIfUsernameOrEmailAlreadyExists,
    hashPassword,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: "fail",
          data: null,
          message: "Email is not valid",
        });
      }
      const { userDetails } = req;
      const user = new User(userDetails);
      const result = await user.save();
      console.log("Signup Successful.\n", result);
      res.status(201).json({
        status: "success",
        data: null,
        message: "Signup Successful.",
      });
    }
  );

router.use("/", (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    data: null,
    message: "Error in Signup Route!",
  });
});

async function hashPassword(req, res, next) {
  const saltRounds = 10;
  const result = await bcrypt.hash(req.body.password, saltRounds);
  req.userDetails.hashedPassword = result;
  next();
}

function checkIfPayloadIsPresent(req, res, next) {
  if (req.body.email && req.body.password && req.body.username) {
    next();
  } else {
    res.status(400).json({
      status: "fail",
      data: null,
      message: "Username, Password, and Email, all 3 are required for Signup.",
    });
  }
}

function checkForUsernameLength(req, res, next) {
  if (req.body.username.length < 5) {
    res.status(400).json({
      status: "fail",
      data: null,
      message: "Username should be atleast 5 characters long.",
    });
  }
  next();
}

async function checkIfUsernameOrEmailAlreadyExists(req, res, next) {
  const { username, email } = req.body;
  const isEmailPresent = await User.find({ email });
  if (isEmailPresent.length !== 0) {
    res.status(400).json({
      status: "fail",
      data: null,
      message: "Email already exists.",
    });
    return;
  }
  const isUsernamePresent = await User.find({ username });
  if (isUsernamePresent.length !== 0) {
    res.status(400).json({
      status: "fail",
      data: null,
      message: "Username already exists.",
    });
    return;
  }
  req.userDetails = {
    username,
    email,
    quizAttempted: [],
    isDarkModeSelected: false
  };
  next();
}

module.exports = { router };
