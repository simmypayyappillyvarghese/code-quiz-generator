/*Global Variables*/
var startButton = document.querySelector("#start-button");

var quizIntroSection = document.querySelector(".quiz-intro-section");
var quizIntroHeading =document.querySelector(".quiz-intro");
var quizSection = document.querySelector(".quiz-section");

var questionPara = document.querySelector("#question-para");
var answerChoices = document.querySelector("#answer-choice-list");

var timeSpanElement = document.querySelector("#time-span");
var index=0;

var questionsArray = [
  {
    title: "Inside which HTML element do we put the JavaScript?",
    choices: ["<javascript>", "<script>", "<scripting>", "<js>"],
    correctAnswer: "<script>",
  },
  {
    title: "What is the correct syntax for referring to an external script called xxx.js?",
    choices: ["<script name='xxx.js'>", "<script href='xxx.js'>", "<script src='xxx.js'>"],
    correctAnswer: "<script src='xxx.js'>",
  },
  {
    title: "The external JavaScript file must contain the <script> tag?",
    choices: ["False", "True"],
    correctAnswer: "False",
  },
  {
    title: "How do you create a function in JavaScript?",
    choices: ["function=myFunction()", "function myFunction()", "function.myFunction()"],
    correctAnswer: "function myFunction()",
  },
  {
    title: "How can you add a comment in a JavaScript?",
    choices: ["<!--This is a comment-->", "'This is a comment'", "//This is a comment"],
    correctAnswer: "//This is a comment",
  },
];

var timerCounter = timeSpanElement.innerHTML;
var timerVariable;
var finalScore;

var feedBackSection = document.querySelector(".feedback-section");
var feedBackText = document.querySelector("#feedback-heading");


var gameOverSection=document.querySelector(".game-over-section");




/*This function will hide the Quiz Intro and start button */
function hideQuizIntro() {
  quizIntroSection.classList.add("hide-section");
}

/* Function will update the paragraph element with the question,
    create list item for each choices  and update textContent with the values
*/

function createQuiz() {  
     

console.log("Inside create quiz"+index);
  questionPara.innerHTML = questionsArray[index].title;

  questionsArray[index].choices.forEach(function (element, index, array) {
    let liItem = document.createElement("li");
    liItem.textContent = element;
    answerChoices.append(liItem);
  });
  index++;
  
  }
  


function displayQuizSection() {
  quizSection.classList.remove("hide-section");
  quizSection.classList.add("show-section");
}

/*Start the timer and update the display */

function startTimer() {

   
  var timerVariable = setInterval(function () {
    if (timerCounter <= 0) {
      clearInterval(timerVariable);
      return;
    }

    timerCounter--;
    timeSpanElement.innerHTML = timerCounter;
    console.log(timerCounter);

  }, 1000);
}

/*Function below will call functions for
-hiding the intro section,
-display the question-answers section and start time 
-create question-choices list
-start timer
*/

function startQuiz() {

  hideQuizIntro();
  displayQuizSection();
  createQuiz();
  startTimer();

}
/*Display Game over function */

function displayGameOver(){
    feedBackSection.classList.add('hide-section');
    gameOverSection.classList.remove('hide-section');
    gameOverSection.classList.add('show-section');
    console.log("display game over");
}


/*This will display the feedback section with the message based on the result */
/*If the answer is wrong,time will get reduced by 5sec */

function displayFeedBack(result) {
  feedBackSection.classList.remove("hide-section");

  if (result === "correct") {
    feedBackText.innerHTML = "You are Correct !!";
  } 
  else {
   
    feedBackText.innerHTML = "You are Wrong !!";   
   if(timerCounter>=5){
       timerCounter-=5;
    }  
   else{timerCounter=0; }
  }
  
  return;
}

/*Function will verify if the selected element is a list item 
and compare its value with answer and call displayFeedback 
to display feedback */

function checkAnswer(event) {

  if (event.target.matches("li") && index<5) {
    var selectedAnswer = event.target.textContent;
    
    if (selectedAnswer === questionsArray[index].correctAnswer) {
      displayFeedBack("correct");

    } else {
      displayFeedBack("wrong");
    }
}
    //To iterqate through array,resetting values 
    console.log("Index"+index);

    answerChoices.innerHTML="";    
      questionPara.innerHTML="";
      feedBackText.innerHTML="";
    // index++;
    if(index<5){
      createQuiz();
    }
    else{
        timerCounter=0;
        timeSpanElement.innerHTML=0;
        displayGameOver();
        console.log("Inside else");
    }
    
  
  return;

}
/*Event Listener for click event on Start Quiz button */
startButton.addEventListener("click", startQuiz);

/*Event Listener for click event on answer list*/
answerChoices.addEventListener("click", checkAnswer);
