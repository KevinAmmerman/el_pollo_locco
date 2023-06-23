const SHORT_DELAY = 300;
const MEDIUM_DELAY = 1000;
const LONG_DELAY = 2000;
const ADD = 'add';
const REMOVE = 'remove';

function fadeIn(id) {
    document.getElementById(id).classList.add('fadeIn');
}

function fadeOut(id) {
    document.getElementById(id).classList.add('fadeOut');
}

function toggleDisplayNone(id, actionType) {
    if (actionType == 'add') {
        document.getElementById(id).classList.add('dNone');
    } else {
        document.getElementById(id).classList.remove('dNone');
    }
}

function setDelay(fn, time) {
    setTimeout(fn, time);
}


function toggleInfo(id) {
    document.getElementById(id).classList.toggle('dNone');
    document.getElementById(id).classList.toggle('fadeIn');
}

function muteSound() {
    let button = document.getElementById('volumeBtn');
    soundMuted = !soundMuted;
    let objects = [world.character, ...world.level.enemies];
    objects.forEach(obj => {
        for (let key in obj) {
            if (key.toLowerCase().includes('sound')) {
                obj[key].muted = soundMuted;
                button.style.backgroundImage = `url('img/control/volume${soundMuted ? "-mute" : ""}.png')`;
            }
        }
    });
}


function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

function doNotClose(event) {
    event.stopPropagation();
}