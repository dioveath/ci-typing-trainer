$(()=> {

    $('#complete').hide();
    $('#testAgain').hide();
    $('#textArea').prop("disabled", true);
    $('#textArea').attr('contenteditable', "false");


    var tests = [
	
	"A paragraph is a series of related sentences developing a central idea, called the topic. Try to think about paragraphs in terms of thematic unity: a paragraph is a sentence or a group of sentences that supports one central, unified idea. Paragraphs add one idea at a time to your broader argument.",


	"I gained a lot of skills! These skills include more computer skills which I did not have before, along with a different outlook on life. I began to see all of the opportunities in everyday life for different games and ideas. I gained a new perspective on an old picture.",

	"Creating something out of nothing. It's the closest thing to magic I can think of.",

	"Art and creative expression have an interesting way of weaving in and out of classrooms, offering students the opportunity to explore their own ideas and minds. Video games are no different, and while most of the discussion about their use in classrooms centers on play, we at foundry10 wanted to examine the value of making games. Through easily accessible programs such as Scratch and Gamemaker, students from early elementary up through college are creating games and learning while doing it.",

	"Game creation is an art of understanding and bending perception of a user... Even if it is ultimately used outside the scope of game creation.",

	"You need to be creative, open minded to anything that comes at you. You need to think outside of reality. You also need to be determined and focused.",

	"Game design is a large field, drawing from the fields of computer science/programming, creative writing, and graphic design. Game designers take the creative lead in imagining and bringing to life video game worlds. ... However, not everyone who enjoys playing video games will enjoy creating them.",

	"Game design is the art of applying design and aesthetics to create a game for entertainment or for educational, exercise, or experimental purposes. Increasingly, elements and principles of game design are also applied to other interactions, in the form of gamification."


    ];




    var par = $('#paragraph').text();
    var currentPointerIndex = 0;

    var userText = "";
    var errorText = "";

    var startTime = Date.now();
    var endTime;

    var countDown;
    var countDownNumber;

    initTest();

    function initTest(){

	var testIndex = Math.floor(Math.random() * tests.length);
	par = tests[testIndex];

	$('#paragraph').text(par);

	currentPointerIndex = 0;
	userText = "";
	errorText = ""
	countDownNumber = 3;

	updateUI();

	countDown = setInterval(() => {
	    countDownNumber--;
	    $('#countDown').text(countDownNumber);

	    if(countDownNumber == 0){
		startTest();
	    }

	}, 1000);
	
    }

    function startTest(){
	clearInterval(countDown);
	// $('#textArea').prop("disabled", false).focus();
	$('#textArea').attr('contenteditable', "true").focus();
	
	startTime = Date.now();
    }

    $('#textArea').keydown((e)=> {
	e.preventDefault();

	if(e.key == "Backspace") {
	    if(errorText.length > 0)
		errorText = errorText.split("").slice(0, errorText.length - 1).join("");
	    console.log(errorText);
	    updateUI();
	    return;
	}


	console.log(e.key);

	$('#textArea').val("");
	var c =  par[currentPointerIndex];
	console.log(c);
	if(e.key == c && errorText.length == 0) {
	    userText += c;
	    $('#userText').text(userText);
	    currentPointerIndex++;
	    if(currentPointerIndex == par.length){
		completeTest();
	    }

	} else {
	    if((e.keyCode >= 65 && e.keyCode <= 90) ||
	       (e.keyCode >= 97 && e.keyCode <= 122)) {
		errorText += e.key;
		$('#errorText').text(errorText);
	    } else {
		console.log("key: " + e.key + " keyCode: " + e.keyCode);
	    }
	}
	$('#textArea').text(userText).append($('<span>').text(errorText).addClass("error-text"));
	console.log(userText);
    });

    function updateUI(){
	console.log("updateing UI");
	$('#errorText').text(errorText);
	$('#userText').text(userText);
	$('#textArea').text(userText).append($('<span>').text(errorText).addClass("error-text"));	
    }

    function completeTest(){

	console.log("completing test");

	endTime = Date.now();

	var intervalSec = (endTime - startTime)/1000;
	console.log(intervalSec);
	console.log(intervalSec/60);

	var wpm = Math.round((par.length/5) / (intervalSec/60));

	document.activeElement.blur();
	$('#textArea').attr('contenteditable', "false");
	// $('#textArea').prop("disabled", true);
	$('#complete').text(`You have completed the test! Your WPM is ${wpm} WPM.`).show();
	$('#testAgain').show();
    }


    $('#testAgain').click((e) => {
	initTest();
    });

    
});
