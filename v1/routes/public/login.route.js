const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user.model.js");

const router = express.Router();

router
  .route("/")
  .post(
    checkIfBothUsernamePasswordPresent,
    checkIfEmailExists,
    checkPasswordAuthenticity,
    generateToken,
    async (req, res) => {
      const { authorizationToken } = req;
      res.status(200).json({
        status: "success",
        data: {
          authorizationToken,
        },
      });
    }
  );

router.use("/", (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    data: null,
    message: "Error in Login Route!",
  });
});

function checkIfBothUsernamePasswordPresent(req, res, next) {
  if (req.body.email && req.body.password) {
    next();
  } else {
    res.status(400).json({
      status: "fail",
      data: null,
      message: "Both Email and Password are requied for Login",
    });
    return;
  }
}

async function checkIfEmailExists(req, res, next) {
  const result = await User.find({ email: req.body.email });
  if (result.length === 1) {
    next();
  } else {
    res.status(400).json({
      status: "fail",
      data: null,
      message: "Please enter correct email",
    });
    return;
  }
}

async function checkPasswordAuthenticity(req, res, next) {
  const result = await User.find({ email: req.body.email });
  const password = req.body.password;
  const { hashedPassword } = result[0];
  const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
  if (isPasswordCorrect) {
    req.user = result[0];
    next();
  } else {
    res.status(400).json({
      status: "fail",
      data: null,
      message: "Password is incorrect",
    });
    return;
  }
}

async function generateToken(req, res, next) {
  const PRIVATE_KEY = process.env["PRIVATE_KEY"];
  try {
    const payload = {
      email: req.user.email,
      username: req.user.username,
      hashedPassword: req.user.hashedPassword,
    };
    const token = await jwt.sign(payload, PRIVATE_KEY, { expiresIn: "1d" });
    req.authorizationToken = token;
    next();
  } catch (e) {
    res.status(500).json({
      status: "error",
      data: null,
      message: "Error while generating JWT Token in Login Route.",
    });
    console.error(e);
  }
}

module.exports = { router };
