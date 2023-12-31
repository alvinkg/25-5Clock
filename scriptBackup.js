
const timeLeft = document.querySelector('#time-left')
const startButton = document.querySelector('#start_stop');
const resetButton = document.querySelector('#reset');
const timerLabel = document.querySelector('#timer-label');
const breakDecrement = document.querySelector('#break-decrement');
const breakIncrement = document.querySelector('#break-increment');
const breakLength = document.querySelector('#break-length');
const sessionLength = document.querySelector('#session-length');
const sessionDecrement = document.querySelector('#session-decrement');
const sessionIncrement = document.querySelector('#session-increment');
let audio = document.getElementById('beep');
// Default Values
let clockTimer;
let isClockRunning = false;
let workSessionDuration = 1500;
let breakSessionDuration = 300;
let currentTimeLeftInSession = 1500;
let type = 'Session'
let isReset = true;
let count = 0;

// START
startButton.addEventListener('click', () => {
    console.log('Enter start', count, isReset)
    toggleClock();
    // if (isReset) {
    //     console.log('Enter isReset = TRUE')
    //     toggleClock();
    // } else {
    //     console.log('Enter isReset = FALSE')
    //     toggleClock();
    // }
})

// RESET
resetButton.addEventListener('click', () => {
    console.log('Enter reset')
    isReset = true;
    toggleClock(true); // reset toggleClock
    sessionLength.innerText = 1500/60; // reset to 25 min
    breakLength.innerText = 300/60; // reset to 5 min
    currentTimeLeftInSession = 1500; // reset timer to 25 min
    type = 'Session'; 
    timerLabel.innerText = type; // test does not like hard code
    // displayCurrentTimeLeftInSession();
    audio.pause(); // pause the audio if playing
    audio.currentTime = 0;  // reset the audio back
    count = 0;
})

breakIncrement.addEventListener('click', () => {
    if (parseInt(breakLength.innerText) >= 1 && parseInt(breakLength.innerText) < 60) {
        breakLength.innerText = parseInt(breakLength.innerText) + 1;
  }
})
breakDecrement.addEventListener('click', () => {
    if (parseInt(breakLength.innerText) > 1 && parseInt(breakLength.innerText) <= 60) {
        breakLength.innerText = parseInt(breakLength.innerText) - 1;
    }
})
sessionIncrement.addEventListener('click', () => {
    if (parseInt(sessionLength.innerText) >= 1 && parseInt(sessionLength.innerText) < 60) {
        sessionLength.innerText = parseInt(sessionLength.innerText) + 1;
        
        currentTimeLeftInSession = parseInt(sessionLength.innerText) * 60;
        displayCurrentTimeLeftInSession();
  }
})
sessionDecrement.addEventListener('click', () => {
    if (parseInt(sessionLength.innerText) > 1 && parseInt(sessionLength.innerText) <= 60) {
        sessionLength.innerText = parseInt(sessionLength.innerText) - 1;
        
        currentTimeLeftInSession = parseInt(sessionLength.innerText) * 60;
        displayCurrentTimeLeftInSession();
    }
}) 

// && isReset === true remove not needed
    
const toggleClock = (reset) => {
    if (reset) {
      // STOP THE TIMER
        console.log('Enter toggleClock -> reset')
      resetClock()
    } else {
      if (isClockRunning === true) {
        // PAUSE THE TIMER
        console.log('Enter toggleClock -> pause')
          clearInterval(clockTimer);
        isClockRunning = false;
      }
      else {
        // START THE TIMER
          console.log('Enter toggleClock -> START')
        // alt 1:
          isClockRunning = true;
          clockTimer = setInterval(() => {
              timer();
          }, 1000)
        }
    }
    displayCurrentTimeLeftInSession();
}

const displayCurrentTimeLeftInSession = () => {
    // console.log('Enter displayCurrentTimeLeftInSession')
    // const presecondsLeft = currentTimeLeftInSession;

    // alt 1
    // if (isReset) {
    //     secondsLeft = parseInt(sessionLength.innerText)*60 + 1;
    //     isReset = false;
    // } else {
    //     secondsLeft = currentTimeLeftInSession;
    // }

    //alt 2
    secondsLeft = currentTimeLeftInSession;
    // console.log(secondsLeft);
    let result = '';
    const seconds = secondsLeft % 60;
    // console.log(seconds)

    const preMinutes = parseInt(secondsLeft / 60);
    if (preMinutes === 60) {
        minutes = preMinutes;
    } else {
        minutes = preMinutes % 60;
    }
    // console.log(minutes)
    // add leading zeroes if it's less than 10
    function addLeadingZeroes(time) {
      return time < 10 ? `0${time}` : time
    }
    result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`
    // console.log('result:', result)
    timeLeft.innerText = result.toString();
    // console.log('timeLeft:', timeLeft.innerText)
}
  
const resetClock = () => {
    console.log('Enter resetClock.');
    // 1) reset the timer we set
    clearInterval(clockTimer);
    // 2) update our variable to know that the timer is stopped
    isClockRunning = false;
    // reset the time left in the session to its original state
    currentTimeLeftInSession = workSessionDuration;
    // update the timer displayed
    displayCurrentTimeLeftInSession();
}
  
const timer = () => {
    if (currentTimeLeftInSession > 0) {
        if (isReset) {
            currentTimeLeftInSession = currentTimeLeftInSession;
            isReset = false;
        }
        currentTimeLeftInSession--
    } else if (currentTimeLeftInSession === 0) {
        console.log('stepDown === 0:',currentTimeLeftInSession )
        // Timer is over -> if work switch to break, viceversa
        audio.play();
        console.log('time left:', currentTimeLeftInSession)
        if (type === 'Session') {
            currentTimeLeftInSession = parseInt(breakLength.innerText) * 60;
            timerLabel.innerText = 'Break';
            console.log(timerLabel.innerText,':',currentTimeLeftInSession)
            type = 'Break';
        } else {
            currentTimeLeftInSession = parseInt(sessionLength.innerText) * 60;
            timerLabel.innerText = 'Session';
            type = 'Session'
            console.log(timerLabel.innerText,':', currentTimeLeftInSession)
            // audio.play()
        }
    }
    displayCurrentTimeLeftInSession();
}