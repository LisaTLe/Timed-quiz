const questions = [
  {
    question: "How do you link Javascript in HTML?",
    choices: ["a. <link>", "b. <a>", "c. <src>", "d. <script>"],
    answer: "d. <script>",
  },
  {
    question: "What is Javascript's function?",
    choices: [
      "a. has no purpose",
      "b. style websites",
      "c. make websites interactive",
      "d. structure websites",
    ],
    answer: "c. make websites interactive",
  },
  {
    question: "The abbreviation for Javascript is: ",
    choices: ["a. Java", "b. JS", "c. script", "d. all of the above"],
    answer: "b. JS",
  },
  {
    question: "A string in Javascript is enclosed with: ",
    choices: ["a. Curly brackets", "b. quotes", "c. parentheses", "d. nothing"],
    answer: "b. quotes",
  },
  {
    question: "In Javascript, when a value is either true or false, it is: ",
    choices: ["a. string", "b. boolean", "c. question", "d. number"],
    answer: "b. boolean",
  },
  {
    question: "What does JSON do?",
    choices: [
      "a. saves data in multiple locations",
      "b. delete input",
      "c. stores data in a single string",
      "d. calls out a function",
    ],
    answer: "c. stores data in a single string",
  },
  {
    question: "What is the Javascript language called?",
    choices: ["a. style", "b. script", "c. index", "d. java"],
    answer: "b. script",
  },
  {
    question: "The first index of an array is: ",
    choices: ["a. 0", "b. 1", "c. 8", "d. any"],
    answer: "a. 0",
  },
  {
    question: "Who invented JavaScript?",
    choices: [
      "a. Douglas Crockford",
      "b. Sheryl Sandberg",
      "c. Brendan Eich",
      "d. Ben Javascript",
    ],
    answer: "c. Brendan Eich",
  },
  {
    question: "What is the correct way to write a variable?",
    choices: [
      "a. var StopTime = 'timerstop';",
      "b. var value = '5';",
      "c. var stringName = 'string';",
      "d. variable name = 'Thomas';",
    ],
    answer: "c. var stringName = 'string';",
  },
  {
    question: "How do you add a comment in a JavaScript?",
    choices: [
      "a. //comment here",
      "b. <!--comment here-->",
      "c. 'comment here'",
      "d. *comment here*",
    ],
    answer: "a. //comment here",
  },
  {
    question: "How do tou find a HTML element in the DOM by using the ID?",
    choices: [
      "a. getElementById()",
      "b. querySelector()",
      "c. getElementsByTagName()",
      "d. innerHTML",
    ],
    answer: "a. getElementById",
  },
];

var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");

var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("start-quiz-button");

var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var choiceD = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");

var summary = document.getElementById("summary");
var submitInitialBtn = document.getElementById("submitInitialBtn");
var initialInput = document.getElementById("initialInput");
var everything = document.getElementById("everything");

var highScoreSection = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");

var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn");
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");

var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;

// WHEN I click the start button, timer starts
var totalTime = 60;
function newQuiz() {
  questionIndex = 0;
  totalTime = 60;
  timeLeft.textContent = totalTime;
  initialInput.textContent = "";

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

// then presented with questions and choices
function showQuiz() {
  nextQuestion();
}

function nextQuestion() {
  questionTitle.textContent = questions[questionIndex].question;
  choiceA.textContent = questions[questionIndex].choices[0];
  choiceB.textContent = questions[questionIndex].choices[1];
  choiceC.textContent = questions[questionIndex].choices[2];
  choiceD.textContent = questions[questionIndex].choices[3];
}

// after question is answered, show if correct or wrong
function checkAnswer(answer) {
  var lineBreak = document.getElementById("lineBreak");
  lineBreak.style.display = "block";
  answerCheck.style.display = "block";

  if (
    questions[questionIndex].answer === questions[questionIndex].choices[answer]
  ) {
    // correct answer, add 1 score to final score
    correctAns++;
    // console.log(correctAns);
    answerCheck.textContent = "Correct!";
  } else {
    // wrong answer, deduct 10 second from timer
    totalTime -= 10;
    timeLeft.textContent = totalTime;
    answerCheck.textContent =
      "Wrong! The correct answer is: " + questions[questionIndex].answer;
  }

  questionIndex++;
  // repeat with the rest of questions
  if (questionIndex < questions.length) {
    nextQuestion();
  } else {
    // if no more question, run game over function
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

// when all questions are answered or timer reaches 0, game over
function gameOver() {
  summary.style.display = "block";
  questionDiv.style.display = "none";
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
    alert("Please enter your initials!");
    return;
  }

  startDiv.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "none";
  summary.style.display = "none";
  highScoreSection.style.display = "block";

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

  // stringify array to store in local
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
  questionDiv.style.display = "none";
  timesUp.style.display = "none";
  summary.style.display = "none";
  highScoreSection.style.display = "block";

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
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitInitialBtn.addEventListener("click", function (event) {
  storeHighScores(event);
});

viewHighScore.addEventListener("click", function (event) {
  showHighScores(event);
});

goBackBtn.addEventListener("click", function () {
  startDiv.style.display = "block";
  highScoreSection.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function () {
  window.localStorage.removeItem("high scores");
  listOfHighScores.innerHTML = "High Scores Cleared!";
});
