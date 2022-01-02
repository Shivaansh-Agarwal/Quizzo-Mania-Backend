// 1. https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database
// 2. https://mongoosejs.com/docs/index.html

const mongoose = require("mongoose");
const { Quiz } = require("../v1/models/quiz.model.js");
const { Question } = require("../v1/models/question.model.js");
// const { quizQuestions } = require("../v1/data/questions.js");

async function initializeDBConnection() {
  const { DB_USERNAME, DB_PASSWORD, CLUSTER_URL, DB_NAME } = process.env;
  const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${CLUSTER_URL}/${DB_NAME}?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(uri);
    console.log("\nMongoDB Connection successful!!");
    // await createQuestionsData();
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

// async function createQuestionsData(){
//   console.log("Inside Create Questions data!!");
//   const response1 = await Quiz.find({});
//   console.log(response1);
//   const quizList = response1;
//   quizList.forEach(async (quiz, index) => {
//     console.log(quiz._id) 
//     const questionsList = quizQuestions[quiz._id];
//     const questionsObj = {
//       quizId: quiz._id,
//       correctAnsPoints: 5,
//       wrongAnsPoints: -4,
//       questions: questionsList
//     };
//     const response2 = await Question.create(questionsObj);
//     console.log(response2);
//   });
//   console.log("Questions created successfully.");
// }

module.exports = { initializeDBConnection };


