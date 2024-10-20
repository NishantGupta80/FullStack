
let timerInterval;
let breakCount = 0;
let projectTime = 0;
let breakEndTime = null;
let sessionTime = null;

function startTimer() {
    sessionTime = parseInt(document.getElementById('sessionTime').value, 10) * 60 * 1000;
    const breakInterval = parseInt(document.getElementById('breakInterval').value, 10) * 60 * 1000;
    const breakDuration = parseInt(document.getElementById('breakDuration').value, 10) * 60 * 1000;
    
    let endTime = Date.now() + sessionTime;
    breakEndTime = Date.now() + breakInterval;
    
    clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        const now = Date.now();
        
        if (now >= endTime) {
            clearInterval(timerInterval);
            document.getElementById('timerDisplay').innerText = 'Session Ended';
            showBreakIntervals(breakInterval, breakDuration);
            return;
        }
        
        if (now >= breakEndTime) {
            breakCount++;
            document.getElementById('breakCount').innerText = `Breaks Taken: ${breakCount}`;
            beep();
            breakEndTime += breakInterval;
        }
        
        const remainingTime = endTime - now;
        const minutes = Math.floor(remainingTime / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);
        
        projectTime = Date.now() - endTime + sessionTime;
        const projectMinutes = Math.floor(projectTime / 60000);
        const projectSeconds = Math.floor((projectTime % 60000) / 1000);
        
        document.getElementById('timerDisplay').innerText = `Timer: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        document.getElementById('projectTime').innerText = `Total Project Time: ${String(projectMinutes).padStart(2, '0')}:${String(projectSeconds).padStart(2, '0')}`;
        document.getElementById('breakIntervalDisplay').innerText = `Next Break Interval: ${formatTime(breakEndTime - now)}`;
    }, 1000);
}

function beep() {
    const beepSound = document.getElementById('beepSound');
    beepSound.play();
}

function formatTime(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function showBreakIntervals(breakInterval, breakDuration) {
    const breakIntervals = Math.floor(sessionTime / breakInterval);
    const totalBreakTime = breakIntervals * breakDuration;
    
    let breakIntervalTime = totalBreakTime;
    
    setInterval(() => {
        if (breakIntervalTime <= 0) {
            document.getElementById('breakIntervalDisplay').innerText = 'All Breaks Completed';
            return;
        }
        
        const now = Date.now();
        breakIntervalTime -= 1000;
        
        document.getElementById('breakIntervalDisplay').innerText = `Next Break Interval: ${formatTime(breakIntervalTime)}`;
    }, 1000);
}
