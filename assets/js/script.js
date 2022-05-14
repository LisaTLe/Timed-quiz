//questions for quiz
const questions = [
  {
    question: "How do you link Javascript in HTML?",
    option: ["a. <link>", "b. <a>", "c. <src>", "d. <script>"],
    correctAnswer: "d. <script>",
  },
  {
    question: "What is Javascript's function?",
    option: [
      "a. has no purpose",
      "b. style websites",
      "c. make websites interactive",
      "d. structure websites",
    ],
    correctAnswer: "c. make websites interactive",
  },
  {
    question: "A string in Javascript is enclosed with: ",
    option: ["a. Curly brackets", "b. quotes", "c. parentheses", "d. nothing"],
    correctAnswer: "b. quotes",
  },
  {
    question: "In Javascript, when a value is either true or false, it is: ",
    option: ["a. string", "b. boolean", "c. question", "d. number"],
    correctAnswer: "b. boolean",
  },
  {
    question: "What does JSON do?",
    option: [
      "a. saves data in multiple locations",
      "b. delete input",
      "c. stores data in a single string",
      "d. calls out a function",
    ],
    correctAnswer: "c. stores data in a single string",
  },
  {
    question: "What is the Javascript language called?",
    option: ["a. style", "b. script", "c. index", "d. java"],
    correctAnswer: "b. script",
  },
  {
    question: "The first index of an array is: ",
    option: ["a. 0", "b. 1", "c. 8", "d. any"],
    correctAnswer: "a. 0",
  },
  {
    question: "What is the correct way to write a variable?",
    option: [
      "a. var StopTime = 'timerstop';",
      "b. var value = '5';",
      "c. var stringName = 'string';",
      "d. variable name = 'Thomas';",
    ],
    correctAnswer: "c. var stringName = 'string';",
  },
  {
    question: "How do you add a comment in a JavaScript?",
    option: [
      "a. //comment here",
      "b. <!--comment here-->",
      "c. 'comment here'",
      "d. *comment here*",
    ],
    correctAnswer: "a. //comment here",
  },
  {
    question: "How do tou find a HTML element in the DOM by using the ID?",
    option: [
      "a. getElementById()",
      "b. querySelector()",
      "c. getElementsByTagName()",
      "d. innerHTML",
    ],
    correctAnswer: "a. getElementById",
  },
];
//timer variables
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");
//start variables
var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("start-quiz-button");
//quiz components
var questionCard = document.getElementById("questionCard");
var questionTitle = document.getElementById("questionTitle");
var optionA = document.getElementById("btn0");
var optionB = document.getElementById("btn1");
var optionC = document.getElementById("btn2");
var optionD = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");
//submission and results
var summary = document.getElementById("summary");
var submitBtn = document.getElementById("submit-btn");
var initialInput = document.getElementById("initialInput");

var highScore = document.getElementById("highScore");
var finalScore = document.getElementById("finalScore");

var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn");
var viewHighScore = document.getElementById("viewScore");
var listOfHighScores = document.getElementById("listOfHighScores");

var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;

// start quiz;timer starts
var totalTime = 60;
function newQuiz() {
  questionIndex = 0;
  totalTime = 60;
  timeLeft.textContent = totalTime;
  initialInput.textContent = "";
  //timer reaches 0; quiz ends
  var startTimer = setInterval(function () {
    totalTime--;
    timeLeft.textContent = totalTime;
    if (totalTime <= 0) {
      clearInterval(startTimer);
      if (questionIndex < questions.length - 1) {
        gameOver();
      }
    }
  }, 1000);

  showQuiz();
}

//quiz
function showQuiz() {
  nextQuestion();
}

function nextQuestion() {
  questionTitle.textContent = questions[questionIndex].question;
  optionA.textContent = questions[questionIndex].option[0];
  optionB.textContent = questions[questionIndex].option[1];
  optionC.textContent = questions[questionIndex].option[2];
  optionD.textContent = questions[questionIndex].option[3];
}

//display answer
function checkAnswer(correctAnswer) {
  var lineBreak = document.getElementById("lineBreak");
  lineBreak.style.display = "block";
  answerCheck.style.display = "block";

  if (
    questions[questionIndex].correctAnswer ===
    questions[questionIndex].option[correctAnswer]
  ) {
    // correct answer, add 1 score to final score
    correctAns++;
    // console.log(correctAns);
    answerCheck.textContent = "Correct!";
  } else {
    // wrong answer, subtract 10 second from timer
    totalTime -= 10;
    timeLeft.textContent = totalTime;
    answerCheck.textContent =
      "Wrong! The correct answer is: " + questions[questionIndex].correctAnswer;
  }

  questionIndex++;
  // repeat with the rest of questions
  if (questionIndex < questions.length) {
    nextQuestion();
  } else {
    gameOver();
  }
}

function chooseA() {
  checkAnswer(0);
}

function chooseB() {
  checkAnswer(1);
}

function chooseC() {
  checkAnswer(2);
}

function chooseD() {
  checkAnswer(3);
}

//all questions are answered or timer reaches 0; game over
function gameOver() {
  summary.style.display = "block";
  questionCard.style.display = "none";
  startDiv.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "block";

  // show final score
  finalScore.textContent = correctAns;
}

// enter initial and store highscore in local storage
function storeHighScores(event) {
  event.preventDefault();

  if (initialInput.value === "") {
    alert("Type your initials");
    return;
  }

  startDiv.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "none";
  summary.style.display = "none";
  highScore.style.display = "block";

  // store scores into local storage
  var savedHighScores = localStorage.getItem("high scores");
  var scoresArray;

  if (savedHighScores === null) {
    scoresArray = [];
  } else {
    scoresArray = JSON.parse(savedHighScores);
  }

  var userScore = {
    initials: initialInput.value,
    score: finalScore.textContent,
  };

  console.log(userScore);
  scoresArray.push(userScore);

  //one sting for storage in local
  var scoresArrayString = JSON.stringify(scoresArray);
  window.localStorage.setItem("high scores", scoresArrayString);

  //current highscores
  showHighScores();
}

// show high scores
var i = 0;
function showHighScores() {
  startDiv.style.display = "none";
  timer.style.display = "none";
  questionCard.style.display = "none";
  timesUp.style.display = "none";
  summary.style.display = "none";
  highScore.style.display = "block";

  var savedHighScores = localStorage.getItem("high scores");

  // check in local storage
  if (savedHighScores === null) {
    return;
  }
  console.log(savedHighScores);

  var storedHighScores = JSON.parse(savedHighScores);

  for (; i < storedHighScores.length; i++) {
    var eachNewHighScore = document.createElement("p");
    eachNewHighScore.innerHTML =
      storedHighScores[i].initials + ": " + storedHighScores[i].score;
    listOfHighScores.appendChild(eachNewHighScore);
  }
}

startQuizBtn.addEventListener("click", newQuiz);
optionA.addEventListener("click", chooseA);
optionB.addEventListener("click", chooseB);
optionC.addEventListener("click", chooseC);
optionD.addEventListener("click", chooseD);

submitBtn.addEventListener("click", function (event) {
  storeHighScores(event);
});

viewHighScore.addEventListener("click", function (event) {
  showHighScores(event);
});

goBackBtn.addEventListener("click", function () {
  startDiv.style.display = "block";
  highScore.style.display = "none";
});
//clear highscore list
clearHighScoreBtn.addEventListener("click", function () {
  window.localStorage.removeItem("high scores");
  listOfHighScores.innerHTML = "High Scores Cleared!";
});
