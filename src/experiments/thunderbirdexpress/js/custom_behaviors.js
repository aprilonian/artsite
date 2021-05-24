
var music = document.getElementById("terra");
music.volume = 0.09;
music.pause();
$('#btn-volume').hide();

$(document).ready(function() {
	$('.form_container').fadeIn(1000);
	$('.qSet1').fadeIn(2000);
	$('.qSet1').removeClass("slideRight");
	document.getElementById("submitButton").disabled = true;
	$('.congrats_container').hide();
	$('#nextButton').hide();
	$('#btn-volume').removeClass("volumeOn");
	$('#btn-volume').addClass("volumeMute");
	$('#btn-volume').fadeIn(2000);

	//DEBUGGING
	// introTransitionOut();
	// $('.intro').hide();

	// VARIABLES
	var mouseHold = false;
	var queryString = document.location.search;

	var worldPaused = false;
	var musicPaused = true;
	var world = document.querySelector('#target');
	var worldRotX = 0, worldRotY = 0, worldRotZ = 0;
	var planet = document.querySelector('#planet_model');
	var ocean = document.querySelector('#ocean');
	var oceanRotX = 0, oceanRotY = 0, oceanRotZ = 0;
	var oceanScale = 1.5;
	var oceanScaleSpeed = 20;
	var moon_pivot_01 = document.querySelector('#moon_parent_01');
	var moon_pivot_02 = document.querySelector('#moon_parent_02');
	var moon_pivot_03 = document.querySelector('#moon_parent_03');
	var moon_pivot_04 = document.querySelector('#moon_parent_04');
	var moon_pivot_05 = document.querySelector('#moon_parent_05');
	var cloud_01 = document.querySelector('#cloud_01');
	var cloud_02 = document.querySelector('#cloud_02');
	var cloud_03 = document.querySelector('#cloud_03');
	var flag_pivot = document.querySelector('#flag_parent');
	var f_blue = document.querySelector('#flag_blue');
	var f_red = document.querySelector('#flag_red');
	var f_orange = document.querySelector('#flag_orange');

	var userName;           // global user name value
	var userRocketName;     // glabal user ROCKET value
	var userColor;          // global user color value
	var colorText;          // global text value for user color
	var userOceanScale;     // global choice for ocean scale
	var userPlanetSize;     // global choice for planetsize
	var userMoons;          // global choice for how many moons
	var previousMoons;
	var userRings;          // global choice for how many rings
	var userClouds;         // global choice for the type of atmosphere
	var useruserCloudSize;
	var totalQuery = "";    // starting query information
	var currentQuestion = 1;
	var questions = $(".questionSet");
	var placeFlag;
	var flagCurPos = 0;
	var flagTargetPos = -1;
	var flagScale = 0;

	var titleTopPadding = 5; // used for 'qSet' and centering

	// INITIALIZATION
	resizeWindow();
	userRocketName = 'THUNDERBIRD';
	userPlanetSize = 1;
	userOceanScale = 1;
	placeFlag = false;
	flag_pivot.setAttribute('scale', { x: flagScale, y: flagScale, z: flagScale});


	// FUNCTIONS
	// FUNCTION: resizeWindow()
	function resizeWindow() {
		$('.scene_container').css("marginLeft", "-" + $('.grab-mask').width() / 2 + "px");
		$('.form_container').css("top", "calc(50% -	" + $('.form_container').height() / 2 + "px)");
		$('.form_buttons').css("left", "calc(50% -	" + $('#submitButton').width() / 2 + "px)");
		$('.questionSet').css("left", "calc(50% -	" + $('.questionSet').width() / 2 + "px)");
		for(var i=1; i < questions.length+1; i++) {
			// console.log("Test: " + i);
			$('.qSet'+i).css("top", "calc(50% - 	" + $('.qSet'+i).height() / 2 + "px + " + titleTopPadding +"px)");
		}
		$('#label_rocket').css("left", "calc(50% -	" + $('#label_rocket').width() / 2 + "px)");
		$('#label_name').css("left", "calc(50% -	" + $('#label_name').width() / 2 + "px)");
		$('.sliders_container').css("left", "calc(50% -	" + $('.sliders_container').width() / 2 + "px)");
		$('.congrats_container').css("left", "calc(50% -	" + $('.congrats_container').width() / 2 + "px)");
	}

	// FUNCTION: update()
	var last = 0; // timestamp of the last update() call
	var deltaTime = 0;
	function update(now) {
	    // Update very 1/10s seconds or 10ms
	    if(!last || now - last >= 10) {
	        last = now;
					if(!worldPaused)
					{
							// update user globals
							userOceanScale = $('#water_level').val() / 100;
							userPlanetSize = $('#planet_size').val() / 100;
							userMoons = $('#moon_count').val();
							userCloudSize = $('#planet_size').val() / 90;
							flagTargetPos = 1 / (-1 * userPlanetSize) * 2;
							// update world
							worldRotY += 0.1
							world.setAttribute('rotation', { x: 0, y: worldRotY, z: 0 });
							planet.setAttribute('scale', { x: userPlanetSize, y: userPlanetSize, z: userPlanetSize});
							// update clouds
							cloud_01.setAttribute('rotation', { x: 0, y: -worldRotY*0.5, z: 0});
							cloud_02.setAttribute('rotation', { x: 0, y: -worldRotY*0.7, z: 0});
							cloud_03.setAttribute('rotation', { x: 0, y: -worldRotY*0.60, z: 0});
							// upadte ocean
							oceanRotY = oceanRotY - 0.05;
							ocean.setAttribute('rotation', { x: oceanRotY, y: oceanRotY, z: oceanRotY});
							oceanScale = (Math.sin(deltaTime/oceanScaleSpeed)/100 + (1.5)) * userOceanScale;
							ocean.setAttribute('scale', { x: oceanScale, y: oceanScale, z: oceanScale});
							// update userMoons
							moon_pivot_01.setAttribute('rotation', { x: 0, y: worldRotY*6, z: 0});
							moon_pivot_02.setAttribute('rotation', { x: 0, y: worldRotY*3, z: 0});
							moon_pivot_03.setAttribute('rotation', { x: 0, y: worldRotY*4, z: 0});
							moon_pivot_04.setAttribute('rotation', { x: 0, y: worldRotY*1.5, z: 0});
							moon_pivot_05.setAttribute('rotation', { x: 0, y: worldRotY*2, z: 0});
							if(previousMoons != userMoons) {
									if(userMoons == 0) {
											oceanScaleSpeed = 25;
											moon_pivot_01.setAttribute('scale', { x: 0, y: 0, z: 0});
											moon_pivot_02.setAttribute('scale', { x: 0, y: 0, z: 0});
											moon_pivot_03.setAttribute('scale', { x: 0, y: 0, z: 0});
											moon_pivot_04.setAttribute('scale', { x: 0, y: 0, z: 0});
											moon_pivot_05.setAttribute('scale', { x: 0, y: 0, z: 0});
									}
									else if (userMoons == 1) {
											oceanScaleSpeed = 20;
											moon_pivot_01.setAttribute('scale', { x: 0, y: 0, z: 0});
											moon_pivot_02.setAttribute('scale', { x: 0, y: 0, z: 0});
											moon_pivot_03.setAttribute('scale', { x: 0, y: 0, z: 0});
											moon_pivot_04.setAttribute('scale', { x: 1, y: 1, z: 1});
											moon_pivot_05.setAttribute('scale', { x: 0, y: 0, z: 0});
									}
									else if (userMoons == 2) {
											oceanScaleSpeed = 13;
											moon_pivot_01.setAttribute('scale', { x: 0, y: 0, z: 0});
											moon_pivot_02.setAttribute('scale', { x: 1, y: 1, z: 1});
											moon_pivot_03.setAttribute('scale', { x: 0, y: 0, z: 0});
											moon_pivot_04.setAttribute('scale', { x: 1, y: 1, z: 1});
											moon_pivot_05.setAttribute('scale', { x: 0, y: 0, z: 0});
									}
									else if (userMoons == 3) {
											oceanScaleSpeed = 10;
											moon_pivot_01.setAttribute('scale', { x: 1, y: 1, z: 1});
											moon_pivot_02.setAttribute('scale', { x: 1, y: 1, z: 1});
											moon_pivot_03.setAttribute('scale', { x: 0, y: 0, z: 0});
											moon_pivot_04.setAttribute('scale', { x: 1, y: 1, z: 1});
											moon_pivot_05.setAttribute('scale', { x: 0, y: 0, z: 0});
									}
									else if (userMoons == 4) {
											oceanScaleSpeed = 8;
											moon_pivot_01.setAttribute('scale', { x: 1, y: 1, z: 1});
											moon_pivot_02.setAttribute('scale', { x: 1, y: 1, z: 1});
											moon_pivot_03.setAttribute('scale', { x: 0, y: 0, z: 0});
											moon_pivot_04.setAttribute('scale', { x: 1, y: 1, z: 1});
											moon_pivot_05.setAttribute('scale', { x: 1, y: 1, z: 1});
									}
									else if (userMoons == 5) {
											oceanScaleSpeed = 5;
											moon_pivot_01.setAttribute('scale', { x: 1, y: 1, z: 1});
											moon_pivot_02.setAttribute('scale', { x: 1, y: 1, z: 1});
											moon_pivot_03.setAttribute('scale', { x: 1, y: 1, z: 1});
											moon_pivot_04.setAttribute('scale', { x: 1, y: 1, z: 1});
											moon_pivot_05.setAttribute('scale', { x: 1, y: 1, z: 1});
									}
									else{}
									previousMoons = userMoons;
							}
							if($('#water_level').val() < 70) {
								cloud_01.setAttribute('scale', { x: 0, y: 0, z: 0});
								cloud_02.setAttribute('scale', { x: 0, y: 0, z: 0});
								cloud_03.setAttribute('scale', { x: 0, y: 0, z: 0});
							}
							else if($('#water_level').val() < 85) {
								cloud_01.setAttribute('scale', { x: userCloudSize, y: userCloudSize, z: userCloudSize});
								cloud_02.setAttribute('scale', { x: 0, y: 0, z: 0});
								cloud_03.setAttribute('scale', { x: 0, y: 0, z: 0});
							}
							else if(85 <= $('#water_level').val() &&  $('#water_level').val() < 100) {
								cloud_01.setAttribute('scale', { x: userCloudSize, y: userCloudSize, z: userCloudSize});
								cloud_02.setAttribute('scale', { x: userCloudSize, y: userCloudSize, z: userCloudSize});
								cloud_03.setAttribute('scale', { x: 0, y: 0, z: 0});
							}
							else if(100 <=  $('#water_level').val()) {
								cloud_01.setAttribute('scale', { x: userCloudSize, y: userCloudSize, z: userCloudSize});
								cloud_02.setAttribute('scale', { x: userCloudSize, y: userCloudSize, z: userCloudSize});
								cloud_03.setAttribute('scale', { x: userCloudSize, y: userCloudSize, z: userCloudSize});
							}
							// update flag placement
							if(placeFlag) {
								if(flagScale < 1.5) {
									if(flagScale < 1)
									{
										flag_pivot.setAttribute('scale', { x: flagScale, y: flagScale, z: flagScale});
									}
									flagScale = flagScale + 0.005
								}
								else if (flagCurPos > flagTargetPos){
									flag_pivot.setAttribute('position', { x: 0, y: flagCurPos, z: 0});
									flagCurPos = flagCurPos - 0.008;
								}
							}

							// update atmosphere pulsating
							//// change the height and width based on math sin
							$('.atmosphere').css("height", (Math.sin(deltaTime/30)/1.5 + (30+(userPlanetSize-0.8)*20)) + "%");
							$('.atmosphere').css("width", $('.atmosphere').height() + "px");
							//// Keep it Centered
							$('.atmosphere').css("top", "calc(50% - " + $('.atmosphere').height() / 2 + "px)");
							$('.atmosphere').css("left", "calc(50% - " + $('.atmosphere').height() / 2 + "px)");
							document.getElementById("label_moon").innerText = "MOONS:      " + userMoons;

							// step in deltaTime
							deltaTime++;
					}
	    }
	    requestAnimationFrame(update);
	}
	update(0);

	//FUNCTION: QUERYstuff
	function setPersonInfo() {
		var incomingName = getQueryParam('person_name',totalQuery);
		console.log(incomingName);
		var incomingColor = getQueryParam('fav_color',totalQuery);
		console.log(incomingColor);
		var incomingColorText = getQueryParam('color_text',totalQuery).toLowerCase();
		console.log(incomingColorText);
		var incomingRocketName = getQueryParam('rocket_name',totalQuery).toLowerCase();
		console.log(incomingRocketName);
		document.getElementById('label_name').innerHTML = incomingColorText.toUpperCase() + " LEADER PLANET " + incomingName.toUpperCase();
		document.getElementById('label_rocket').innerHTML = "Aboard the " +incomingRocketName.toUpperCase() + " EXPRESS";
		document.getElementById('goodbye').innerHTML = "Excellent job "+ incomingName +" on terraforming YOUR planet! The "+ incomingColorText.toUpperCase() +" flag will forever signify your footprint. Now that's over, it's time for everyone aboard "+ incomingRocketName.toUpperCase() +" to crawl back into bed. There are more planets to fill with colonialism!";
		if(incomingColorText === "blue") {
			f_red.setAttribute('scale', { x: 0, y: 0, z: 0});
			f_orange.setAttribute('scale', { x: 0, y: 0, z: 0});
		}
		else if(incomingColorText === "orange") {
			f_red.setAttribute('scale', { x: 0, y: 0, z: 0});
			f_blue.setAttribute('scale', { x: 0, y: 0, z: 0});
		}
		else {
			f_blue.setAttribute('scale', { x: 0, y: 0, z: 0});
			f_orange.setAttribute('scale', { x: 0, y: 0, z: 0});
		}
	}
	function getQueryParam(parameter, querystring) {
		querystring = "&" + querystring.replace(/%20/gi, ' ' );
		var p = escape(unescape(parameter));
		var regex = new RegExp("[?&]" + p + "=(?:([^&]*))?", "i");
		var match = regex.exec(querystring);
		var value = "";
		if(match != null) {
			value = match[1];
		}
		return value;
	}
	// UPDATE questions
	function updateQuestions(currentQ) {
		console.log("Updated to question: " + currentQ);
		if(currentQ < questions.length) { // if we haven't reached the end
			$('.qSet'+currentQ).addClass("slideLeft");
			setTimeout(function() {
				$('.qSet'+currentQ).fadeOut(500);
			}, 0);
			setTimeout(function() {
				$('.qSet'+(currentQ+1)).fadeIn(2000);
				$('.qSet'+(currentQ+1)).removeClass("slideRight");
			}, 500);

			currentQuestion++;
			if(currentQuestion == questions.length) {
				$("#nextButton").fadeOut(1000, function() {
					$("#submitButton").fadeIn(2000);
					document.getElementById("submitButton").disabled = false;
				});
			}
		}
	}
	// once the submit button has been pressed, transition intro out
	function introTransitionOut() {
		// Fade Form
		$('.form_container').fadeOut(1000);
		// Translate IntroScreen
		$(".intro").delay(1000).velocity({
			marginLeft: "-100vw",
		},800, "easeInOutQuad", function() {
			// Then slide/fade in UI elements
			$('#label_name').addClass('label_transition');
			setTimeout(function() {
					$('#label_rocket').addClass('label_transition');
					setTimeout(function() {
						$('#label_handy').addClass('label_transition_bottom');
						setTimeout(function() {
							$('#finishTerraformButton').removeClass('hide');
							$('.slider_con').removeClass('hide');
							resizeWindow();
						}, 500);
						resizeWindow();
					}, 500);
					resizeWindow();
			}, 500);
			resizeWindow();
		});
	}

//// EVENT HANDLERS //////////////////
	// EVENT: When the window Resizes
	$( window ).resize(function() {
		resizeWindow();
	});

	// EVENT: mousedown
	$(".scene_container").on("mousedown touchstart", function(event) {
		event.preventDefault();
		//	worldPaused = true;
	});
	// EVENT: mousedown for radioStyle
	$(".radioStyle").on("mouseup touch", function(event) {
		event.preventDefault();
		setTimeout(function() {
			$("input[name='fav_color']:checked").each(function() {
				var idVal = $(this).attr("id");
				colorText = $("label[for='"+idVal+"']").text();
			});
			console.log(colorText);
	    $("#nextButton").click();
		},200);
	});
	// EVENT: mouseup
	$(".pause").on("mouseup touchend", function(event) {
		event.preventDefault();
		worldPaused = !worldPaused;
	});
	// EVENT: .feature released
	$('.window').on('mouseup mouseleave touchend', function(e) {
			// No longer holding the mouse
			mouseHold = false;
			//worldPaused = false;
	});
	// EVENT: #myForm when the submit button is clicked
	$("#myForm").on("submit", function(event) {
			event.preventDefault();
			clearQuery();

		 	userName = $('#person_name').val();
			userColor = $("input[name='fav_color']:checked").val();
			userRocketName = $('#input_rocketName').val() === "" ? "THUNDERBIRD" : $('#input_rocketName').val();

			addToQuery("person_name", userName);
			addToQuery("fav_color", userColor);
			addToQuery("color_text", colorText);
			addToQuery("rocket_name", userRocketName);

			setPersonInfo();
			// Intro transition out
			introTransitionOut();
			//window.location = "page2.html?first_name=" + firstNameValue+ "&last_name=" + lastNameValue;
	});
	$("body").keyup(function(event) {
    if (event.keyCode == 13) {
			console.log("Working");
			if(currentQuestion == 1) {
	      $("#nextButton").click();
			}
			else if(currentQuestion == 2)
			{
				if(colorText != null)
				{
		      $("#nextButton").click();
				}
			}
    }
	});
	$("#nextButton").click(function() {

	  // alert("Button code executed.");
		// QUESTIOn 1
		checkTextField(document.getElementById("person_name"));
		if(hasTextValue && currentQuestion == 1){
			updateQuestions(currentQuestion);
			$("#nextButton").fadeOut(1000);
		}
		// QUESTIOn 2
		else if(currentQuestion == 2)
		{
			if(colorText != null)
			{
				document.getElementById('color_choice').innerHTML = colorText.toUpperCase() + " it is!";
				setTimeout(function() {
					updateQuestions(currentQuestion);
					document.getElementById('teamcolor').innerHTML = "You will lead the " + colorText.toUpperCase() + " squad.";
				}, 500);
			}
			else {
				document.getElementById('color_choice').innerHTML = "RED it is!";
				setTimeout(function() {
					updateQuestions(currentQuestion);
					document.getElementById('teamcolor').innerHTML = "You will lead the RED squad.";
				}, 500);
			}
		}
	});
	// EVENT: when "Im done" button is clicked
	$("#finishTerraformButton").click(function() {
		$('.sliders_container').fadeOut(1500);
		placeFlag = true;
		setTimeout(function() {
			$('.congrats_container').removeClass("hide");
			$('.congrats_container').fadeIn();
		}, 3000);
	});
	// EVENT: when "Enter Cryostasis" button is clicked
	$("#enterCryostasis").click(function() {
		$(".intro").delay(1000).velocity({
			marginLeft: "0px",
		},800, "easeInOutQuad", function() {
			location.reload();
		});
	});

	// EVENT: when "Audio Mute" button is clicked
	$("#btn-volume").click(function() {
		if(!musicPaused){
			music.pause();
			$('#btn-volume').removeClass("volumeOn");
			$('#btn-volume').addClass("volumeMute");
		}
		else {			
			music.play();
			$('#btn-volume').addClass("volumeOn");
			$('#btn-volume').removeClass("volumeMute");
		}
		musicPaused = !musicPaused;
	});

	// EVENT: when #person_name is being typed into, update the name in the next question
	var textFieldUpdate = document.getElementById('person_name');
	textFieldUpdate.onkeyup = function() {
			$('#nextButton').fadeIn(1000);
	    document.getElementById('color_question').innerHTML = "Now that's out of the way, " + textFieldUpdate.value + ", pick a favorite color.";
			document.getElementById('contrats').innerHTML = "Congratulations " + textFieldUpdate.value + ", you've been accepted to help terraform and colonize a new planet! In part because the Earth has been gone for a millenia now, and you've been in cryostasis. We hope that these introductions have put you at ease.";
			resizeWindow(); // update any sizes that have changed
	}

		function addToQuery(id, inputstring) {
			totalQuery += "&" + id + "=" + inputstring;
		}
		function clearQuery() {
			totalQuery = "";
		}

});

var hasTextValue = false;
// Must be called outside of the document ready since it is called after html is written
function checkTextField(field) {
	if(field.value === "") {
		document.getElementById("error").innerText = "Literally anything will do. :)"
		hasTextValue = false;
	} else {
		document.getElementById("error").innerText = "Excellent!";
		hasTextValue = true;
	}
	$('#error').fadeIn(300);
}
function clearError() {
	$('#error').fadeOut(300, function (){
		document.getElementById("error").innerText = "";
	});
}
