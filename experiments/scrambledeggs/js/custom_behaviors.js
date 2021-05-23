$(document).ready(function() {
	//DEBUGGING
	// $('.window').hide();
	// introTransitionOut();
	// $('.one').hide();
	// $('.intro').hide();
	// $(".two").velocity(
	// {
	// 	marginTop: "0vh",
	// },100, "easeInOutQuad");

	// VARIABLES
	var mobile;
	var worldPaused = false;
	var mouseHold = false;
	var eggFollow = false;
	var eggTimer;
	var eggCount = 0;
	var eggIDCount = 0;
	var introTransition = false;
	var egg_ending = false;
	var arrowDownVisible = false;
	var mySVG = $('.svg_arrowdown').drawsvg({
      duration: 500,
      easing: 'linear'
  });

	// Egg word SVG 01
	var eggWord_01 = $('#svg_egg_05').drawsvg({
      duration: 700,
      easing: 'easeOutExpo'
  });

	// Egg word SVG 02
	var eggWord_02 = $('#svg_egg_06').drawsvg({
      duration: 700,
      easing: 'easeOutExpo'
  });

	// Egg word SVG 03
	var eggWord_03 = $('#svg_egg_07').drawsvg({
      duration: 700,
      easing: 'easeOutExpo'
  });

	// Egg word SVG 04
	var eggWord_04 = $('#svg_eggolution').drawsvg({
      duration: 700,
      easing: 'easeOutExpo'
  });
	// Title letter array
	var titleLetters = $('#title_letters p');
	var startOver_text = "Hatch Again"
	document.getElementById('restart').innerHTML = createElementsFromString(startOver_text);
	var endingLetters = $('#restart p');
	fadeElements(endingLetters,0,1,0.4);

// STORY TEXT /////////////////////////////////////////////////////////////////
	var storyP01_text = "There once was a falling egg."
	document.getElementById('story_p_01').innerHTML = createElementsFromString(storyP01_text);
	var storyP01 = $('#story_p_01 p');
	fadeElements(storyP01,0,1,0.4);

	var storyP02_text = "But where is the egg falling you might ask?"
	document.getElementById('story_p_02').innerHTML = createElementsFromString(storyP02_text);
	var storyP02 = $('#story_p_02 p');
	fadeElements(storyP02,0,1,0.4);

	var storyP03_text = "Well, at the moment, into an endless abyss. Nobody knows how deep it goes..."
	document.getElementById('story_p_03').innerHTML = createElementsFromString(storyP03_text);
	var storyP03 = $('#story_p_03 p');
	fadeElements(storyP03,0,1,0.4);

	var storyP04_text = "There is however no need to worry about the unknown, or this potentially smashed egg."
	document.getElementById('story_p_04').innerHTML = createElementsFromString(storyP04_text);
	var storyP04 = $('#story_p_04 p');
	fadeElements(storyP04,0,1,0.4);

	var storyP05_text = "Because this egg has friends."
	document.getElementById('story_p_05').innerHTML = createElementsFromString(storyP05_text);
	var storyP05 = $('#story_p_05 p');
	fadeElements(storyP05,0,1,0.4);

// Egg friend story responses
	var storyP06_text = "EGGISTENCIAL! Fight the fear of the unknown and ambiguous."
	document.getElementById('story_p_06').innerHTML = createElementsFromString(storyP06_text);
	var storyP06 = $('#story_p_06 p');
	fadeElements(storyP06,0,1,0.4);

	var storyP07_text = "EGGXIOUSNESS! Overcome the exhausting thought spirals."
	document.getElementById('story_p_07').innerHTML = createElementsFromString(storyP07_text);
	var storyP07 = $('#story_p_07 p');
	fadeElements(storyP07,0,1,0.4);

	var storyP08_text = "EGGTASTROPHIC! Take small and careful steps towards the impact."
	document.getElementById('story_p_08').innerHTML = createElementsFromString(storyP08_text);
	var storyP08 = $('#story_p_08 p');
	fadeElements(storyP08,0,1,0.4);

	var storyP09_text = "Given time, even scrambled eggs can become something new..."
	document.getElementById('story_p_09').innerHTML = createElementsFromString(storyP09_text);
	var storyP09 = $('#story_p_09 p');
	fadeElements(storyP09,0,1,0.4);

	var storyElements = [storyP01, storyP02, storyP03, storyP04, storyP05];
	var currentStoryElement = 0;
	var allowTransition = false;
	var friend_trigger_01 = false;
	var friend_trigger_02 = false;
	var friend_trigger_03 = false;
///////////////////////////////////////////////////////////

//// Matter Js Variables ////////////////////////////////
		var world = $('#world');
		var worldCanvas = document.getElementById('worldCanvas');
		// var worldWidth = world.width();
		// var worldHeight = world.height();
		var worldWidth = window.innerWidth;
		var worldHeight = window.innerHeight;

		// module aliases
		var Engine = Matter.Engine,
				Render = Matter.Render,
				World = Matter.World,
				Bodies = Matter.Bodies,
		    Common = Matter.Common,
		    Constraint = Matter.Constraint,
		    Composites = Matter.Composites,
		    MouseConstraint = Matter.MouseConstraint;

		// create an engine
		var engine = Engine.create();

		// create a renderer
		var render = Render.create({
				canvas: worldCanvas,
				engine: engine,
				options: {
					width:  worldWidth,
					height: worldHeight,
					hasBounds: true,
					pixelRatio: 'auto',
			    // background: 'transparent',
			    // wireframes: false,
			    // showAngleIndicator: false
			  }
		});

		// rigid bodies
		var egg1 = Bodies.circle(500, 500, 50);
		var ground = Bodies.rectangle(400, 10, 810, 60, { isStatic: true });

		//add a mouse-controlled constraint
		var mouseConstraint = MouseConstraint.create(engine);
		mouseConstraint.pixelRatio = 2;

		// options
		engine.world.gravity.y = -1;

		// add all of the bodies to the world
		World.add(engine.world, mouseConstraint);
		World.add(engine.world, [egg1, ground]);

		// run the engine
		Engine.run(engine);

		// run the renderer
		Render.run(render);
//////////////////////////////////////////////////////////


	// INITIALIZATION
	resizeWindow();

	$('.arrow_down_container').hide();
	$('.nextLineIndicator').fadeOut();

	$('#object_egg').css("top", "calc(50% -	" + $('#object_egg').height() / 2 + "px)");
	$('#object_egg').css("left", "calc(50% -	" + $('#object_egg').width() / 2 + "px)");
	$('#object_egg').css("height", $('#object_egg').width() + "px");

	$('.object_falling_egg').css("top", $('#object_egg').offset().top + "px");
	$('.object_falling_egg').css("left", $('#object_egg').offset().left + "px");
	$('#object_falling_egg').css("height", $('#object_falling_egg').width() + "px");

	$('.fallen_egg').css("height", $('.fallen_egg').width() + "px");
	$('.fallen_egg').css("top",  "calc(50% -	" + $('.fallen_egg').height() / 2 + "px)");
	$('.fallen_egg').css("left", "calc(50% -	" + $('.fallen_egg').width()  / 2 + "px)");

	// FUNCTIONS
	// FUNCTION: resizeWindow()
	function resizeWindow() {
		if(window.innerWidth <= 767) {
			mobile = true;
			tablet = false;
		}
		else if(768 < window.innerWidth && window.innerWidth <= 1023) {
			mobile = false;
			tablet = true;
		}
		else {
			mobile = false;
			tablet = false;
		}
		// $('#worldCanvas').css("width", $('#world').width() + "px");
		worldWidth = window.innerWidth;
		render.canvas.width = worldWidth;
		// render.canvas.height = worldHeight;
		render.options.width = worldWidth;
		// render.options.height = worldHeight;
		// render.options.pixelRatio = worldWidth/worldHeight;
		// console.log(render.width, $('#world').width());

		$('.scene_container').css("marginLeft", "-" + $('.grab-mask').width() / 2 + "px");

		$('#object_egg').css("top",  "calc(50% -	" + $('#object_egg').height() / 2 + "px)");
		$('#object_egg').css("left", "calc(50% -	" + $('#object_egg').width()  / 2 + "px)");
		$('#object_egg').css("height", $('#object_egg').width() + "px");

		$('.fallen_egg').css("height", $('#object_egg_container').width() + "px");
		$('.fallen_egg').css("top",  "calc(50% -	" + $('.fallen_egg').height() / 2 + "px) !important");
		$('.fallen_egg').css("left", "calc(50% -	" + $('.fallen_egg').width()  / 2 + "px) !important");

		$('.object_falling_egg').css("top",  $('#object_egg').offset().top  + "px");
		$('.object_falling_egg').css("left", $('#object_egg').offset().left + "px");

		$('.arrow_down_container').css('left', 'calc(50% - '+ $('.arrow_down_container').width()/2 +'px)');

		$('#friend_egg_01').css("height", $('#friend_egg_01').width() + "px");
		$('#friend_egg_01').css("top",  "calc(22% -	" + $('#friend_egg_01').height() / 2 + "px)");
		$('#friend_egg_01').css("left", "calc(20% -	" + $('#friend_egg_01').width()  / 2 + "px)");

		$('#friend_egg_02').css("height", $('#friend_egg_02').width() + "px");
		$('#friend_egg_02').css("top",  "calc(20% -	" + $('#friend_egg_02').height() / 2 + "px)");
		$('#friend_egg_02').css("left", "calc(50% -	" + $('#friend_egg_02').width()  / 2 + "px)");

		$('#friend_egg_03').css("height", $('#friend_egg_03').width() + "px");
		$('#friend_egg_03').css("top",  "calc(25% -	" + $('#friend_egg_03').height() / 2 + "px)");
		$('#friend_egg_03').css("left", "calc(80% -	" + $('#friend_egg_03').width()  / 2 + "px)");

		// $('.object_bird_container').css("top",  "calc(50% -	" + $('.object_bird_container').height() / 2 + "px)");
		// $('.object_bird_container').css("left", "calc(50% -	" + $('.object_bird_container').width()  / 2 + "px)");
		$('.object_bird_container').css("height", $('.object_bird_container').width() + "px");
	}

	// FUNCTION: update()
	var fallenEggRotation = 0;
	var fallenEggAmp = 20;

	var last = 0; // timestamp of the last update() call
	var deltaTime = 0;
	function update(now) {
	    // Update every 1/10s seconds or 10ms
	    if(!last || now - last >= 10) {
	        last = now;
					if(!worldPaused)
					{
						// Code Below
							// Wavy Elements update
							if(!introTransition){
								wavyElements(titleLetters, 5, 20);
							}
							else {
								wavyElements(storyP01, 3, 20);
								wavyElements(storyP02, 3, 20);
								wavyElements(storyP03, 3, 20);
								wavyElements(storyP04, 3, 20);
								wavyElements(storyP05, 3, 20);
								if(!($('#story_p_06').hasClass('hidden'))) {
									wavyElements(storyP06, 3, 20);
								}
								if(!($('#story_p_07').hasClass('hidden'))) {
									wavyElements(storyP07, 3, 20);
								}
								if(!($('#story_p_08').hasClass('hidden'))) {
									wavyElements(storyP08, 3, 20);
								}
								if(!($('#story_p_09').hasClass('hidden'))) {
									wavyElements(storyP09, 3, 20);
								}
							}
							if(egg_ending) {
								wavyElements(endingLetters, 5, 20);
							}

							// Updating .fallen_egg css transforms
							if(!friend_trigger_02){
								fallenEggRotation += 4;
								if(fallenEggRotation >= 360) {
									fallenEggRotation = fallenEggRotation - 360; // keeps rotation 0 to 360
								}
							}
							else {
								fallenEggRotation = Math.sin(deltaTime/30 + 150)*8;
							}
							if(!friend_trigger_03){
								fallenEggAmp = 20;
							}
							else {
								fallenEggAmp = 15;
							}
							$(".fallen_egg").css("transform","rotateZ(" + fallenEggRotation + "deg) translateY(" + Math.sin(deltaTime/30 + 5)*fallenEggAmp + "px)");

							// Egg friends rotation and translate updates
							$("#friend_egg_01").css("transform","rotateZ(" + Math.sin(deltaTime/18 + 5)*10 + "deg) translateY(" + Math.sin(deltaTime/60 + 5)*30 + "px)");
							$("#friend_egg_02").css("transform","rotateZ(" + Math.sin(deltaTime/30 + 150)*8 + "deg) translateY(" + Math.sin(deltaTime/30 + 80)*10 + "px)");
							$("#friend_egg_03").css("transform","rotateZ(" + Math.sin(deltaTime/15 + 150)*13 + "deg) translateY(" + Math.sin(deltaTime/30 + 15)*20 + "px)");

							// $(".object_bird_container").css("transform","rotateZ(" + Math.sin(deltaTime/15 + 150)*13 + "deg)");

						// End Code
							// step in deltaTime
							deltaTime++;
					}
	    }
	    requestAnimationFrame(update);
	}
	update(0);

	// Creates a <p> tag around every letter in a string and returns the html string
	// Additionally, <div> tags separate words to make sure flex works
	function createElementsFromString(stringP) {
		var sPArray = stringP.split("");
		var returnString = "<div>";
		for(var i = 0; i < sPArray.length; i++) {
			if(sPArray[i] == " ")
			{
				returnString += "</div><p class='invisible'>_</p><div>";
			}
			else {
				returnString += "<p>" + sPArray[i] + "</p>";
			}
		}
		returnString += "</div>";
		return returnString
	}
	// wavyElements utilizes elements in an array to transform them in a sine wave
	function wavyElements(jqueryElementArray = [], amplitude = 5, dampening = 30) {
		for(var i = 0; i < jqueryElementArray.length; i++){
			$(jqueryElementArray[i]).css("transform","translateY(" + Math.sin(deltaTime/dampening + i*5)*amplitude + "px)");
		}
	}

	function fadeElements(jqueryElementArray = [], toOpacity = 1, fadeTime = 40, individualTimeStep = 0.4, usePauseTime = true, onCompleteFunction = function(e){}) {
		var letterFadeTime = fadeTime / jqueryElementArray.length;
		var pauseTime = 0;
		var index = 0;
		for(var i = 0; i < jqueryElementArray.length; i++){
			if(i==0) {index = 0;   }
			else     {index = i-1; }
			if(jqueryElementArray[index].innerHTML === ',' && usePauseTime) {
				pauseTime += 500;
			}
			if(jqueryElementArray[index].innerHTML === '.' && usePauseTime) {
				pauseTime += 300;
			}
			if(i === jqueryElementArray.length-1)
			{
				$(jqueryElementArray[i]).delay(fadeTime * i + pauseTime).velocity(
				{
					opacity: toOpacity,
				},letterFadeTime * 1000 * individualTimeStep, "easeInOutQuad", function()
				{
					resizeWindow();
					onCompleteFunction();
				});
			}
			else {
				$(jqueryElementArray[i]).delay(fadeTime * i + pauseTime).velocity(
				{
					opacity: toOpacity,
				},letterFadeTime * 1000 * individualTimeStep, "easeInOutQuad", function()
				{
					resizeWindow();
				});
			}
		}
	}

	function translateElements(jqueryElementArray = [], x=0, y=0, translateTime = 40, individualTimeStep = 0.4, usePauseTime = true, onCompleteFunction = function(e){}) {
		var letterTime = translateTime / jqueryElementArray.length;
		var pauseTime = 0;
		var index = 0;
		for(var i = 0; i < jqueryElementArray.length; i++){
			if(i==0) {index = 0;   }
			else     {index = i-1; }
			if(jqueryElementArray[index].innerHTML === ',' && usePauseTime) {
				pauseTime += 500;
			}
			if(jqueryElementArray[index].innerHTML === '.' && usePauseTime) {
				pauseTime += 300;
			}
			if(i === jqueryElementArray.length-1)
			{
				$(jqueryElementArray[i]).delay(translateTime * i + pauseTime).velocity(
				{
					top: y+'px',
					left: x+'px',
				},letterTime * 1000 * individualTimeStep, "easeInOutQuad", function()
				{
					resizeWindow();
					onCompleteFunction();
				});
			}
			else {
				$(jqueryElementArray[i]).delay(translateTime * i + pauseTime).velocity(
				{
					top: y+'px',
					left: x+'px',
				},letterTime * 1000 * individualTimeStep, "easeInOutQuad", function()
				{
					resizeWindow();
				});
			}
		}
	}

	function crossFadeElements(jqueryElementArrayOut = [], jqueryElementArrayIn = [], gapTime = 1000, onCompleteFunction = function(e){}) {
		if(gapTime <= 0)
		{
			gapTime = 1;
		}
		$(jqueryElementArrayIn[0]).show();
		fadeElements(jqueryElementArrayOut,0, 20, 0.4, false, function() {
			for(var i = 0; i < jqueryElementArrayOut.length; i++){
				$(jqueryElementArrayOut[i]).hide();
			}
			$(jqueryElementArrayIn[0]).parent().parent().removeClass("hidden");
			console.log($(jqueryElementArrayIn[0]).parent().parent());
			setTimeout(function() {
				fadeElements(jqueryElementArrayIn,1, 40, 0.4, true, function() {
					onCompleteFunction();
				});
			}, gapTime);
		});
	}

	// FUNCTION: Transition '.intro' out
	function introTransitionOut() {
		// Translate IntroScreen
		$(".intro").delay(500).velocity({
			marginTop: "5vh",
		},800, "easeInOutQuad", function()
		{
				$(".intro").velocity(
				{
					marginTop: "-100vh",
				},800, "easeInOutQuad", function()
				{
						$(".fallen_egg").velocity(
						{
							marginTop: "20vh",
						},1800, "easeInOutQuad", function()
						{
							$(".fallen_egg").velocity(
							{
								marginTop: "-10vh",
							},1000, "easeInOutQuad", function()
							{
									$(".fallen_egg").velocity(
									{
										marginTop: "0vh",
									},1000, "easeInOutQuad", function()
									{
										introTransition = true;
										// fade story paragraph 01
										fadeElements(storyP01,1, 40, 0.4, true, function() {
											allowTransition = true;
											$('.nextLineIndicator').fadeIn();
										});
										// fadeElements(storyP01,1,40,0.4, true, function() {
										// 	setTimeout(function(){
										// 		fadeElements(storyP01,0,40,0.4, false, function() {
										// 			$('#story_p_01').hide();
										// 			// fade story paragraph 02
										// 			fadeElements(storyP02,1,40,0.4, true, function() {
										// 				setTimeout(function(){
										// 					fadeElements(storyP02,0,40,0.4, false, function() {
										// 						$('#story_p_02').hide();
										// 						// fade story paragraph 03
										// 						fadeElements(storyP03,1, 60, 0.4, true, function() {
										// 							setTimeout(function(){
										// 								fadeElements(storyP03,0,40,0.4, false, function() {
										// 									$('#story_p_03').hide();
										// 									// fade story paragraph 04
										// 									fadeElements(storyP04,1, 60, 0.4, true, function() {
										// 										setTimeout(function(){
										// 											fadeElements(storyP04,0,40,0.4, false, function() {
										// 												$('#story_p_04').hide();
										// 												// fade story paragraph 05
										// 												fadeElements(storyP05,1, 60, 0.4, true, function() {
										// 													setTimeout(function() {
										// 														translateElements(storyP05,0,-800, 80, 0.4, false);
										// 														fadeElements(storyP05,0, 30, 0.4, false);
										// 													},1300);
										// 												});
										// 											});
										// 										}, 1000);
										// 									});
										// 								});
										// 							}, 1000);
										// 						});
										// 					});
										// 				}, 1000);
										// 			});
										// 		});
										// 	}, 1000);
										// });
										resizeWindow();
									});
							});
						});
				});
		});
	}

// EGG MINIGAME ////////////////////////////////////////
	function setEggTimer() {
		console.log("Timer Start");
		var egg_seconds_left = 0.5;
		eggTimer = setInterval(function() {
				// console.log("Time: "+ egg_seconds_left);
		    if (egg_seconds_left <= 0)
		    {
		        clearInterval(eggTimer);
						spawnEgg();
						egg_seconds_left = 1;
		    }
		    egg_seconds_left -= 0.5;
		}, 500);
	}
	function clearEggTimer() {
		clearInterval(eggTimer);
	}
	function spawnEgg() {
		$(".intro").append("<div class='object_falling_egg egg_"+ eggIDCount + "'><svg class='svg_egg button svg_egg_03' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 1200'><path class='path_egg' d='M1036.59,747.56c0,241.12-195.47,436.59-436.59,436.59S163.41,988.68,163.41,747.56,358.88,15.86,600,15.86,1036.59,506.44,1036.59,747.56Z'/></svg></div>");
		$(".egg_"+ eggIDCount).css("top", $('#object_egg').offset().top + "px");
		$(".egg_"+ eggIDCount).css("left", $('#object_egg').offset().left + "px");
		$('#svg_egg_02').addClass('eggComplete');
		initFallingEggs();
		eggCount++;
		eggIDCount++;

		if(eggCount >= 3) {
			$('#eggCounter').fadeIn(500);
			document.getElementById('eggCounter').innerHTML = eggCount;
		}

		// Arrow down appears
		if(!arrowDownVisible)
		{
			$('.arrow_down_container').delay(500).fadeIn(300, function(e) {
				mySVG.drawsvg('animate');
			});
			arrowDownVisible = true;
		}
	}
	function initFallingEggs() {
			// reset all notes
			$(".object_falling_egg").off("mousemove mousedown mouseenter mouseleave mouseup touchmove touchstart touch touchend");
			// EVENT: mosuedown '.object_falling_egg'
			$(".object_falling_egg").on("mousedown", function(event) {
				event.preventDefault();
				eggFollow = true;
				if(!($(this).hasClass("preventFalling"))){
					$(this).addClass("preventFalling");
			    $(this).attr('id', 'egg_falling' + '_' + eggCount);
					// MOUUUUSE
					$("#egg_falling_"+eggCount).css("top", event.clientY-$("#egg_falling_"+eggCount).width()/2 + "px");
					$("#egg_falling_"+eggCount).css("left", event.clientX-$("#egg_falling_"+eggCount).width()/2 + "px");
				}
				if(!($(this).hasClass("eggFollowingCursor"))){
					$(this).addClass("eggFollowingCursor");
				}
			});
			$(".object_falling_egg").on("touchstart", function(event) {
				event.preventDefault();
				eggFollow = true;
				if(!($(this).hasClass("preventFalling"))){
					$(this).addClass("preventFalling");
			    $(this).attr('id', 'egg_falling' + '_' + eggCount);
					// TOUCH SCREEN
					$("#egg_falling_"+eggCount).css("top", event.touches[0].clientY-$("#egg_falling_"+eggCount).width()/2 + "px");
					$("#egg_falling_"+eggCount).css("left", event.touches[0].clientX-$("#egg_falling_"+eggCount).width()/2 + "px");
				}
				if(!($(this).hasClass("eggFollowingCursor"))){
					$(this).addClass("eggFollowingCursor");
				}
			});
			$(".object_falling_egg").on("mouseup mouseleave touchend", function(event) {
				event.preventDefault();
				if(eggFollow) {
					eggFollow = false;
				}
				if(($(this).hasClass("preventFalling"))){
					$(this).removeClass("preventFalling");
				}
			});
			$(".object_falling_egg").on('mousemove', function(event){

				var mouseX = event.clientX;
				var mouseY = event.clientY;

				 if(eggFollow){
					 $(this).css("top",  mouseY -$(this).width()/2 + "px");
					 $(this).css("left", mouseX -$(this).width()/2 + "px");
				 }
			});
			$(".object_falling_egg").on('touchmove', function(event){

				var touchX = event.touches[0].clientX;
				var touchY = event.touches[0].clientY;

				 if(eggFollow){
					 $(this).css("top",  touchY -$(this).width()/2 + "px");
					 $(this).css("left", touchX -$(this).width()/2 + "px");
				 }
			});
	}
// END OF EGG MINIGAME FUNCTIONS ///////////////////////

//// EVENT HANDLERS //////////////////
	// EVENT: When the window Resizes
	$( window ).resize(function() {
		resizeWindow();
	});
	$(".restart_container").on("mouseup touchend", function(event) {
		event.preventDefault();
		location.reload();
	});
	// EVENT: mouseenter '#object_egg'
	$("#object_egg").on("mouseenter", function(event) {
		event.preventDefault();
		// setEggTimer();
	});
	// EVENT: mosuedown '#object_egg'
	$("#object_egg").on("mousedown touchstart", function(event) {
		event.preventDefault();
		setEggTimer();
		$("#object_egg").addClass('playBubbleAnimation');
		$("#svg_egg_02 .path_egg").addClass('playEggFillAnimation');
	});
	// EVENT: mouseleave '#object_egg'
	$("#object_egg").on("mouseup mouseleave touchend", function(event) {
		event.preventDefault();
		// Timer reset
		clearEggTimer();
		$("#object_egg").removeClass('playBubbleAnimation');
		$("#svg_egg_02 .path_egg").removeClass('playEggFillAnimation');
		$('#svg_egg_02').removeClass('eggComplete');
	});

	$(".fallen_egg").on("mousedown", function(event) {
		event.preventDefault();
		if(egg_ending){

		}
		else {
			eggFollow = true;
			if(!($(this).hasClass("preventFalling"))){
				$(this).addClass("preventFalling");
				// MOUUUUSE
				$(".fallen_egg").css("top", event.clientY-$(".fallen_egg").width()/2 + "px");
				$(".fallen_egg").css("left", event.clientX-$(".fallen_egg").width()/2 + "px");
			}
		}
	});
	$(".fallen_egg").on("touchstart", function(event) {
		event.preventDefault();
		if(egg_ending){

		}
		else {
			eggFollow = true;
			if(!($(this).hasClass("preventFalling"))){
				$(this).addClass("preventFalling");
				// TOUCH SCREEN
				$(".fallen_egg").css("top", event.touches[0].clientY-$(".fallen_egg").width()/2 + "px");
				$(".fallen_egg").css("left", event.touches[0].clientX-$(".fallen_egg").width()/2 + "px");
			}
		}
	});
	$(".fallen_egg").on("mouseup touchend", function(event) {
		event.preventDefault();
		if(egg_ending){

		 	 if(!($('#story_p_06').hasClass('hidden')) && allowTransition) {
		 		 $('.nextLineIndicator').fadeOut();
		 		 fadeElements(storyP06,0, 1, 0.4, false, function() {
		 			 $('#story_p_06').addClass('hidden');
		 			 allowTransition = true;
		 		 });
		 	 }
		 	 if(!($('#story_p_07').hasClass('hidden')) && allowTransition) {
		 		 $('.nextLineIndicator').fadeOut();
		 		 fadeElements(storyP07,0, 1, 0.4, false, function() {
		 			 $('#story_p_07').addClass('hidden');
		 			 allowTransition = true;
		 		 });
		 	 }
		 	 if(!($('#story_p_08').hasClass('hidden')) && allowTransition) {
		 		 $('.nextLineIndicator').fadeOut();
		 		 fadeElements(storyP08,0, 1, 0.4, false, function() {
		 			 $('#story_p_08').addClass('hidden');
		 			 allowTransition = true;
		 		 });
		 	 }
			// last story element
			$('#story_p_09').removeClass('hidden');
			$('.nextLineIndicator').fadeOut();
			allowTransition = false;
			fadeElements(storyP09,1,40,0.4,true,function() {
				allowTransition=true;
				$('.nextLineIndicator').fadeIn();
			});
		}
		else {
			if(eggFollow) {
				eggFollow = false;
				var topString = window.innerHeight /2 - $(".fallen_egg").height()/2 + "px)";
				var leftString = window.innerWidth /2 - $(".fallen_egg").width()/2  + "px)";
				$(".fallen_egg").velocity(
				{
					top: topString,
					left: leftString,
				},500, "easeInOutQuad");
			}
			if(($(this).hasClass("preventFalling"))){
				$(this).removeClass("preventFalling");

			}
		}
	});
	$(".one").on('mousemove', function(event){

		var mouseX = event.clientX;
		var mouseY = event.clientY;

		 if(eggFollow){
			 $(".fallen_egg").css("top",  mouseY -$(".fallen_egg").width()/2 + "px");
			 $(".fallen_egg").css("left", mouseX -$(".fallen_egg").width()/2 + "px");
		 }
	});
	$(".fallen_egg").on('touchmove', function(event){

		var touchX = event.touches[0].clientX;
		var touchY = event.touches[0].clientY;

		 if(eggFollow){
			 $(this).css("top",  touchY -$(this).width()/2 + "px");
			 $(this).css("left", touchX -$(this).width()/2 + "px");
		 }
	});

	// EVENT: mosuedown '#object_egg'
	$(".storyElementParagraph_container").on("mousedown touchstart", function(event) {
		event.preventDefault();

	});
	// EVENT: mouseleave '#object_egg'
	$(".storyElementParagraph_container").on("mouseup touchend", function(event) {
		event.preventDefault();
		if(currentStoryElement < storyElements.length && allowTransition)
		{
			$('.nextLineIndicator').fadeOut();
			allowTransition = false;
			if(currentStoryElement == 4) {
				console.log("translating element " + currentStoryElement);
				// Translate the final story element letters, then show the friend eggs
				translateElements(storyElements[currentStoryElement],0,-800,80,0.4,false, function() {
					// New Friends
					$("#friend_egg_01").delay(100).velocity({
						marginTop: "5vh",
					},700, "easeInOutQuad", function() {
						$("#friend_egg_01").velocity({
							marginTop: "0vh",
						},700, "easeInOutQuad", function() {
							eggWord_01.drawsvg('animate');
						});
					});
					$("#friend_egg_02").delay(500).velocity({
						marginTop: "5vh",
					},625, "easeInOutQuad", function() {
						$("#friend_egg_02").velocity({
							marginTop: "0vh",
						},625, "easeInOutQuad", function() {
							eggWord_02.drawsvg('animate');
						});
					});
					$("#friend_egg_03").delay(1000).velocity({
						marginTop: "5vh",
					},700, "easeInOutQuad", function() {
						$("#friend_egg_03").velocity({
							marginTop: "0vh",
						},500, "easeInOutQuad", function() {
							eggWord_03.drawsvg('animate');
						});
					});
				});
			}
			crossFadeElements(storyElements[currentStoryElement],storyElements[currentStoryElement+1], 200, function() {
				$('.nextLineIndicator').fadeIn();
				allowTransition=true;
			});
			currentStoryElement++;
		}
		if(!($('#story_p_06').hasClass('hidden')) && allowTransition) {
			$('.nextLineIndicator').fadeOut();
			fadeElements(storyP06,0, 20, 0.4, false, function() {
				$('#story_p_06').addClass('hidden');
				allowTransition = true;
			});
		}
		if(!($('#story_p_07').hasClass('hidden')) && allowTransition) {
			$('.nextLineIndicator').fadeOut();
			fadeElements(storyP07,0, 20, 0.4, false, function() {
				$('#story_p_07').addClass('hidden');
				allowTransition = true;
			});
		}
		if(!($('#story_p_08').hasClass('hidden')) && allowTransition) {
			$('.nextLineIndicator').fadeOut();
			fadeElements(storyP08,0, 20, 0.4, false, function() {
				$('#story_p_08').addClass('hidden');
				allowTransition = true;
			});
		}
 	 if(!($('#story_p_09').hasClass('hidden')) && allowTransition) {
 		 $('.nextLineIndicator').fadeOut();
 		 fadeElements(storyP09,0, 20, 0.4, false, function() {
 			 $('#story_p_09').addClass('hidden');
 			 allowTransition = false;
			 startEnding();
 		 });
 	 }
	});

 function checkEndTriggers() {
	 if(friend_trigger_01 && friend_trigger_02 && friend_trigger_03){
		 // play SVG animation on falling egg
		 if(!egg_ending)
		 {
			 egg_ending = true;
			 eggWord_04.drawsvg('animate');
		 }
	 }
 }

 function startEnding() {
	 // start dropping
	 $(".friend_egg").delay(1000).velocity({
		 marginTop: "-100vh",
	 },4000, "easeInOutQuad", function() {

	 });
	 $(".fallen_egg").delay(3000).velocity({
		 marginTop: "100vh",
	 },4000, "easeInOutQuad", function() {
		 $('.one').hide();
	 	$(".two").delay(500).velocity(
	 	{
	 		marginTop: "0vh",
	 	},3000, "easeInOutQuad", function() {
			fadeElements(endingLetters,1,40,0.4,true);
		});
	 });
 }

	// EVENT: mouseup touchend '#friend_egg_01'
	$("#friend_egg_01").on("mouseup touchend", function(event) {
		event.preventDefault();

		if(!($('#story_p_07').hasClass('hidden'))) {
			$('.nextLineIndicator').fadeOut();
			fadeElements(storyP07,0, 1, 0.4, false);
			$('#story_p_07').addClass('hidden');
		}
		if(!($('#story_p_08').hasClass('hidden'))) {
			$('.nextLineIndicator').fadeOut();
			fadeElements(storyP08,0, 1, 0.4, false);
			$('#story_p_08').addClass('hidden');
		}

		$('#story_p_06').removeClass('hidden');
		$('.nextLineIndicator').fadeOut();
		allowTransition = false;
		fadeElements(storyP06,1,40,0.4,true,function() {
			$('.nextLineIndicator').fadeIn();
			allowTransition=true;
		});

		$(this).velocity({
			opacity:"0.5",
		},1000, "easeInOutQuad");

		friend_trigger_01 = true;
		checkEndTriggers();
	});

		// EVENT: mouseup touchend '#friend_egg_02'
	$("#friend_egg_02").on("mouseup touchend", function(event) {
		event.preventDefault();

		if(!($('#story_p_06').hasClass('hidden'))) {
			$('.nextLineIndicator').fadeOut();
			fadeElements(storyP06,0, 1, 0.4, false);
			$('#story_p_06').addClass('hidden');
		}
		if(!($('#story_p_08').hasClass('hidden'))) {
			$('.nextLineIndicator').fadeOut();
			fadeElements(storyP08,0, 1, 0.4, false);
			$('#story_p_08').addClass('hidden');
		}

		$('#story_p_07').removeClass('hidden');
		$('.nextLineIndicator').fadeOut();
		allowTransition = false;
		fadeElements(storyP07,1,40,0.4,true,function() {
			$('.nextLineIndicator').fadeIn();
			allowTransition=true;
		});

		$(this).velocity({
			opacity:"0.5",
		},1000, "easeInOutQuad");

		friend_trigger_02 = true;
		checkEndTriggers();
	});
	// EVENT: mouseup touchend '#friend_egg_02'
	$("#friend_egg_03").on("mouseup touchend", function(event) {
		event.preventDefault();

		if(!($('#story_p_06').hasClass('hidden'))) {
			$('.nextLineIndicator').fadeOut();
			fadeElements(storyP06,0, 1, 0.4, false);
			$('#story_p_06').addClass('hidden');
		}
		if(!($('#story_p_07').hasClass('hidden'))) {
			$('.nextLineIndicator').fadeOut();
			fadeElements(storyP07,0, 1, 0.4, false);
			$('#story_p_07').addClass('hidden');
		}

		$('#story_p_08').removeClass('hidden');
		$('.nextLineIndicator').fadeOut();
		allowTransition = false;
		fadeElements(storyP08,1,40,0.4,true,function() {
			$('.nextLineIndicator').fadeIn();
			allowTransition=true;
		});

		$(this).velocity({
			opacity:"0.5",
		},1000, "easeInOutQuad");

		friend_trigger_03 = true;
		checkEndTriggers();
	});

	// EVENT: mouseup for '.arrow_down_container'
	$(".arrow_down_container").on("mouseup touchend", function(event) {
		event.preventDefault();
		introTransitionOut();
		$(".arrow_down_container").fadeOut(500);
		$(".object_falling_egg").fadeOut(200);
	});
	// EVENT: mouseup for '.pause'
	$(".pause").on("mouseup touchend", function(event) {
		event.preventDefault();
		worldPaused = !worldPaused;
	});
	$('.window').on('mousedown touchstart', function(e) {
			// holding the mouse
			mouseHold = true;
	});
	// EVENT: .feature released
	$('.window').on('mouseup mouseleave touchend', function(e) {
			// No longer holding the mouse
			mouseHold = false;
	});
	$(".window").on('mousemove', function(event){
		if(!mobile) {
			var mouseX = event.clientX;
			var mouseY = event.clientY;
			var windowCenterX = window.innerWidth/2;
			var windowCenterY = window.innerHeight/2;
			var smoothing = 20;
			$('.arrow_down_container').css('left', (mouseX/smoothing + windowCenterX - $('.arrow_down_container').width()+17) +'px');
		}
	});
	$(".window").on('touchmove', function(event){
		if(!mobile) {
			var touchX = event.touches[0].clientX;
			var touchY = event.touches[0].clientY;
			var windowCenterX = window.innerWidth/2;
			var windowCenterY = window.innerHeight/2;
			var smoothing = 20;
			$('.arrow_down_container').css('left', (touchX/smoothing + windowCenterX - $('.arrow_down_container').width()) +'px');
		}
	});
	// EVENT: When the keyboard is pressed
	$(".hello").keyup(function(event) {
    if (event.keyCode == 13) { // enter
			console.log("Working");
    }
	});
});

function getTranformY(jqObjName) {
	var obj;
	if($(jqObjName).length) {
		var obj = $(jqObjName);
		var transformMatrix = obj.css("-webkit-transform") ||
		 obj.css("-moz-transform")    ||
		 obj.css("-ms-transform")     ||
		 obj.css("-o-transform")      ||
		 obj.css("transform");
		var matrix = transformMatrix.replace(/[^0-9\-.,]/g, '').split(',');
		var x = matrix[12] || matrix[4];//translate x
		var y = matrix[13] || matrix[5];//translate y
		return y;
	}
	else {
		return 0;
	}
}
function getTranformX(jqObjName) {
	var obj;
	if($(jqObjName).length) {
		var obj = $(jqObjName);
		var transformMatrix = obj.css("-webkit-transform") ||
		 obj.css("-moz-transform")    ||
		 obj.css("-ms-transform")     ||
		 obj.css("-o-transform")      ||
		 obj.css("transform");
		var matrix = transformMatrix.replace(/[^0-9\-.,]/g, '').split(',');
		var x = matrix[12] || matrix[4];//translate x
		var y = matrix[13] || matrix[5];//translate y
		return x;
	}
	else {
		return 0;
	}
}



///////////////////// JUNK
// var fallingEggs = $('.object_falling_egg');
// var eggPosY = parseInt($('.object_falling_egg').css('top'));
// console.log(eggPosY);
// var windowHeight = $(window).height();
// if(eggPosY >= windowHeight) {
// 	$('.object_falling_egg').remove();
// 	console.log('Delete');
// 	for(var i = 0; i < fallingEggs.length; i++) {
// 		// var currentFallingEggY = parseInt($('.egg_'+i).css('transform').split(',')[5]);
// 		// var currentFallingEggY = getTranformY('.egg_'+i) + 1;
//
// 		// var currentFallingEggY = parseInt($('.egg_'+i).css('top'));
// 		// currentFallingEggY += 1;
// 		// console.log('.egg_'+i + ": " +currentFallingEggY);
// 		// if(!$('.egg_'+i).hasClass("eggFollowingCursor")) {
// 		// 	$('.egg_'+i).css("transform", "translateY(" + currentFallingEggY + "px)");
// 		// }
// 	}
// }


// Draggable.create("#egg_falling_"+eggCount, {
// 	type:"x,y",
// 	edgeResistance:0.5,
// 	throwProps:true,
// 	bounds: window,
// 	onDragEnd:function() {
// 	}
// });
// $(".object_falling_egg").off("mousemove");
