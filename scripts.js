$(document).ready(function() {
  disp = document.querySelector("#timer");

  let tomatoCount = 0;
  let getObj = JSON.parse(localStorage.getItem("tomatoObj"));
  if (getObj !== null) {
    // console.log(getObj);
    tomatoCount = getObj;
  }
  $("#tomatoLabel").text(`Tomato count: ${tomatoCount}`);
  for (let i = 0; i < tomatoCount; i++) {
    $("#tomatoRow").append(
      '<img class="tomatoImage" src="assets/images/tomato1.jpg" />'
    );
  }
  $("#timerLength").on("change", function() {
    if (running === false) {
      minutes = $("#timerLength").val();

      //reset timeValue
      timeValue = minutes * 60;
      //display timeValue

      disp.textContent = minutes + ":" + seconds + "0";
    }
  });
  let checked_btn;
  $("#option1").on("click", e => {
    // console.log(e.target);
    if (running === false) {
      checked_btn = "tomato";
      minutes = $("#timerLength").val();
      resetTimer();
    }
  });

  $("#option2").on("click", e => {
    // console.log(e.target);

    if (running === false) {
      checked_btn = "break";
      minutes = 5;
      resetTimer();
    }
  });

  const Clock = {
    Timer: function(duration, display) {
      let start = Date.now(),
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
  let running = false;
  let minutes = $("#timerLength").val();
  let seconds = 0;
  let timeValue = minutes * 60;
  let interv;

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
    if (checked_btn !== "break") {
      tomatoCount++;
      $("#tomatoLabel").text(`Tomato count: ${tomatoCount}`);

      localStorage.setItem("tomatoObj", JSON.stringify(tomatoCount));
      $("#tomatoRow").append(
        '<img class="tomatoImage" src="assets/images/tomato1.jpg" />'
      );
    }
  }
  function stopTimer() {
    clearInterval(interv);
    running = false;
  }

  //Initialize timer
  resetTimer();
  //Start button even
  document.querySelector("#startBtn").addEventListener("click", startTimer);
  //Stop button event
  document.querySelector("#stopBtn").addEventListener("click", stopTimer);
  //Reset button event
  document.querySelector("#resetBtn").addEventListener("click", function() {
    clearInterval(interv);
    resetTimer();
  });
});
