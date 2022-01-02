const mongoose = require("mongoose");
const { Schema } = mongoose;

const optionSchema = new Schema({
  choice: {
    type: String,
  },
  isCorrect: Boolean,
});

const questionSchema = new Schema({
  question: {
    type: "String",
  },
  options: [optionSchema],
  explanation: {
    type: "String",
  },
});

const quizQuestionsSchema = new Schema({
  quizId: {
    type: Schema.Types.ObjectId,
    ref: "Quizze",
  },
  correctAnsPoints: Number,
  wrongAnsPoints: Number,
  questions: [questionSchema],
});

const Question = mongoose.model("Question", quizQuestionsSchema);

module.exports = { Question };
