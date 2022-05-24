var timeEl = document.getElementById("countdown")
var timeRemaining = 20
var startBtn = $("#startQuiz")
var scoreBtn = $("#scoreBtn")
var questionsEl = document.getElementById("questions")
var questionHeader = document.getElementById("questionHeader")
var scoreList = document.getElementById("scoreList")
var i = -1
var btnEl = document.getElementsByClassName("btn")
var questions = [
    {question : "Which of the following type of variable is visible everywhere in your JavaScript code?",
    answers: [
        `Local Variable`,
        `Total Variable`,
        `Global Variable`,
        `All variables are visible everywhere`,
        ],
    correct : "C"
    },
    {question: `What method allows you to add elements to the end of an array and returns the new length of the array?`,
    answers: [
        `append()`,
        `push()`,
        `concat()`,
        `last()`,
        ],
    correct : "B"
    },
    {question: `Which of the following can be used to loop a function?`,
    answers: [
        "for (var i=0; i < a.length; i++) {}",
        `forEach()`,
        `while() {}`,
        `All of the above`,
        ],
    correct : "D"
    },
]

var score = 0
var submitBtn = $("#submit");
var clearBtn = $("#clear");
var viewScoresBtn = $("#scoreBtn")
var highScores = JSON.parse(localStorage.getItem(`highScores`)) || [];
var scoreString = highScores.map(endScore => { 
    return `<li class="high-score">${endScore.initials}: ${endScore.score}</li>`;
        })
        .join("");
var maxScores = 5

submitBtn.hide();
clearBtn.hide();

// scoreList.style.display = "none";


startBtn.on("click", countdown)
startBtn.on("click", startGame)   

// handles timer countdown
function countdown() {var interval = setInterval(function (){
    timeRemaining--;
    timeEl.innerHTML = `<li>${timeRemaining} seconds remaining</li>`
    if (timeRemaining <= 0){
        clearInterval(interval);
        timeRemaining = 0
        endQuiz();
    } 
    }, 1000)
}


function startGame() {
    startBtn.hide()
    scoreBtn.hide()
    clearBtn.hide()
    nextQuestion()
    scoreList.style.display = "none";

}

console.log(score + `pre`)

// put initials and score as an object in local storage, then go back to start of the quiz
saveScore = e => {
    e.preventDefault();
    var initials = document.getElementById(`initials`);
    var endScore = {
        initials: initials.value,
        score: score
    };
    highScores.push(endScore);
    highScores.sort( (a,b) => 
        b.score - a.score
    );
    highScores.splice(5);
    console.log(highScores)

    localStorage.setItem(`highScores`, JSON.stringify(highScores));
    window.location.assign(`/index.html`);
// show score list and restart button
    questionHeader.innerHTML = `<h2>Highscores:</h2>`;
    scoreList.style.display = "block";
    
    console.log(scoreString)
    scoreList.innerHTML = scoreString
}

// removes scores from local storage and clears any scores displayed on the page
function clearScore () {
    while (scoreList.firstChild) {
        scoreList.removeChild(scoreList.firstChild);
    }
    window.localStorage.clear()
    // initials.value = ``
    
}

// displays up to the 5 highest scores
function viewScores() {
    questionHeader.innerHTML = `<h2>Highscores:</h2>`
    scoreList.innerHTML = scoreString
    clearBtn.show()
    viewScoresBtn.hide()
}

// generates the next question
function nextQuestion () {
    i++
    // Check if quiz is over befire continuing
    if (i > 2 || timeRemaining <= 0){
        timeRemaining = 1
        endQuiz();
        return;
    } else {
    var {question, answers} = questions[i]
    questionHeader.innerHTML = `<h2>${question}</h2>`
    questionsEl.innerHTML = `<button class="btn" value="A" onclick="checkAnswer(event, i)">${answers[0]}</button>`
    questionsEl.innerHTML += `<button class="btn" value="B" onclick="checkAnswer(event, i)">${answers[1]}</button>`
    questionsEl.innerHTML += `<button class="btn" value="C" onclick="checkAnswer(event, i)">${answers[2]}</button>`
    questionsEl.innerHTML += `<button class="btn" value="D" onclick="checkAnswer(event, i)">${answers[3]}</button>`
    }
}



function checkAnswer (event, i) {
    // see if selection is right, button turns green if correct, red if wrong.
    if (event.target.value === questions[i].correct) {
        score=score+10;
        event.target.setAttribute("class", "correct")
        console.log(score + `post`);
    } else {event.target.setAttribute("class", "wrong");
        timeRemaining= timeRemaining - 5
        }
    // advance to next question
    setTimeout(() => {nextQuestion()   
    }, 250);
}



// ends quiz, and allows for entering initials for your score
function endQuiz() {
    questionHeader.innerHTML = `<h2>Quiz over! Your score is ${score}</h2>`;
    questionsEl.innerHTML = `<input type="text" placeholder = "initials" id="initials" name="initials">`
    submitBtn.show();
    clearBtn.show();
}

// savescore on submit button click

submitBtn.on("click", saveScore)
clearBtn.on("click", clearScore)
viewScoresBtn.on("click", viewScores)
