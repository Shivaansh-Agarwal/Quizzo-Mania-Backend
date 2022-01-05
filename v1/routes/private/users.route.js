const express = require("express");
const { verifyToken } = require("../../../middlewares/verifyToken.js");
const { User } = require("../../models/user.model.js");

const router = express.Router();

router.route("/").post(verifyToken, async function(req, res) {
  try {
    console.log("Inside user route 1");
    const { email, completedQuizId } = req.body;
    console.log(email, completedQuizId);
    // Find the relevant Document from the DB
    const response1 = await User.find({
      email: email
    });
    console.log(response1);
    // Check if the response is valid.
    if(response1.length === 1) {
      const { quizAttempted } = response1[0];
      if(!quizAttempted.includes(completedQuizId)) {
        const response2 = await User.updateOne({
          _id: response1[0]._id
        }, { $addToSet: { quizAttempted: completedQuizId}
        });
        const response3 = await User.find({
          _id: response1[0]._id
        });
        console.log("User Details Updated");
        console.log(response3);
        res.status(200).json({
          status: 'success',
          data: response3[0]
        });
      } else {
        res.status(204).json({
          status: 'no update',
          data: null,
        });
      }
    } else {
      res.status(400).json({
        status: "fail",
        message: "Unable to find user with given email"
      });
    }
  } catch(e) {
    console.error(e);
    res.status(400).json({
      status: "error",
      message: "Unable to update user details"
    });
  }
});

module.exports = { router };