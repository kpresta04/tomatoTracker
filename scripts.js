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

      display.textContent = minutes + ":" + seconds;

      if (diff <= 0) {
        // add one second so that the count down starts at the full duration
        // example 05:00 not 04:59
        start = Date.now() + 1000;
      }
    }
    this.Timer.timer = timer;
  }
};
function resetTimer() {
  //reset timeValue
  timeValue = minutes * 60;
  //display timeValue
  disp.textContent = minutes + ":" + seconds + "0";
}
var minutes = 30;
var seconds = 0;
var timeValue = minutes * 60;

function startTimer() {
  Clock.Timer(timeValue, disp);
  // we don't want to wait a full second before the timer starts

  Clock.Timer.timer();
  interv = setInterval(Clock.Timer.timer, 1000);
}
window.onload = function() {
  //Initialize timer
  this.resetTimer();
  //Start button even
  this.document
    .querySelector("#startBtn")
    .addEventListener("click", startTimer);
  //Stop button event
  this.document.querySelector("#stopBtn").addEventListener("click", function() {
    clearInterval(interv);
  });
  //Reset button event
  this.document
    .querySelector("#resetBtn")
    .addEventListener("click", function() {
      clearInterval(interv);
      resetTimer();
    });
};
