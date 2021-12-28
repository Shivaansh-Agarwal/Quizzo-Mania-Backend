const express = require("express");
var cors = require('cors');

const { initializeDBConnection } = require("./db/connection.db.js");
const { errorHandler } = require("./middlewares/errorHandler.js");
const { logger } = require("./middlewares/logger.js");
const {
  routeNotFoundHandler,
} = require("./middlewares/routeNotFoundHandler.js");

const {
  questionsRouter,
  quizzesRouter,
  signupRouter,
  loginRouter,
} = require("./v1/routes");

const PORT = process.env.PORT || 3000;
const app = express();

initializeDBConnection();

// Middlewares
app.use(cors())
app.use(express.json());
app.use(logger);

// Routes
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/api/v1/questions", questionsRouter);
app.use("/api/v1/quizzes", quizzesRouter);

app.get("/", (req, res) => {
  res.send("Quiz App Server - by Shivaansh");
});

/**
 * Note: DO NOT MOVE.
 * 404 Route Not Found Handler
 * Error Handler
 */
app.use("/", routeNotFoundHandler);
app.use("/", errorHandler);

app.listen(PORT, () => {
  console.log("Quiz App Server is Started!!");
});
