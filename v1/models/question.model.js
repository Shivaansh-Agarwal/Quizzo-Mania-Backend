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
  _id: Schema.Types.ObjectId,
  quizId: {
    type: Schema.Types.ObjectId,
    ref: "Quizze",
  },
  questions: [questionSchema],
});

const Question = mongoose.model("Question", quizQuestionsSchema);

module.exports = { Question };
