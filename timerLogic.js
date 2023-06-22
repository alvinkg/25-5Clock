let breakIncrementButton = document.getElementById('break-increment')
let breakDecrementButton = document.getElementById('break-decrement')
let sessionIncrementButton = document.getElementById('session-increment')
let sessionDecrementButton = document.getElementById('session-decrement')
let startStopButton = document.getElementById('start_stop')
let resetButton = document.getElementById('reset')
let breakLength = document.getElementById('break-length')
let sessionLength = document.getElementById('session-length')
// let sessionLengthNum = parseInt(sessionLength.textContent);
let timeLeft = document.getElementById('time-left');
let timerLabel = document.getElementById('timer-label');

let timer;
let timerStatus = "begin";
let resetTime = '';
let flag = '';
let audio = document.getElementById('beep');

startStopButton.addEventListener('click', () => {
    if (timerStatus === "begin") {
        // sessionTime = document.getElementById('session-length').innerText;
        flag = 'Session';
        console.log('begin',flag)
        console.log(resetTime);
    }
    if (timerStatus === "begin" || timerStatus === 'stopped') {
        // timeLeft.innerText = decrementTime(timeLeft.innerText);
        console.log("Timer started.", flag)
        timerStatus = 'counting';
        timer = setInterval(() => {
            timeLeft.innerText = decrementTime(timeLeft.innerText);}, 1);
    }
    else if (timerStatus === "counting")  {
        clearInterval(timer);
        timerStatus = 'stopped';
        console.log('Timer stopped.', flag)
    }
})

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    flag = 'Session';
    timerStatus = "begin";
    timeLeft.innerText = '25' + ':00';
    breakLength.innerText = '5';
    console.log('break-length', document.getElementById('break-length').innerText)
    sessionLength.innerText = '25';
    console.log('session-length',document.getElementById('session-length').innerText)
    audio.pause();
    console.log('Timer reset.');
})

sessionIncrementButton.addEventListener('click', () => {

    if (parseInt(sessionLength.innerText) < 60 && parseInt(sessionLength.innerText) > 0 && timerStatus === "begin") {
        sessionLength.innerText = parseInt(sessionLength.innerText) + 1;
        timeLeft.innerText = sessionLength.innerText + ':00';
    }
})
sessionDecrementButton.addEventListener('click', () => {

    if (parseInt(sessionLength.innerText) <= 60 && parseInt(sessionLength.innerText) > 1 && timerStatus === "begin") {
        sessionLength.innerText = parseInt(sessionLength.innerText) - 1;
        timeLeft.innerText = sessionLength.innerText + ':00';
    }
})
breakIncrementButton.addEventListener('click', () => {

    if (parseInt(breakLength.innerText) < 60 && parseInt(breakLength.innerText) > 0 && timerStatus === "begin") {
        breakLength.innerText = parseInt(breakLength.innerText) + 1;
        // document.getElementById('session-length').innerText = sessionLengthNum;
    }
})
breakDecrementButton.addEventListener('click', () => {

    if (parseInt(breakLength.innerText) <= 60 && parseInt(breakLength.innerText) > 1 && timerStatus === "begin") {
        breakLength.innerText = parseInt(breakLength.innerText) - 1;
        // document.getElementById('session-length').innerText = sessionLengthNum;
    }
})


function decrementTime(timeString) {
    console.log('min',timeLeft.innerText.split(':')[0],'sec',timeLeft.innerText.split(':')[1]);
    // console.log('sec',timeLeft.innerText.split(':')[1]);
    let timeDisplay = timeString.split(":");
    let minuteDisplay = parseInt(timeDisplay[0]);
    let secondDisplay = parseInt(timeDisplay[1]);

    secondDisplay -= 1;

    if (secondDisplay === -1 && minuteDisplay > 0) {
        console.log('zz')
        secondDisplay = 59;
        minuteDisplay -= 1;
    }

    if (secondDisplay < 10 && secondDisplay > 0) {
        console.log('<10s')
        secondDisplay = '0' + secondDisplay;
        // console.log(secondDisplay);
    }    


    if (minuteDisplay === 0 && secondDisplay === 0) {
        console.log('00', flag)
        
        if (flag == 'Session') {
            console.log('flag session')
            
            timeLeft.innerText = breakLength.innerText + ':00';
            minuteDisplay = parseInt(timeDisplay[0]);
            flag = 'Break';
            timerLabel.innerText = flag;
            audio.play();
            console.log('Break', timeLeft.innerText);
            return timeLeft.innerText;
        }
        else if (flag == 'Break') {
            console.log('flag break')
            timeLeft.innerText = sessionLength.innerText + ':00';
            flag = 'Session';
            timerLabel.innerText = flag;
            audio.play();
            console.log('Session', timeLeft.innerText);
            return timeLeft.innerText;
        }
    }


    // console.log('y', minuteDisplay + ':' + secondDisplay);
    return minuteDisplay + ':' + secondDisplay
}



