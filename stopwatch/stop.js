let timerDisplay = document.getElementById('timer');
let startButton = document.getElementById('start');
let pauseButton = document.getElementById('pause');
let resetButton = document.getElementById('reset');

let startTime = 0;
let updatedTime = 0;
let difference = 0;
let interval;
let paused = false;

function startTimer() {
    if (!paused) {
        startTime = Date.now() - difference;
    }
    interval = setInterval(updateDisplay, 1000);
    paused = false;
}

function pauseTimer() {
    paused = true;
    clearInterval(interval);
    difference = Date.now() - startTime;
}

function resetTimer() {
    clearInterval(interval);
    paused = false;
    startTime = 0;
    updatedTime = 0;
    difference = 0;
    timerDisplay.textContent = "00:00:00";
}

function updateDisplay() {
    updatedTime = Date.now() - startTime;
    let hours = Math.floor((updatedTime / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((updatedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((updatedTime / 1000) % 60);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
