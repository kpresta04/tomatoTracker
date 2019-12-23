function CountDownTimer(duration, granularity) {
  this.duration = duration;
  this.granularity = granularity || 1000;
  this.tickFtns = [];
  this.running = false;
}

CountDownTimer.prototype.start = function() {
  if (this.running) {
    return;
  }
  this.running = true;
  var start = Date.now(),
    that = this,
    diff,
    obj;

  (function timer() {
    diff = that.duration - (((Date.now() - start) / 1000) | 0);

    if (diff > 0) {
      setTimeout(timer, that.granularity);
    } else {
      diff = 0;
      that.running = false;
    }

    obj = CountDownTimer.parse(diff);
    that.tickFtns.forEach(function(ftn) {
      ftn.call(this, obj.minutes, obj.seconds);
    }, that);
  })();
};

CountDownTimer.prototype.onTick = function(ftn) {
  if (typeof ftn === "function") {
    this.tickFtns.push(ftn);
  }
  return this;
};

CountDownTimer.prototype.expired = function() {
  return !this.running;
};

CountDownTimer.parse = function(seconds) {
  return {
    minutes: (seconds / 60) | 0,
    seconds: seconds % 60 | 0
  };
};
function resetTimer() {
  this.running = false;
  var display = document.querySelector("#timer"),
    timer = new CountDownTimer(1800),
    timeObj = CountDownTimer.parse(1800);
  format(timeObj.minutes, timeObj.seconds);
  timer.onTick(format);
  function format(minutes, seconds) {
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = minutes + ":" + seconds;
  }
}
window.onload = function() {
  var display = document.querySelector("#timer"),
    timer = new CountDownTimer(1800),
    timeObj = CountDownTimer.parse(1800);

  format(timeObj.minutes, timeObj.seconds);

  timer.onTick(format);

  document.querySelector("#startBtn").addEventListener("click", function() {
    timer.start();
  });
  document.querySelector("#stopBtn").addEventListener("click", function() {
    CountDownTimer.running = false;
  });
  document
    .querySelector("#resetBtn")
    .addEventListener("click", this.resetTimer);

  function format(minutes, seconds) {
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = minutes + ":" + seconds;
  }
};
