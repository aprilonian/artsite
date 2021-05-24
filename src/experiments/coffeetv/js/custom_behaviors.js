$(document).ready(function() {

	// VARIABLES
	var toggle1, toggle2, toggle3 = false;
	var channelHold, volumeHold = false;
	var currentChannelRot = -100;
	var currentVolumeRot = 30;
	var volumeMultiplier = 4;
	var mouseClickX;
	var mouseClickY;
	var startChannel = 1;
	var previousChannel = startChannel;
	var audioElement = document.createElement('audio');
	var a_ch1 = document.createElement('audio');
	var a_ch2 = document.createElement('audio');
	var a_ch3 = document.createElement('audio');
	var a_ch4 = document.createElement('audio');
	var a_ch5 = document.createElement('audio');
	audioElement.setAttribute('src', 'sounds/static.mp3');
	audioElement.volume = audioElement.volume / 10;
	a_ch1.setAttribute('src', 'sounds/wow.mp3');
	a_ch2.setAttribute('src', 'sounds/ocean.mp3');
	a_ch3.setAttribute('src', 'sounds/airplane.mp3');
	a_ch4.setAttribute('src', 'sounds/dog.mp3');
	a_ch5.setAttribute('src', 'sounds/moustache.mp3');
	var ch1Vol = a_ch1.volume / 10;
	var ch2Vol = a_ch1.volume / 10;
	var ch3Vol = a_ch1.volume / 8 ;
	var ch4Vol = a_ch1.volume / 10;
	var ch5Vol = a_ch1.volume / 10;
	a_ch1.volume = ch1Vol * volumeMultiplier;
	a_ch2.volume = ch2Vol * volumeMultiplier;
	a_ch3.volume = ch3Vol * volumeMultiplier;
	a_ch4.volume = ch4Vol * volumeMultiplier;
	a_ch5.volume = ch5Vol * volumeMultiplier;
	a_ch1.addEventListener('ended', function() {
			this.currentTime = 0;
			this.play();
	}, false);
	a_ch2.addEventListener('ended', function() {
			this.currentTime = 0;
			this.play();
	}, false);
	a_ch3.addEventListener('ended', function() {
			this.currentTime = 0;
			this.play();
	}, false);
	a_ch4.addEventListener('ended', function() {
			this.currentTime = 0;
			this.play();
	}, false);

////////////////////// Facial Recognition //////////////////////////
	var video = document.getElementById('video');
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var tracker = new tracking.ObjectTracker("face");
	tracker.setInitialScale(4);
	tracker.setStepSize(2);
	tracker.setEdgesDensity(0.1);
	var trackTask = tracking.track('#video', tracker, { camera: true });
	tracker.on('track', function(event)
	{
		event.data.forEach(function(rect) {
			// Plots the detected targets here.
			console.log("detected!" + "X: " + rect.x + " Y: " + rect.y);
			$('.facebox').css('top',rect.y + 'px');
			$('.facebox').css('left',rect.x + 'px');
			$('.facebox').css('height',rect.height + 'px');
			$('.facebox').css('width',rect.width + 'px');
			// $('.facebox').css({height: rect.height + "px", width: rect.width +"px"});
		});
	});

	trackTask.stop(); /// Intial state
////////////////////////////////////////////////////////////////////////

	// center of knobs
			var channelKnobCenter = {
				x: $(".channel").offset().left + ($(".channel").width()/2),
				y: $(".channel").offset().top + ($(".channel").height()/2)
			}
			var volumeKnobCenter = {
				x: $(".volume").offset().left + ($(".volume").width()/2),
				y: $(".volume").offset().top + ($(".volume").height()/2)
			}

	// INITIALIZATION
	$('.intro_title_bg').css("left", "calc(50% - " + $('.intro_title_bg').width() / 2 + "px)");
	$('.tv_img_container').css("top", "calc(50% - " + $('.tv_img_container').height() / 2 + "px)");
	$('.tv_img_container').css("left", "calc(50% - " + $('.tv_img_container').width() / 2 + "px)");
	$('.tv_screen').css("top", "calc(50% - " + $('.tv_screen').height() / 2 + "px)");
	$('.nowPlaying').css("left", "calc(50% - " + $('.nowPlaying').width() / 2 + "px)");
	// $('.intro').fadeOut();
	// $('.one').removeClass('blur');
	$('.facebox').hide();
	$('.chnl').css("transform", "rotateZ("+(currentChannelRot)+"deg)");
	$('.vol').css("transform", "rotateZ("+(currentVolumeRot)+"deg)");
	$('.light').css("height", $('.light').width()+"px");
	$('.nowPlaying').hide();

	updateChannel(startChannel);


	// FUNCTIONS
// FUNCTION: LOOP Update
	var update = function() {

		// console.log($('#colorpicker').farbtastic().color);

	};
	setInterval(update, 700); // 1000 milliseconds = 1 sec

	// EVENT HANDLERS
// EVENT: When  is clicked
// ------ makes small square cells small or medium size -------------
	$(".start_button").on("mouseup", function(event) {
		event.preventDefault();
		$('.intro').fadeOut(2000);
		$(".one").delay(1000).velocity({
			blur: "0.5px",
		},2000, "easeInQuad");
		
		// Audio Start
		playChannelAudio(1);
		updateChannel(3);
		updateChannel(1);
	});

// EVENT: When the window Resizes
	$( window ).resize(function() {
		$('.intro_title_bg').css("left", "calc(50% - " + $('.intro_title_bg').width() / 2 + "px)");
		$('.tv_img_container').css("top", "calc(50% - " + $('.tv_img_container').height() / 2 + "px)");
		$('.tv_img_container').css("left", "calc(50% - " + $('.tv_img_container').width() / 2 + "px)");
		$('.tv_screen').css("top", "calc(50% - " + $('.tv_screen').height() / 2 + "px)");
		$('.light').css("height", $('.light').width()+"px");
		$('.nowPlaying').css("left", "calc(50% - " + $('.nowPlaying').width() / 2 + "px)");

	});

// ------------------ KNOB Rotation Conditions -----------------
// EVENT: On mouse down and touch down on .channel
  $('.channel').on('mousedown touchstart', function(e)
	{
		// are we holding the channel knob? Yes.
		channelHold = true;

		// Used for an offset from the knob on mouse hold
		mouseClickX = e.pageX; // the current location X that we clicked
		mouseClickY = e.pageY; // location Y

		currentChannelRot = $('.chnl').rotationDegrees();
  });

	$('.channel').on('click', function(e)
	{
		if(channelHold == false)
		{
			currentChannelRot += 72;
			$('.chnl').css("transform", "rotateZ("+(currentChannelRot)+"deg)");
			checkChannel(currentChannelRot);
		}
  });

	$('.volume').on('mousedown touchstart', function(e)
	{
		// are we holding the volume knob? Yes.
		volumeHold = true;

		// Used for an offset from the volume knob as well on mouse hold
		mouseClickX = e.pageX;
		mouseClickY = e.pageY;

		currentVolumeRot = $('.volume').rotationDegrees();
  });

// EVENT: On Mouse up and touch up or leave in .feature
	$('.feature').on('mouseup mouseleave touchend', function(e)
	{
		// No longer holding the mouse
		channelHold = false;
		volumeHold = false;
	});

	// ----------- Mouse Position Tracking ------------
	// Based on the movementStrength of the mouse, we find the relative pos of the mouse
	var movementStrength = 20;
	var height = movementStrength / $(window).height();
	var width = movementStrength / $(window).width();

	// EVENT: When the mouse moves in the "#feature"
	$('.feature').mousemove(function(event){

				// mouse position based on the offset from the center
				var mousePosX = event.pageX - $(window).width()/2;
				var mousePosY = event.pageY - $(window).height()/2;
				$('.tv_img_container').css("transform", "translateX("+mousePosX/50+"px) translateY("+mousePosY/50+"px)");
				$('.intro').css("transform", "translateX("+mousePosX/150+"px) translateY("+mousePosY/150+"px)");

				var posX;
				var posY;

// If the CHANNEL knob is being held down
				if(channelHold)
				{
					posX = event.pageX - (channelKnobCenter.x);
					posY = event.pageY - (channelKnobCenter.y);
					// console.log($('.channel').rotationDegrees());
					holdRot = $('.chnl').rotationDegrees();
					// calculates an offset testing the current mouse posX against its offset mouseClickX
					var offsetX = posX - mouseClickX;

					$('.chnl').css("transform", "rotateZ("+(offsetX + currentChannelRot)+"deg)");
					checkChannel(holdRot);
				}

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
					if(previousChannel == 1)
					{
						a_ch1.volume = ch1Vol * volumeMultiplier;
					}
					else if(previousChannel == 2)
					{
						a_ch2.volume = ch2Vol * volumeMultiplier;
					}
					else if(previousChannel == 3)
					{
						a_ch3.volume = ch3Vol * volumeMultiplier;
					}
					else if(previousChannel == 4)
					{
						a_ch4.volume = ch4Vol * volumeMultiplier;
					}
					else if(previousChannel == 5)
					{
						a_ch5.volume = ch5Vol * volumeMultiplier;
					}
				}
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
	function playChannelAudio(channelToPlay) {
		a_ch1.volume = 0;
		a_ch2.volume = 0;
		a_ch3.volume = 0;
		a_ch4.volume = 0;
		a_ch5.volume = 0;
		if(channelToPlay == 1)
		{
			a_ch1.volume = ch1Vol * volumeMultiplier;
			var playPromise = a_ch1.play();

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
		else if(channelToPlay == 2)
		{
			a_ch2.volume = ch2Vol * volumeMultiplier;
			var playPromise = a_ch2.play();

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
		else if(channelToPlay == 3)
		{
			a_ch3.volume = ch3Vol * volumeMultiplier;
			var playPromise = a_ch3.play();

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
		else if(channelToPlay == 4)
		{
			a_ch4.volume = ch4Vol * volumeMultiplier;
			var playPromise = a_ch4.play();

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
		else if(channelToPlay == 5)
		{
			$('.nowPlaying').fadeIn(4000);
			a_ch5.volume = ch5Vol * volumeMultiplier;
			var playPromise = a_ch5.play();

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
		else
		{
			// nothing
		}
	}

	function updateKnobLightArrays() {

	}
// --------------- Update the TV Channel ---------------------
	function checkChannel(holdRot) {

			if(-150 <= holdRot && holdRot < -90)
			{
					trackTask.stop();
					$('.facebox').hide();
					console.log("channel01");
					updateChannel(1);
			}
			else if (-90 <= holdRot && holdRot < 0)
			{
					trackTask.stop();
					$('.facebox').hide();
					console.log("channel02");
					updateChannel(2);
			}
			else if (0 <= holdRot && holdRot < 90)
			{
					trackTask.stop();
					$('.facebox').hide();
					console.log("channel03");
					updateChannel(3);
			}
			else if (90 <= holdRot && holdRot <= 150)
			{
					trackTask.stop();
					$('.facebox').hide();
					console.log("channel04");
					updateChannel(4);
			}
			else {
					console.log("channel FIVE Webcam");
					trackTask.run();
					$('.facebox').show();
					updateChannel(5);
			}
	}
	function updateChannel(nextChannel)
	{
			var targetURL;
			var loadPolicy='?controls=0&autoplay=1&iv_load_policy=3&rel=0&modestbranding=1&loop=1&playlist=';
			if(nextChannel != previousChannel)
			{
					if(nextChannel == 1) // pouring coffee
					{
						// $('.webcam').hide();
							$('.youtubeVid').show();
							changeChannelAudioQueue();
							playChannelAudio(1);
						 	updateKnobLightArrays();
							targetVID = 'i_XV7YCRzKo'
							targetURL = 'https://www.youtube.com/embed/'+ targetVID +loadPolicy+ targetVID;
							$('.youtubeVid').attr('src', targetURL);
					}
					else if(nextChannel == 2) // cityscape
					{
						// $('.webcam').hide();
						$('.youtubeVid').show();
						changeChannelAudioQueue();
						playChannelAudio(2);
						updateKnobLightArrays();
						targetVID = 'oem5-_YaY1E'
						targetURL = 'https://www.youtube.com/embed/'+ targetVID +loadPolicy+ targetVID;
						$('.youtubeVid').attr('src', targetURL);
					}
					else if(nextChannel == 3) // coffee beans
					{
						// $('.webcam').hide();
						$('.youtubeVid').show();
						changeChannelAudioQueue();
						playChannelAudio(3);
						updateKnobLightArrays();
						targetVID = 'OxyF49cG1xs'
						targetURL = 'https://www.youtube.com/embed/'+ targetVID +loadPolicy+ targetVID;
						$('.youtubeVid').attr('src', targetURL);
					}
					else if(nextChannel == 4) // record music
					{
						// $('.webcam').hide();
						$('.youtubeVid').show();
						changeChannelAudioQueue();
						playChannelAudio(4);
						updateKnobLightArrays();
						targetVID = 'MBDzgvMM2T0'
						targetURL = 'https://www.youtube.com/embed/'+ targetVID +loadPolicy+ targetVID;
						$('.youtubeVid').attr('src', targetURL);
					}
					else // channel 5 Webcam
					{
						// setTimeout(function(){ $('.webcam').show(); }, 800);
						changeChannelAudioQueue();
						playChannelAudio(5);
						updateKnobLightArrays();
						$('.youtubeVid').hide();
					}

					console.log("Channel updated to: " + nextChannel)
			}
			previousChannel = nextChannel;
	}
});

// window.onload = function()
// {
//
// };
// Some rotation magic I found on StackOverflow. This should be built into JQuery
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
