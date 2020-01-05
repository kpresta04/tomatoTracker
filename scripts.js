disp = document.querySelector("#timer");

var Clock = {
  Timer: function(duration, display) {
    var start = Date.now(),
      diff,
      minutes,
      seconds;
    function timer() {
      // get the number of seconds that have elapsed since
      // startTimer() was called
      diff = duration - (((Date.now() - start) / 1000) | 0);

      // does the same job as parseInt truncates the float
      minutes = (diff / 60) | 0;
      seconds = diff % 60 | 0;
      timeValue--;

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      let formatted_time = minutes + ":" + seconds;

      display.textContent = formatted_time;
      $("#title").text(`Tomato Tracker! ${formatted_time}`);
      if (timeValue === -1) {
        onCompletion();
      }

      if (diff <= 0) {
        // add one second so that the count down starts at the full duration
        // example 05:00 not 04:59
        start = Date.now() + 1000;
      }
    }
    this.Timer.timer = timer;
  }
};
function playSound() {
  document.querySelector("#doorbell").play();
}
function resetTimer() {
  running = false;
  //reset timeValue
  timeValue = minutes * 60;

  //display timeValue
  disp.textContent = minutes + ":" + seconds + "0";
}

//initial variables
var running = false;
var minutes = 30;
var seconds = 0;
var timeValue = minutes * 60;

function startTimer() {
  //Check if already running first
  if (!running && timeValue >= 0) {
    Clock.Timer(timeValue, disp);
    // we don't want to wait a full second before the timer starts

    Clock.Timer.timer();
    interv = setInterval(Clock.Timer.timer, 1000);
    running = true;
  }
}
function onCompletion() {
  playSound();
  stopTimer();
  $("#tomatoRow").append(
    '<img class="tomatoImage" src="assets/images/tomato1.jpg" />'
  );
}
function stopTimer() {
  clearInterval(interv);
  running = false;
}
window.onload = function() {
  //Initialize timer
  this.resetTimer();
  //Start button even
  this.document
    .querySelector("#startBtn")
    .addEventListener("click", startTimer);
  //Stop button event
  this.document.querySelector("#stopBtn").addEventListener("click", stopTimer);
  //Reset button event
  this.document
    .querySelector("#resetBtn")
    .addEventListener("click", function() {
      clearInterval(interv);
      resetTimer();
    });
};
