let btnColor=["red","blue","green","yellow"]
let gamePattern=[];
const userGamePattern=[];
var randNo;
var choosenColor;
var level=0;
var started=false;
$(document).keydown(function(){
	if(!started){
		nextSequence();
		started=true;
	}
});

function nextSequence(){
	userGamePattern.length=0;
	randNo=Math.floor(Math.random()*4);

	choosenColor=btnColor[randNo];
	gamePattern.push(choosenColor);
	$("#"+choosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
	playSound(choosenColor);
	level++;
	$("h1").text("level "+level);

};	



$(".btn").click(function (evt){
	var userChoosenColor=evt.currentTarget.id;
	userGamePattern.push(userChoosenColor);
	
	playSound(userChoosenColor);
	animatePress(userChoosenColor);
	chechAns(userGamePattern.length-1);
	
});

function playSound(ch){
	var audio=new Audio("sounds/"+ch+".mp3");
	audio.play();
} 

function animatePress(name){
	$("."+name).addClass("pressed");
	setTimeout(function() {
		$("."+name).removeClass("pressed");
	}, 100);
}

function chechAns(lvl){
	if(gamePattern[lvl]===userGamePattern[lvl]){
		if(gamePattern.length===userGamePattern.length){
			setTimeout(function(){
				nextSequence();
			},1000);
		}
	}
	else{
		playSound("wrong");
		$("body").addClass("game-over");
		setTimeout(function(){
			$("body").removeClass("game-over");
		},200);

		$("#level-title").text("Game Over,Press Any Key to Start");
		gamePattern.length=0;
		started=false;
		level=0;
	}
}