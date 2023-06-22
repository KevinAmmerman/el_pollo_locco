let canvas;
let world;
let keyboard = new Keyboard();
let imagesToLoad = 0;
let imageLoaded = 0;
let percent = 0;
let gameStarted = false;
let soundMuted = false;

async function loadGame(newStart) {
    if(newStart) {
        canvas = null;
        world = null;
        gameStarted = false;
        soundMuted = false;
    }
    await generateHTML();
    setupTouchListeners();
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

async function generateHTML() {
    document.getElementById('gameScreen').innerHTML = createHtmlForGame();
}

function startGame() {
    if (percent == 100) {
        document.getElementById('starScreen').classList.add('dNone');
        document.getElementById('canvas').classList.remove('dNone');
        document.getElementById('canvasContainer').classList.remove('dNone');
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

// MOBILE CONTROL ELEMENTS


function setupTouchListeners() {
    document.getElementById('canvas').addEventListener('touchstart', (e) => {
        e.preventDefault();
    });

    attachTouchListenersToButton('leftKey', 'LEFT');
    attachTouchListenersToButton('rightKey', 'RIGHT');
    attachTouchListenersToButton('jumpKey', 'UP');
    attachTouchListenersToButton('throwKey', 'D');
}

function attachTouchListenersToButton(buttonId, keyboardKey) {
    const buttonElement = document.getElementById(buttonId);

    buttonElement.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard[keyboardKey] = true;
    });

    buttonElement.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard[keyboardKey] = false;
    });
}

// KEYBOARD LISTENER

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