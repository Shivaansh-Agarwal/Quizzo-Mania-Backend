// 1. https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database
// 2. https://mongoosejs.com/docs/index.html

const mongoose = require("mongoose");
// const { Question } = require("../v1/models/question.model.js");
// const { quizQuestions } = require("../v1/data/questions.js");

async function initializeDBConnection() {
  const { DB_USERNAME, DB_PASSWORD, CLUSTER_URL, DB_NAME } = process.env;
  const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${CLUSTER_URL}/${DB_NAME}?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(uri);
    console.log("\nMongoDB Connection successful!!");
    // Question.insertMany(quizQuestions, function(err, result){
    //   console.log(result);
    // });
  } catch (e) {
    console.error(e);
  }
  // finally {
  //   await mongoose.disconnect();
  //   console.log("MongoDB Connection closed!");
  // }
}

module.exports = { initializeDBConnection };
