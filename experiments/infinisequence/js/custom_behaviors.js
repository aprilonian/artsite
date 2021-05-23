$(document).ready(function() {
	$('.intro_title_button').delay(300).fadeIn(950);
	// VARIABLES
	var toggle1, toggle2, toggle3 = false;
	var noteHold = false;
	var volumeHold = false;
	var sequencer = $('.sequencer');
	var tracks = $('.track');
	console.log(tracks);
	var notes = [];
	var newNotePitch = getCurrentPitchButton();

	// SOUND
	var minTemp = 20;
	var maxTempo = 225;
	var tempo = 145;
	var volume = 0;
	var tremolo = 2;
	var delay = 0.1;
	var bass = -60;
	// AUDIO COMPONENTS
	var synthGroup = [];
	var polysynth;
	var limiter;
	var masterLevel;

  limiter = new Tone.Limiter(-10);
  limiter.toMaster();

	var polysynth = new Tone.PolySynth(6, Tone.Synth).toMaster();
	polysynth.set({
		"oscillator" : {
			"type" : "sine",
			"modulationFrequency" : 1.0
		},
		"envelope" : {
			"attack" : 1.0,
			"decay" : 0,
			"sustain" : 0.05,
			"release" : 0.05,
		}
	});
	polysynth.volume.value = volume;
	// var chorus = new Tone.Chorus(1.0, 0.5, 3.0).toMaster(); // frequency, delay, depth
	// polysynth.connect(chorus);
	var freeverb = new Tone.Freeverb(0.9, 800).toMaster(); // roomSize, dampening
	freeverb.wet.value = 0.3;
	//routing synth through the reverb
	polysynth.connect(freeverb);
	// synthGroup.push(polysynth);

	var mouseClickX;
	var mouseClickY;

	// INITIALIZATION
	sequenceInit();
	setNoteEvents();
	setTrashcans();
	// $('.intro').hide();
	$('.intro_title_button').css("left", "calc(50% - " + $('.intro_title_button').width() / 2 + "px)");
	$('.intro_title_button').css("top", "calc(50% - " + $('.intro_title_button').height() / 2 + "px)");
	$('.main').css("top", "calc(50% - " + $('.main').height() / 2 + "px)");
	// $('.submenu_container').css("bottom", "calc(" + $('.submenu_pitch').height() / 2 + "px)");
	$('.submenu_pitch').scrollTop($('.submenu_pitch').offset());
	// $('.submenu_pitch').css("bottom", "calc(50% - " + $('.submenu_pitch').height() / 2 + "px)");
	resizeSquencer();

	// FUNCTIONS
// FUNCTION: LOOP Update
	function update() {
	  // Do whatever
	  requestAnimationFrame(update);
	}
	update();

	// Returns a Frequency based on an Integer
	function intToFreq(int) {
	    return  Math.pow(2,(int/12))*baseFreq;
	}

	// Refreshes the size of the sequencer
	function resizeSquencer() {
		if($('.sequencer').height() < $('.main').height()) {
			$('.sequencer').css("top", "calc(50% - " + $('.sequencer').height() / 2 + "px)");
		}
		if($('.sequencer').height() > $('.main').height()) {
			$('.sequencer').css("top", "0px)");
		}
		$('.sequencer').css("left", "calc(50% - " + $('.sequencer').width() / 2 + "px)");
		$('.note').css("width", $('.note').height() + "px");
		$('.note_indicator').css("width", $('.note').height() + "px");
		$('.trash_can').css("top", $('.note').height() /2 + "px");
		$('.trash_can').css("top", "calc(50% - " + $('.trash_can').height() / 2 + "px)");
		$('.trash_can').css("height", $('.note').height() /2 + "px");
		$('.trash_can').css("width", $('.note').height() /2 + "px");
	}

	function sequenceInit() {
		// of the existing tracks, give all the notes properties
		for(i=0; i < tracks.length; i++)
		{
			for(j=0; j < tracks[i].children.length; j++)
			{
				if(tracks[i].children[j].classList.contains('note'))
				{
						notes.push(newNoteInit(notes.length));
				}
			}
		}
		console.log(notes);
		for(var k = 0; k < notes.length; k++)
		{
			if(notes[k][1].classList.contains('activeNote'))
			{
				 notes[k][3] = true; //any activeNote starting notes are active
			}
		}
	}

	function newTrack()
	{
		// add a new track
		$(".sequencer").append("<div class='track_container'><div class='note_indicator button'><h1>"+ newNotePitch +"</h1></div><div class='track'></div><div class='trash_can button'></div></div>");
		// update tracks array
		tracks = $('.track');
		console.log(tracks);
		// populate the new track with 8 notes
		// give the 8 notes properties
		for(i=tracks.length-1; i < tracks.length; i++)
		{
			for(n=0; n < 8; n++)
			{
				$(tracks[i]).append('<div class=\'note button\'></div>');
			}
			for(j=0; j < tracks[i].children.length; j++)
			{
				if(tracks[i].children[j].classList.contains('note'))
				{
					notes.push(newNote(getCurrentPitchButton(), notes.length));
				}
			}
		}
		// console.log(notes);
		resizeSquencer();
		setNoteEvents();
		setTrashcans();
		$('.main').scrollTop($('.sequencer').height());
	}
	// returns a new note
	function newNoteInit(nIndex)
	{
		return note = [
			trackID = i,                     // index 0 - trackID
			noteDIV = tracks[i].children[j], // index 1 - note DIV
			playing = false,                 // index 2 - playing
			active = false,                  // index 3 - active
			pitch = "C5",                    // index 4 - pitch
			noteLength = "16n",              // index 5 - noteLength
			ndex = nIndex,									 // index 6 - note index
		];
	}
	function newNote(withPitch, nIndex)
	{
		return note = [
			trackID = i,                     // index 0 - trackID
			noteDIV = tracks[i].children[j], // index 1 - note DIV
			playing = false,                 // index 2 - playing
			active = false,                  // index 3 - active
			pitch = withPitch,                    // index 4 - pitch
			noteLength = "16n",              // index 5 - noteLength
			ndex = nIndex,									 // index 6 - note index
		];
	}
	function getCurrentPitchButton()
	{
		return $('.selectedPitch h1').text();
	}

	// Plays a sequence of notes in a track over time
	var sequencePos = 0;
	var last = 0; // timestamp of the last render() call
	function sequenceUpdate(now) {
	    // Update very 30s seconds over Tempo
			// 30,000ms indicates that these are eighth notes
	    if(!last || now - last >= 30000/tempo) {
	        last = now;
					if(tracks.length > 0) {
						var i = sequencePos;

						for(t=0; t < tracks.length; t++) // subtract one for note_indicator
						{
							var noteIndex = i + 8*t;
							$(notes[noteIndex][1]).append("<div class='currentSequenceNote'></div>");
							if(noteIndex == 0) {
								$(notes[notes.length-1][1]).children().fadeOut(250, function() {
										$(this).remove();
								});
							}
							else {
								$(notes[noteIndex-1][1]).children().fadeOut(250, function() {
										$(this).remove();
								});
							}
							if(notes[noteIndex][3]) {
								notes[noteIndex][2] = true;
								// synthGroup[t].triggerAttackRelease(notes[noteIndex][4], notes[noteIndex][5]);
								polysynth.triggerAttackRelease(notes[noteIndex][4], notes[noteIndex][5]);
							}
							else {
								notes[i].playing = false;
							}
						}

						sequencePos++;
						// Step to the next sequencePosition or reset if we are at the end
						if(sequencePos >= tracks[0].children.length){
							sequencePos = 0;
						}
					}
					// setTimeout(sequenceUpdate, 30000/tempo); // 30,000 notes are eighth notes
	    }
	    requestAnimationFrame(sequenceUpdate);
	}
	sequenceUpdate(0);


	// EVENT HANDLERS
// EVENT: When the window Resizes
	$( window ).resize(function() {
		$('.intro_title_button').css("left", "calc(50% - " + $('.intro_title_button').width() / 2 + "px)");
		$('.intro_title_button').css("top", "calc(50% - " + $('.intro_title_button').height() / 2 + "px)");
		// $('.submenu_container').css("bottom", "calc(" + $('.submenu_pitch').height() / 2 + "px)");
		// $('.submenu_pitch').css("bottom", "calc(50% - " + $('.submenu_pitch').height() / 2 + "px)");
		$('.main').css("top", "calc(50% - " + $('.main').height() / 2 + "px)");
		resizeSquencer();
	});

// EVENT: When .intro_title_button is clicked
// ------ Fade Out .intro .screen & Fade In .main .screen-------------
	$(".intro_title_button").on("mouseup", function(event) {
		event.preventDefault();
		$('.intro_title_button').fadeOut(800);
		$(".intro").delay(1000).velocity({
			marginTop: "100vh",
		},800, "easeInOutQuad");
		$('.title_button').delay(2000).fadeIn(3000);
		$('.twitter').delay(2000).fadeIn(3000);
	});
	$(".title_button").on("mouseup", function(event) {
		event.preventDefault();
		window.location = window.location;
	});
	$(".restart_button").on("mouseup", function(event) {
		event.preventDefault();
		
	});
	$(".more_button").on("mousedown", function(event) {
		event.preventDefault();
		// newTrack();
	});

	$(".pitch_button").on("mouseup", function(event) {
		event.preventDefault();
		$(".pitch_button").removeClass("selectedPitch");
		$(this).addClass("selectedPitch");
		newNotePitch = getCurrentPitchButton();
		newTrack();
	});

	// Sets up the Note indicator buttons
	function setTrashcans() {
		$(".trash_can").off("mousedown");

		// removes the parent track_container
		$(".trash_can").on("mouseup", function(event) {
			event.preventDefault();
			var allNotes = $('.note');
			var allTracks = $('.track');
			for(var k = 0; k < allTracks.length; k++)
			{
				// console.log(allTracks[k] === $(this).parent()[0].children[1]);
				if(allTracks[k] === $(this).parent()[0].children[1])
				{
					for(var i = 0; i < notes.length; i++)
					{
						if(k === notes[i][0])
						{
								for(var j = 0; j < allNotes.length; j++)
								{
										if(j === notes[i][6])
										{
											// console.log(j+" Goodbye " + notes[i]);
											if(notes[i][1].classList.contains('activeNote'))
											{
												 notes[i][3] = false; //any activeNote starting notes are active
											}
										}
								}
						}
					}
				}
			}

			$(this).parent().fadeOut(80, function() {
						resizeSquencer();
			});
		});
	}

// // ------ Sets note active or inactive -------------
	function setNoteEvents() {
		// reset all notes
		$(".note").off("mousedown mouseenter mouseleave mouseup");
		$(".note").on("mousedown", function(event) {
			event.preventDefault();
			noteHold = true;
			// look for note
			for(i = 0; i < notes.length; i++){
				// if its the correct note div
				if(this === notes[i][1]) {
					// if its not already active, active it, otherwise deactive it
					if(!notes[i][3]) {
						notes[i][3] = true;
						this.classList.add("activeNote");
					}
					else {
						notes[i][3] = false;
						this.classList.remove("activeNote");
					}
				}
			}
		});
		$(".note").on("mouseenter", function(event) {
			event.preventDefault();
			if(noteHold) {
				// look for note
				for(i = 0; i < notes.length; i++){
					// if its the correct note div
					if(this === notes[i][1]) {
						// if its not already active, active it, otherwise deactive it
						if(!notes[i][3]) {
							notes[i][3] = true;
							this.classList.add("activeNote");
						}
						else {
							notes[i][3] = false;
							this.classList.remove("activeNote");
						}
					}
				}
			}
		});
		$(".note").on("mouseup", function(event) {
			event.preventDefault();
			noteHold = false;
		});
	}


// ------------------ KNOB Rotation Conditions -----------------
	$('.volume').on('mousedown touchstart', function(e) {
		// are we holding the volume knob? Yes.
		volumeHold = true;

		// Used for an offset from the volume knob as well on mouse hold
		mouseClickX = e.pageX;
		mouseClickY = e.pageY;

		currentVolumeRot = $('.volume').rotationDegrees();
  });

// EVENT: On Mouse up and touch up or leave in .feature
	$('.feature').on('mouseup mouseleave touchend', function(e) {
			// No longer holding the mouse
			volumeHold = false;
			trackHold = false;
			noteHold = false;
	});
	function resetAudio() {
		audioElement.pause();
		audioElement.currentTime = 0;
			console.log("reset");
	}
	function changeChannelAudioQueue() {
		var playPromise = audioElement.play();

		// In browsers that don’t yet support this functionality,
		// playPromise won’t be defined.
		if (playPromise !== undefined) {
		  playPromise.then(function() {
				console.log("PLAY");
		    // Automatic playback started!
				setTimeout(resetAudio, 1000);
		  }).catch(function(error) {
		    // Automatic playback failed.
		    // Show a UI element to let the user manually start playback.
		  });
		}
	}
	// ----------- Mouse Position Tracking ------------
	// Based on the movementStrength of the mouse, we find the relative pos of the mouse
	var movementStrength = 20;
	var height = movementStrength / $(window).height();
	var width = movementStrength / $(window).width();

	// EVENT: When the mouse moves in the "#feature"
	$('.feature').mousemove(function(event) {

				// mouse position based on the offset from the center
				var mousePosX = event.pageX - $(window).width()/2;
				var mousePosY = event.pageY - $(window).height()/2;
				// $('.intro').css("transform", "translateX("+mousePosX/150+"px) translateY("+mousePosY/150+"px)");

				var posX;
				var posY;

				// If the VOLUME Knob is being held down
				if(volumeHold)
				{
					posX = event.pageX - (volumeKnobCenter.x);
					posY = event.pageY - (volumeKnobCenter.y);
					// console.log($('.volume').rotationDegrees());
					holdRot = $('.vol').rotationDegrees();
					// calculates an offset testing the current mouse posX against its offset mouseClickX
					var offsetX = posX - mouseClickX;

					$('.vol').css("transform", "rotateZ("+(offsetX + currentVolumeRot)+"deg)");

					if(holdRot < -130)
					{
							console.log("Vol 1");
							volumeMultiplier = 0;
					}
					else if(-130 <= holdRot && holdRot < -90)
					{
							console.log("Vol 2");
							volumeMultiplier = 2;
					}
					else if (-90 <= holdRot && holdRot < 0)
					{
							console.log("Vol 3");
							volumeMultiplier = 3;
					}
					else if (0 <= holdRot && holdRot < 90)
					{
							console.log("Vol 4");
							volumeMultiplier = 4;
					}
					else if (90 <= holdRot){
							console.log("Vol 5");
							volumeMultiplier = 6;
					}
					else {
							console.log("no volume");
							volumeMultiplier = 0;
					}
				}
	});
});

// Some rotation magic I found on StackOverflow. This should be built into JQuery. This function calls itself to initilize
(function ($) {
    $.fn.rotationDegrees = function () {
         var matrix = this.css("-webkit-transform") ||
    this.css("-moz-transform")    ||
    this.css("-ms-transform")     ||
    this.css("-o-transform")      ||
    this.css("transform");
    if(typeof matrix === 'string' && matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    return angle;
   };
}(jQuery));
