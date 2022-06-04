/*Global Variables*/
var startButton = document.querySelector("#start-button");

var quizIntroSection = document.querySelector(".quiz-intro-section");
var quizIntroHeading = document.querySelector(".quiz-intro");
var quizSection = document.querySelector(".quiz-section");
var questionPara = document.querySelector("#question-para");
var answerChoices = document.querySelector("#answer-choice-list");

var timeSpanElement = document.querySelector("#time-span");
var timerCounter = 60;

var feedBackSection = document.querySelector(".feedback-section");
var feedBackText = document.querySelector("#feedback-heading");

var gameOverSection = document.querySelector(".game-over-section");

var initialInput = document.querySelector("#initial-textbox");
var submitBtn = document.querySelector("#score-submit-btn");
var scoreForm = document.querySelector("#score-form");

var index = 0;
var timerVariable;
var scoreArray = [];
var localStorageCopy = localStorage.getItem("scores");

/*Array Holding the Questions */
var questionsArray = [
  {
    title: "Inside which HTML element do we put the JavaScript?",
    choices: ["<javascript>", "<script>", "<scripting>", "<js>"],
    correctAnswer: "<script>",
  },
  {
    title:
      "What is the correct syntax for referring to an external script called xxx.js ?",
    choices: [
      "<script name='xxx.js'>",
      "<script href='xxx.js'>",
      "<script src='xxx.js'>",
    ],
    correctAnswer: "<script src='xxx.js'>",
  },
  {
    title: "The external JavaScript file must contain the script tag ?",
    choices: ["False", "True"],
    correctAnswer: "False",
  },
  {
    title: "How do you create a function in JavaScript ?",
    choices: [
      "function=myFunction()",
      "function myFunction()",
      "function.myFunction()",
    ],
    correctAnswer: "function myFunction()",
  },
  {
    title: "How can you add a comment in a JavaScript ?",
    choices: [
      "<!--This is a comment-->",
      "'This is a comment'",
      "//This is a comment",
    ],
    correctAnswer: "//This is a comment",
  },
];

/*This function will hide the Quiz Intro Section and start button */

function hideQuizIntro() {
  quizIntroSection.classList.add("hide-section");
}

/*
 This function will display the hidden placeholder section for the question and answer choices
 */

function displayQuizSection() {
  quizSection.classList.remove("hide-section");
  quizSection.classList.add("show-section");
}

/* 

Function will create list element for answer choices and update the paragraph element with the question
and append to the existing ul element

*/

function createQuiz() {
  //Set the para with the question from the array
  questionPara.innerHTML = questionsArray[index].title;

  //Loop through the answer choices to create li items and append to the ul
  questionsArray[index].choices.forEach(function (element, index, array) {
    let liItem = document.createElement("li");
    liItem.textContent = element;
    answerChoices.append(liItem);
  });
}

/*
Timer function to track the count down timer which will run for 30s 
*/

function startTimer() {
  var timerVariable = setInterval(function () {
    //  If the timer reach 0 or all the question are displayed(quiz is over)
    //clear the timer and return

    if (timerCounter <= 0 || index >= 5) {
      clearInterval(timerVariable);

      //Reset the list items and feedback text even if user doesnt click any answer after starting the quiz
      //and runs out of time
      // resetListItems();

      displayGameOver();
      return;
    }
    --timerCounter;
    timeSpanElement.innerHTML = timerCounter;
  }, 1000);
}

/*
Start Quiz Function below will call functions for
-hiding the intro section,
-display the question-answer choices section 
--create question-choices list
-Start timer 
*/

function startQuiz() {
  startTimer();
  hideQuizIntro();
  displayQuizSection();
  createQuiz();
}

/*Begins the Quiz by clicking the Start Quiz Button */
startButton.addEventListener("click", startQuiz);

/*
Function will hide quiz sections and display the game over section 
with message and option for the user to enter the initial and submit the score
*/

function displayGameOver() {
  quizSection.classList.remove("show-section");
  quizSection.classList.add("hide-section");
  gameOverSection.classList.remove("hide-section");
  gameOverSection.classList.add("show-section");
}

/*This will display the feedback section with the message based on the result */
/*If the answer is wrong,user's time will get reduced by 5sec */

function displayFeedBack(result) {
  //This will display the hidden feedback section
  feedBackSection.classList.remove("hide-section");

  if (result === "correct") {
    feedBackText.innerHTML = " Correct !!";
  } else {
    feedBackText.innerHTML = " Wrong !!";

    //This is to ensure than timer doesnt go negative
    if (timerCounter >= 10) {
      timerCounter -= 10;
    }
  }
}

/*Reset the list items*/
function resetListItems() {
  answerChoices.innerHTML = "";
  questionPara.innerHTML = "";
  feedBackText.innerHTML = "";
}

/*
Function will verify if the selected element is a list item and its not last element in array
If then compare its value with answer and call displayFeedback for correct choice
Else display feedback for wrong choice.

Also Reset the list items and paragraph values for the new question-answer choices

If Index is less than 5 ,go to the next question-Invoke createQuiz
Else game over function is invoked.
*/

function checkAnswer(event) {
  //Resetting the values for new set of question and answers
  resetListItems();

  if (event.target.matches("li") && index < 5) {
    var selectedAnswer = event.target.textContent;

    if (selectedAnswer === questionsArray[index].correctAnswer) {
      displayFeedBack("correct");
    } else {
      displayFeedBack("wrong");
    }
    //Increment the index to pick the next element from question answers array

    index++;
  }

  //If not the last list item ,Navigate to the next set of question and choices
  if (index < 5) {
    createQuiz();
  } else {
    displayGameOver();
  }
}

/*Event Listener added for click on list item and invoke checkAnswer function*/
answerChoices.addEventListener("click", checkAnswer);

//Local storage should have an object of {score :[{SV,10},{AB,11},{CV,20}]
//For every round play the users only recent /last played score will be displayed

function displayScore(event) {
  //Saves the previous score records from local storage and assign it to array
  //Verify if local storage is null if then set array as [] else fetch all array elements from local storage

  var arrayCopy = JSON.parse(localStorage.getItem("scores"));
  scoreArray = arrayCopy === null ? [] : arrayCopy;

  var initialScoreObj = {};
  var initial = initialInput.value;
  var score = timeSpanElement.innerHTML;
  var isInArray = false;

  initialScoreObj[initial] = score;

  for (var i = 0; i < scoreArray.length; i++) {
    /*This will ensure ,if the initial already exist override with recent score */
    if (scoreArray[i][initial]) {
      isInArray = true;
      scoreArray[i] = initialScoreObj;
    }
  }
  if (!isInArray) {
    scoreArray.push(initialScoreObj);
  }
  localStorage.setItem("scores", JSON.stringify(scoreArray));
}

/*Event Listener for Submit button,when user enter score and click submit displayScore is invoked */

scoreForm.addEventListener("submit", displayScore);

/*Feedback text will be hidden/removed when the quiz is over and user focus on the input text box */

initialInput.addEventListener("focus", function () {
  feedBackSection.classList.add("hide-section");
});
