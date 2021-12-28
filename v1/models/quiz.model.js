const mongoose = require("mongoose");
const { Schema } = mongoose;

const quizSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
    name: {
      type: "String",
    },
    category: {
      type: "String",
    },
    thumbnail: {
      type: "String"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Quiz = mongoose.model("Quizze", quizSchema);

module.exports = { Quiz };
