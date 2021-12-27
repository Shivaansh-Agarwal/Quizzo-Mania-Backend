const quizQuestions = [{
  quizId: "61ca17c77d8619b1f6b68cfb",
  questions: [
      {
        id: 1,
        question: "Inside which HTML element do we put the JavaScript?",
        options: [
          {
            choice: "<javascript>",
            isCorrect: false,
          },
          {
            choice: "<js>",
            isCorrect: false,
          },
          {
            choice: "<script>",
            isCorrect: true,
          },
          {
            choice: "<src>",
            isCorrect: false,
          },
        ],
        explanation: "The <script> tag is used to contain javascript code."
      },
      {
        id: 2,
        question: "Where is the correct place to insert a JavaScript?",
        options: [
          {
            choice: "Both the head section and the body section are correct",
            isCorrect: true,
          },
          {
            choice: "The head section",
            isCorrect: false,
          },
          {
            choice: "The body section",
            isCorrect: false,
          },
          {
            choice: "None of the above",
            isCorrect: false,
          },
        ],
        explanation: "We can place the <script> tag inside the head tag or the body tag, both the techniques are correct."
      },
      {
        id: 3,
        question: "Is it necessary for the external script file to contain a <script> tag?",
        options: [
          {
            choice: "Yes",
            isCorrect: false,
          },
          {
            choice: "No",
            isCorrect: true,
          },
          {
            choice: "Depends on the type of include",
            isCorrect: false,
          },
          {
            choice: "None of the above",
            isCorrect: false,
          },
        ],
        explanation: "No, it is not at all necessary to place a <script> tag inside the external javascript code, as your editor already knows it is a javascript code as you have saved the file with .js extension."
      },
    ]
}];

module.exports = { quizQuestions };