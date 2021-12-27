const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
    },
    username: {
      type: String,
    },
    hashedPassword: {
      type: String,
    },
    quizAttempted: [String],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = mongoose.model("User", userSchema);
module.exports = { User };
