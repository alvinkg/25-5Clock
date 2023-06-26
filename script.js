
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

// START
startButton.addEventListener('click', () => {
    if (isReset) {
        console.log('isResetCTLIS:', currentTimeLeftInSession)
        currentTimeLeftInSession = parseInt(sessionLength.innerText)*60;
        
    }
    isReset = false;
    console.log('state of isReset:', isReset)
    toggleClock();
})

// RESET
resetButton.addEventListener('click', () => {
    isReset = true;
    toggleClock(true);
    sessionLength.innerText = 1500/60;
    breakLength.innerText = 300/60;
    currentTimeLeftInSession = 1500;
    type = 'Session';
    timerLabel.innerText = type;
    displayCurrentTimeLeftInSession();
    audio.pause();
    audio.currentTime = 0;
    
    console.log(isReset)
})
breakIncrement.addEventListener('click', () => {
    if (parseInt(breakLength.innerText) >= 1 && parseInt(breakLength.innerText) < 60 && isReset === true) {
        breakLength.innerText = parseInt(breakLength.innerText) + 1;
  }
})
breakDecrement.addEventListener('click', () => {
    if (parseInt(breakLength.innerText) > 1 && parseInt(breakLength.innerText) <= 60 && isReset === true) {
        breakLength.innerText = parseInt(breakLength.innerText) - 1;
    }
})
sessionIncrement.addEventListener('click', () => {
    if (parseInt(sessionLength.innerText) >= 1 && parseInt(sessionLength.innerText) < 60 && isReset === true) {
        sessionLength.innerText = parseInt(sessionLength.innerText) + 1;
        
        currentTimeLeftInSession = parseInt(sessionLength.innerText) * 60;
        displayCurrentTimeLeftInSession();
  }
})
sessionDecrement.addEventListener('click', () => {
    if (parseInt(sessionLength.innerText) > 1 && parseInt(sessionLength.innerText) <= 60 && isReset === true) {
        sessionLength.innerText = parseInt(sessionLength.innerText) - 1;
        
        currentTimeLeftInSession = parseInt(sessionLength.innerText) * 60;
        displayCurrentTimeLeftInSession();
    }
})

const toggleClock = (reset) => {
    if (reset) {
      // STOP THE TIMER
        console.log('reset')
      stopClock()
    } else {
      if (isClockRunning === true) {
        // PAUSE THE TIMER
        clearInterval(clockTimer);
        isClockRunning = false;
      } else {
        // START THE TIMER
          isClockRunning = true;
          clockTimer = setInterval(() => {
            // decrease time left / increase time spent
            //   currentTimeLeftInSession--;
            displayCurrentTimeLeftInSession();
              stepDown();
        }, 1)
      }
    }
}

const displayCurrentTimeLeftInSession = () => {
    const secondsLeft = currentTimeLeftInSession;
    console.log(secondsLeft);
    let result = '';
    const seconds = secondsLeft % 60;
    // console.log(seconds)
    //need to solve this at 60 -> 00
    const preMinutes = parseInt(secondsLeft / 60);
    // console.log('preMinutes:', preMinutes)
    if (preMinutes === 60) {
        minutes = preMinutes;
        // console.log('60:', preMinutes)
    } else {
        minutes = preMinutes % 60;
        // console.log('rest:', preMinutes % 60 )
    }
    // const minutes = parseInt(secondsLeft / 60) % 60;
    // if (parseInt(secondsLeft / 60) === 60) {
    //     minutes = 60;
    // }
    // function solveMinutes(preMinutes) {
    //     return preMinutes < 60? preMinutes % 60
    // }


    // add leading zeroes if it's less than 10
    function addLeadingZeroes(time) {
      return time < 10 ? `0${time}` : time
    }
    result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`
    console.log('result:', result)
    timeLeft.innerText = result.toString();
}
  
const stopClock = () => {
    // 1) reset the timer we set
    clearInterval(clockTimer)
    // 2) update our variable to know that the timer is stopped
    isClockRunning = false
    // reset the time left in the session to its original state
    currentTimeLeftInSession = workSessionDuration
    // update the timer displayed
    displayCurrentTimeLeftInSession()
}
  
const stepDown = () => {
    if (currentTimeLeftInSession > 0) {
        // decrease time left / increase time spent
        currentTimeLeftInSession--
    } else if (currentTimeLeftInSession === 0) {
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
}
