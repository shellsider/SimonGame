
var gamePattern = [];
var userClickedPattern = [];
var buttonColor = ["red", "blue", "green", "yellow"];
var flag = false;
var level = 0;

function playSoundAndFade(name)
{
    var tempAudio = new Audio("sounds/"+name+".mp3");
    tempAudio.play();
    $("#"+name).fadeOut(100).fadeIn(100);
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function nextSequence(){
    $("h1").text("Level "+(level+1));
    level++;
    var randomNumber = Math.floor((Math.random() * 4));
    console.log(randomNumber);
    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    playSoundAndFade(randomChosenColor); 
    animatePress(randomChosenColor);
}

function resetGame(){
    playSoundAndFade("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key or Start To Restart!");

    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    flag = false;
}

function checkAnswer(currentIndex){
    if(gamePattern[currentIndex] !== userClickedPattern[currentIndex]){
        if(flag === true){
            resetGame();
        }
    }

    if((currentIndex+1) === level){
        userClickedPattern = [];
        setTimeout(function(){
            nextSequence();
        }, 500);
    }
}


$(document).on("keydown", function(){
    if(flag === false){
        nextSequence();
        flag = true;
    }
})

$("#start-button").on("click", function(){
    if(flag === false){
        animatePress("start-button");
        setTimeout(function(){
            nextSequence();
            flag = true;
        }, 150)
    }
})

$(".play-button").on("click", function(){
    var userChosenColor = $(this).attr('id');
    playSoundAndFade(userChosenColor);
    animatePress(userChosenColor);
    if(flag === true){
        userClickedPattern.push(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    }
});