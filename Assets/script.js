var timeEl = document.getElementById("countdown")
var timeRemaining = 20
var startBtn = $("#startQuiz")
var scoreBtn = $("#goToScores")
var questionsEl = document.getElementById("questions")
var questionHeader = document.getElementById("questionHeader")
var i = -1
var btnEl = document.getElementsByClassName("btn")
var questions = [
    {question : "dog?",
    answers: [
        `dog 1`,
        `dog 2`,
        `dog 3`,
        `dog 4`,
        ],
    correct : "C"
    },
    {question: `cat?`,
    answers: [
        `cat 1`,
        `cat 2`,
        `cat 3`,
        `cat 4`,
        ],
    correct : "B"
    },
    {question: `monkey?`,
    answers: [
        `monkey 1`,
        `monkey 2`,
        `monkey 3`,
        `monkey 4`,
        ],
    correct : "D"
    },
]

var score = 0
var submitBtn = $("#submit");
var clearBtn = $("#clear");
var highScores = JSON.parse(localStorage.getItem(`highScores`)) || [];
var maxScores = 5

submitBtn.hide();
clearBtn.hide();


startBtn.on("click", countdown)
startBtn.on("click", startGame)   

function countdown() {var interval = setInterval(function (){
    timeRemaining--;
    timeEl.innerHTML = `<li>${timeRemaining} seconds remaining</li>`
    if (timeRemaining <= 0){
        clearInterval(interval);
        timeRemaining = 0
        return;
        // display score and provide box to enter and submit initials
    } 
    }, 1000)
}


function startGame() {
    startBtn.hide()
    scoreBtn.hide()
    nextQuestion()
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
    console.log(highScores);
    highScores.sort( (a,b) => 
        b.score - a.score
    );
    highScores.splice(5);

    localStorage.setItem(`highScores`, JSON.stringify(highScores))
    window.location.assign(`/index.html`)
// show score list and restart button
    // submitBtn.hide();
    questionHeader.innerHTML = `<h2>Highscores:</h2>`;
    // questionsEl.innerHTML = `<p>${endScore}</p>`
    // questionsEl.innerHTML = `<p>${highScores}</p>`
}

function clearScore () {
    window.localStorage.clear()
    initials.value = ``
}


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




function endQuiz() {
    questionHeader.innerHTML = `<h2>Quiz over! Your score is ${score}</h2>`;
    questionsEl.innerHTML = `<input type="text" placeholder = "initials" id="initials" name="initials">`
    submitBtn.show();
    clearBtn.show();
}

// savescore on submit button click

submitBtn.on("click", saveScore)
clearBtn.on("click", clearScore)
