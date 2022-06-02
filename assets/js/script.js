/*Global Variables*/
var startButton=document.querySelector('#start-button');

var quizIntroSection=document.querySelector('.quiz-intro-section');
var quizSection=document.querySelector('.quiz-section');

var questionPara=document.querySelector('#question-para');
var answerChoices=document.querySelector('#answer-choice-list');

var timeSpanElement=document.querySelector('#time-span');

var questionsArray=[
    {
    title:"Inside which HTML element do we put the JavaScript?",
    choices:["<javascript>","<script>","<scripting>","<js>"],
    correctAnswer:"<script>"
    }
];

var timerCounter=timeSpanElement.innerHTML;


/*This function will hide the Quiz Intro and start button */
function hideQuizIntro(){

quizIntroSection.classList.add('hide-section');

}

/* Function will update the paragraph element with the question,
    create list item for each choices  and update textContent with the values
*/

function createQuiz(){
    
    questionPara.innerHTML=questionsArray[0].title;

    questionsArray[0].choices.forEach(function(element,index,array){
        var liItem=document.createElement('li');
        liItem.textContent=element;
        answerChoices.append(liItem);
    });

    }


function displayQuizSection(){

quizSection.classList.remove('hide-section');

}

/*Start the timer and update the display */

function startTimer(){

    var timerVariable=setInterval(function(){

        timerCounter--;
        timeSpanElement.innerHTML=timerCounter;
        if(timerCounter<=0){
            clearInterval(timerVariable);
        }

    },1000);
}


/*Function below will call functions for
-hiding the intro section,
-display the question-answers section and start time 
-create question-choices list
-start timer
*/

function startQuiz(){

    hideQuizIntro();
    displayQuizSection();
    createQuiz();
    startTimer();
}


/*Event Listener for click event on Start Quiz button */
startButton.addEventListener('click',startQuiz);