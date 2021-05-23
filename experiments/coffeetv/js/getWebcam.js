var errorCallback = function(e) {
  console.log('Reeeejected!', e);
};
var video = document.getElementById('video')

var handleSuccessVideo = function(stream) {
    video.srcObject = stream;
    //video.play();
};

navigator.mediaDevices.getUserMedia({ audio: false, video: true }).then(handleSuccessVideo);
