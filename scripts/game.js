let canvas;
let world;
let keyboard = new Keyboard();
let imagesToLoad = 0;
let imageLoaded = 0;
let percent = 0;
let gameStarted = false;
let soundMuted = false;

function loadGame() {
    initLevel();
    init();
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('fadeOut');
        document.getElementById('starScreen').classList.remove('dNone');
        setTimeout(() => {
            document.getElementById('loadingScreen').classList.add('dNone');
        }, 500);
    }, 3000);
}

function startGame() {
    if (percent == 100) {
        document.getElementById('starScreen').classList.add('dNone');
        document.getElementById('canvas').classList.remove('dNone');
        document.getElementById('ingameControl').classList.remove('dNone');
        gameStarted = true;
    }
}

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


function toggleInfo(id) {
    document.getElementById(id).classList.toggle('dNone');
}

function pauseGame() {
    let button = document.getElementById('pauseBtn');
    if (gameStarted) {
        gameStarted = false;
        button.style.backgroundImage = "url('img/control/play-buttton.png')";
    } else {
        gameStarted = true;
        button.style.backgroundImage = "url('img/control/pause.png')";
    }
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

function setupButtonTouchEvents() {
    var buttons = document.getElementsByClassName('mobileBtn');

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('touchstart', function (event) {
            var buttonId = event.target.id;
            console.log("Button gedrückt: " + buttonId);
            // Weitere Aktionen für den gedrückten Button durchführen
        });

        buttons[i].addEventListener('touchend', function (event) {
            var buttonId = event.target.id;
            console.log("Button losgelassen: " + buttonId);
            // Weitere Aktionen für den losgelassenen Button durchführen
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    setupButtonTouchEvents();
});

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});


window.addEventListener('keyup', (e) => {
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});

function doNotClose(event) {
    event.stopPropagation();
}