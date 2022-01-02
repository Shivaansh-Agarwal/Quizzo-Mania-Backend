const { router: questionsRouter } = require("./private/questions.route.js");
const { router: quizzesRouter } = require("./private/quizzes.route.js");
const { router: userRouter } = require("./private/users.route.js");

const { router: signupRouter } = require("./public/signup.route.js");
const { router: loginRouter } = require("./public/login.route.js");

module.exports = {
  questionsRouter,
  quizzesRouter,
  userRouter,
  loginRouter,
  signupRouter,
};
