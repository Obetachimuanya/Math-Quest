let n1;
let n2;
let opSelector;
let ansOpt;
let answer;
let qNo = document.getElementById("Qno");
let score = document.getElementById("score");
let question = document.getElementById("question");
let buttons = document.getElementsByTagName("button");
let start = document.getElementById("start-btn");
let fScore = document.getElementById("final-score");
let startBox = document.getElementById("start-game");
let gameBox = document.getElementById("in-game");
let endBox = document.getElementById("end-game");
let progress = document.getElementById("progress");
let message = document.getElementById("message");
let operator = ['+', '-', '*', '/'];
let t;

function restart() {
    score.innerHTML = "0";
    qNo.innerHTML = "0";
    nextQuestion();

    gameBox.style.display = "block"
    startBox.style.display = "none";
    endBox.style.display = "none";
    timer.style.display = "block";
}

function whenFinished() {
    console.log("Finished.")
    gameBox.style.display = "none"
    startBox.style.display = "none";
    endBox.style.display = "flex";
    lastmessage();
}

function nextQuestion() {

    progress.style.width = "100%";
    timed();
    // timed();
    fScore.innerHTML = score.innerHTML;
    if (qNo.innerText == "10") {
        whenFinished();
    }
    n1 = Math.floor(Math.random() * 100);
    n2 = Math.floor(Math.random() * 100);
    opSelector = operator[Math.floor(Math.random() * 4)];

    if (opSelector == "/") {
        for (let i = 0; i < 200; i++) {
            if (n1 % n2 == 0 && n1 != 0 && n2 != 0 && n2 != 1 && n1 != n2) {
                break;
            }
            n1 = Math.floor(Math.random() * 100);
            n2 = Math.floor(Math.random() * 100);
        }
    }

    if (opSelector == "*") {
        for (let i = 0; i < 100; i++) {
            if (n1 * n2 <= 1000) {
                break;
            }
            n1 = Math.floor(Math.random() * 50);
            n2 = Math.floor(Math.random() * 50);
        }
    }
    question.innerHTML = n1 + opSelector + n2;
    answer = eval(question.innerHTML);
    question.innerHTML = question.innerHTML + " = ?";

    // console.log("answer: " + answer);
    getOptions();
    getQNo();

}

function getOptions() {

    for (let i = 0; i < 4; i++ && i != ansOpt) {
        if (answer > 100) {
            buttons[i].innerHTML = answer + Math.floor(Math.random() * answer * 0.4);
        } else if (answer > 30 && answer < 100) {
            buttons[i].innerHTML = answer + Math.floor(Math.random() * answer * 0.6);
        } else {
            buttons[i].innerHTML = Math.floor(Math.random() * 100);
        }

        if (answer < 0) {
            buttons[i].innerHTML = "-" + buttons[i].innerHTML;
        }
    }
    ansOpt = Math.floor(Math.random() * 4);
    buttons[ansOpt].innerHTML = answer;
}

function getQNo() {
    qNo.innerHTML = parseInt(qNo.innerHTML) + 1;
    // console.log("Q no: " + qNo.innerHTML);
}

// 
function getScore() {
    let currentScore = parseInt(score.innerHTML);
    
 
    let points = parseInt(progress.style.width) / 10;
    
   
    currentScore += points;
    if (currentScore > 100) {
        currentScore = 100; 
    }

    score.innerHTML = currentScore; 
}
//  function getScore(){
// score.innerHTML = parseInt(score.innerHTML) + parseInt(progress.style.width);
// }

function doWhenCorrect(i) {
    buttons[i].style.color = "#fff";
    buttons[i].style.backgroundColor = "green";
    getScore();
}

// function doWhenIncorrect(i) {
//     buttons[i].style.color = "#fff";
//     buttons[i].style.backgroundColor = "#fb3640";
//     // console.log("wrong");
// }

function doWhenIncorrect(i) {
    buttons[i].style.color = "#fff"; // Change text color to white
    buttons[i].style.backgroundColor = "#fb3640"; // Red background for wrong answers

    // Add the shake animation class to the button
    buttons[i].classList.add('shake');
    
   
    if (navigator.vibrate) {
        navigator.vibrate(200);
    }

    // Remove the shake class after the animation ends (0.3 seconds)
    setTimeout(() => {
        buttons[i].classList.remove('shake');
    }, 300);
}


function outro(i) {
    setTimeout(() => {
        nextQuestion();
        buttons[i].style.color = "#000";
        buttons[i].style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    }, 500);
}

function lastmessage() {
    clearInterval(t);
    
    // Display score as "X/100"
    // fScore.innerHTML = score.innerHTML + "/100";

    if (parseInt(score.innerHTML) >= 80) {  // Adjust thresholds based on the new scale
        let emoji = "&#127942";  // Trophy emoji
        message.innerHTML = "Amazing! You're a math genius!" + emoji;
    } else if (parseInt(score.innerHTML) >= 60) {
        let emoji = "&#128293";  // Fire emoji
        message.innerHTML = "Wow! You're on fire!" + emoji;
    } else if (parseInt(score.innerHTML) >= 30) {
        let emoji = "&#128512";  // Grinning face emoji
        message.innerHTML = "Good job! Keep it up!" + emoji;
    } else {
        let emoji = "&#128578";  // Smiling face emoji
        message.innerHTML = "Nice try! You can do it!" + emoji;
    }
}



buttons[0].addEventListener('click', () => {
    if (buttons[0].innerText == answer) {
        doWhenCorrect(0);
    } else {
        doWhenIncorrect(0);
    }
    clearInterval(t);
    outro(0);
});
buttons[1].addEventListener('click', () => {
    if (buttons[1].innerText == answer) {
        doWhenCorrect(1);
    } else {
        doWhenIncorrect(1);
    }
    clearInterval(t);
    outro(1);
});
buttons[2].addEventListener('click', () => {
    if (buttons[2].innerText == answer) {
        doWhenCorrect(2);
    } else {
        doWhenIncorrect(2);;
    }
    clearInterval(t);
    outro(2);
});
buttons[3].addEventListener('click', () => {
    if (buttons[3].innerText == answer) {
        doWhenCorrect(3);
    } else {
        doWhenIncorrect(3);
    }
    clearInterval(t);
    outro(3);
});



function timed() {
    clearInterval(t); // Clear any previous interval to avoid multiple intervals running
    t = setInterval(() => {
        let progressValue = parseInt(progress.style.width); // Get the current width value as a number

        // Decrease the progress bar width
        progressValue -= 1;
        progress.style.width = progressValue + "%"; // Update the width of the progress bar

    
        let red = (100 - progressValue) * 2.55;  // Red value increases as the width decreases
        let green = progressValue * 2.55;  // Green value decreases as the width decreases
        progress.style.backgroundColor = `rgb(${red}, ${green}, 0)`;  // Color transition from green to red

        console.log("called");
        // Check if progress has reached 0
        if (progressValue <= 0) {
            clearInterval(t)
            nextQuestion();  
        }
    }, 210);  
}

