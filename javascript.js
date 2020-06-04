var playing = false;
var score;
var action;
var timeremaining;
var correctAns;

document.getElementById("startreset").onclick =
    function () {
        if (playing == true) {
            location.reload();
        } else {
            playing = true;
            score = 0;

            document.getElementById("scorevalue").innerHTML = score;

            show("timeremaining");
            timeremaining = 60;
            document.getElementById("timeremainingvalue").innerHTML = timeremaining;

            //hide game over box
            hide("gameover");

            document.getElementById("startreset").innerHTML = "Reset Game";

            startCountdown();

            generateQA();
        }
    }

for (i = 1; i < 5; i++) {
    //clicking on an answer box
    document.getElementById("box" + i).onclick = function () {
        if (playing == true) {
            if (this.innerHTML == correctAns) {
                score++;

                document.getElementById("scorevalue").innerHTML = score;

                hide("wrong");
                show("correct");
                setTimeout(function () {
                    hide("correct");
                }, 1000);
                generateQA();
            } else {
                hide("correct");
                show("wrong");
                setTimeout(function () {
                    hide("wrong");
                }, 1000);
            }
        }
    }

}
//functions

//start counter
function startCountdown() {
    action = setInterval(function () {
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if (timeremaining == 0) {
            stopCountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p> Game Over!</p> <p>Your score is " + score + ".</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000)
}

//stop counter
function stopCountdown() {
    clearInterval(action);
}

//hide element
function hide(Id) {
    document.getElementById(Id).style.display = "none";
}

//show element
function show(Id) {
    document.getElementById(Id).style.display = "block";
}

//generate question and answer
function generateQA() {
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());

    correctAns = x * y;

    document.getElementById("question").innerHTML = x + "x" + y;

    var correctpos = 1 + Math.round(3 * Math.random());

    document.getElementById("box" + correctpos).innerHTML = correctAns; //fill one box with correct answer

    var answers = [correctAns];
    for (i = 1; i < 5; i++) {
        if (i != correctpos) {
            var wrongAns;
            do {
                wrongAns = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
            }
            while (answers.indexOf(wrongAns) > -1)

            document.getElementById("box" + i).innerHTML = wrongAns;
            answers.push(wrongAns);
        }
    }
}