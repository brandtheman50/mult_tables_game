/*if we click on the start/reset button 
    if we are playing
        reload page
    if we are not playing
        set score to 0
        show countdown box
        reduce time by 1 sec in loops
        if there is time left
            continue
        else 
            gameover 
        change button to reset
        generate a new question and multiple answers
    if we click on answer box
        if we are playing
            correct?
                yes
                    increase score +1
                    show correct box for 1 sec
                    generate new question and answers
                no
                    show try again box for 1 sec
*/
var playing = false; 
var score;
var action;
var timeremaining;
var correctAnswer;

document.getElementById("startreset").onclick = function() {
    hide("gameover");
    var startreset = document.getElementById("startreset");
    if(playing == false) {  //Start game
        playing = true;
        score = 0;
        startreset.innerHTML = "Reset Game";
        var scorevalue = document.getElementById("scorevalue");

        //Set score to 0

        scorevalue.innerHTML = score; 
        show("time")

        startCountdown();
        
        //generate a new Q&A

        generate();
        
    }
    else if(playing == true) {
        window.location.reload(); //reload page
    }

}

for(i = 1; i<5; i++) {
    document.getElementById("box" + i).onclick = function(){
        if (playing == true) {
            if (this.innerHTML == correctAnswer) {
                ++score;
                document.getElementById("scorevalue").innerHTML = score;
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                }, 1000);
    
                //Generate new Q&A
                generate();
            }
            else {
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                }, 1000);
            }
        }
    }
}
//functions

//start counter
function startCountdown() {
    timeremaining = 60; 
    action = setInterval(function(){
        timeremaining--; 
        document.getElementById("timevalue").innerHTML = timeremaining;
        if (timeremaining == 0) {
            stopCountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>Game Over!</p><p>Your score is " + score + ".</p>";
            hide("time");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
        }, 1000);
}

//stop counter
function stopCountdown() {
    clearInterval(action);
}

//hides an element
function hide(id) {
    document.getElementById(id).style.display = "none";
}

//display an element
function show(id) {
    document.getElementById(id).style.display = "block";
}

function generate() {
    var x = 1 + Math.round(11 * Math.random());
    var y = 1 + Math.round(11 * Math.random());
    correctAnswer = x * y; 
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctBox = 1 + Math.round(3 * Math.random());

    //Place correct answer in random box
    document.getElementById("box" + correctBox).innerHTML = correctAnswer;
    var answers = [correctAnswer];
    for(i=1; i<=4; ++i) {
        if (i !== correctBox) {
            var wrongAnswer;
            do {
                wrongAnswer = (1 + Math.round(11 * Math.random())) * (1 + Math.round(11 * Math.random()));
            } while(answers.indexOf(wrongAnswer) > -1);
            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
            }
    }
}