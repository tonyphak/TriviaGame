//Create objects for questions and answers

var friendsQuestion = [{
    question: "Which Friends character decides to whiten his teeth before going out on a first date with a girl?",
    answerOption: ["Joey", "Ross", "Chandler", "Gunther"],
    answer: 1
}, {
    question: "Who was Ross's second wife?",
    answerOption: ["Emily", "Rachel", "Susan", "Carol"],
    answer: 0
}, {
    question: "Let's start off easy. Which borough of New York does the gang live in??",
    answerOption: ["Brooklyn", "Queens", "The Bronx", "Manhantten"],
    answer: 3
}, {
    question: "What was the name of the 'twin' Joey hired for an identical twin study?",
    answerOption: ["Tony", "Carl", "Andrew", "Daniel"],
    answer: 1

}, {
    question: "Who plays Chandler?",
    answerOption: ["Matt LeBlanc", "David Schwimmer", "Joshua Jackson", "Matthew Perry"],
    answer: 3

}, {
    question: "When Rachel, Chandler and Ross are trying to carry Ross's new lounge up a flight of stairs that change direction half way, what is the word that Ross keeps shouting out to the other two?",
    answerOption: ["Lean!", "Push!", "Pivot!", "Hurry!"],
    answer: 2

}, {
    question: "What was the name that Monica would pick for her son when she had one?",
    answerOption: ["Daniel", "Robert", "Clint", "Gandoff"],
    answer: 0

}, {
    question: "What is the name of Ross's son?",
    answerOption: ["Frank", "Johnny", "Charles", "Ben"],
    answer: 3

}, {
    question: "What is Joey's rule on eating with other people?",
    answerOption: ["Say a prayer before eating", "No sharing", "Wash your hands before eating", "No talking"],
    answer: 1

}, {
    question: "What did Monica make when she was trying to get over Richard?",
    answerOption: ["Sweaters", "Cake", "Jam", "Cocktails"],
    answer: 2

}];

//create var for correct answer, incorrect answer, unanswer, answered, time, seconds, and player select
var currentQuest = 0;
var correctAnswer = 0;
var incorrectAnswer = 0;
var unanswer = 0;
var answered;
var time;
var seconds;
var playerSelect;
var gifArray = ["question1", "question2", "qustion3", "question4", "question5", "question6", "question7", "question8", "question9", "question10"];
//create object for messages: "correct", "wrong","out of time!","Let's see how you did"
var messages = { correct: "CORRECT!", wrong: "WRONG!", timeOver: "OUT OF TIME!", finished: "Let's see how you did?!" };

//create onclick function for start game button to start game/timer and shows list of questions and multiple answers 
$("#startbtn").on("click", function () {
    $(this).hide();
    $(".question").text(newTrivia());
})

//create function for starting new game that will reset everything

function startNew() {
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswer = 0;
    currentQuest = 0;
    $("#endMessage").empty();
    $("#numCorrect").empty();
    $("#numWrong").empty();
    $("#unanswered").empty();
    newTrivia();
}


//create function that shows question page

function newTrivia() {
    answered = true;
    $(".question").empty();
    $(".answersList").empty();
    $("#correctAnswer").empty();
    $("#gameMessage").empty();
    $("#gif").empty();
    $("#curQuestion").text("Question # " + (currentQuest + 1) + " out of " + friendsQuestion.length);
    $(".question").append(friendsQuestion[currentQuest].question);
    for (var i = 0; i < friendsQuestion[currentQuest].answerOption.length; i++) {
        var answers = $("<div>");
        answers.text(friendsQuestion[currentQuest].answerOption[i]);
        answers.attr("data", i);
        answers.addClass("thisAnswer");
        $(".answersList").append(answers);
    }

    timer();

    $(".thisAnswer").on("click", function () {
        playerSelect = $(this).attr("data");
        console.log(playerSelect);
        clearInterval(time);
        answerScreen();
    });

}
//create function for timer
function timer() {
    seconds = 10;
    $("#timerLeft").html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;
    //timer countdwon
    time = setInterval(decrement, 1500);
}

function decrement() {
    seconds--;
    $("#timerLeft").html('<h3>Time Remaining: ' + seconds + '</h3>');
    if (seconds === 0) {
        clearInterval(time);
        answered = false;
        answerScreen();
    }
}
//create function to show answer page (either correctly or incorrectly)
function answerScreen() {
    $("#curQuestion").empty();
    $(".thisAnswer").empty();
    $("question").empty();
    var correctAnswerText = friendsQuestion[currentQuest].answerOption[friendsQuestion[currentQuest].answer];
    var correctAnswerIndex = friendsQuestion[currentQuest].answer;
    //console.log(correctAnswerText);
    //console.log(correctAnswerIndex);
    if ((playerSelect == correctAnswerIndex) && (answered == true)) {
        correctAnswer++;
        $("#gameMessage").text(messages.correct);
        //console.log(correctAnswer);
        //add correct friends gif using array of gif
        var img = $("<img>");
        img.attr("src","assets/images/"+gifArray[currentQuest]+".gif");
        $("#gif").append(img);

    } else if ((playerSelect != correctAnswerIndex) && (answered == true)) {
        incorrectAnswer++;
        $("#gameMessage").text(messages.wrong);
        $("#correctAnswer").text("The Correct Answer Is: " + correctAnswerText + "!");
    

    } else {
        unanswer++;
        //console.log(unanswer);
        $("#gameMessage").text(messages.timeOver);
        $("#correctAnswer").text("The Correct Answer Is: " + correctAnswerText + "!");
        answered = true;


    }
    if (currentQuest == (friendsQuestion.length - 1)) {
        setTimeout(scoreScreen, 5000)
    } else {
        currentQuest++;
        setTimeout(newTrivia, 5000);
    }
}




//create function to show scoreboard page

function scoreScreen() {
    $("#endMessage").html(messages.finished);
    $("#numCorrect").html("Correctly Answered: " + correctAnswer);
    $("#numWrong").html("Incorrectly Answered: " + incorrectAnswer);
    $("#unanswered").html("Unanswered: " + unanswer);
    var restart = $("<button>");
    $("#restartBtn").append(restart);
    restart.addClass("btn-primary btn-lg m-4");
    restart.text("Restart Game?");
    restartGame();
}

//create onclick function that restarts the game

function restartGame() {
    $("#restartBtn").on("click", function () {
        $(this).hide();
        startNew();
    })
}

//find and save 10 friends gifs and create array of friends gif