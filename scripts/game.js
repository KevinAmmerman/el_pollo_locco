let canvas;
let world;
let keyboard = new Keyboard();
let imagesToLoad = 0;
let imageLoaded = 0;
let percent = 0;
let gameStarted = false;
let soundMuted = false;
let intervalIds = [];


async function loadGame(newStart) {
    if (newStart) resetGame();
    await generateHTML();
    setupTouchListeners();
    initLevel();
    init();
}

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

async function generateHTML() {
    document.getElementById('gameScreen').innerHTML = createHtmlForGame();
}

function startGame() {
    fadeOut('starScreen');
    fadeIn('loadingScreen');
    toggleDisplayNone('loadingScreen', REMOVE);
    setDelay(() => toggleDisplayNone('starScreen', ADD), MEDIUM_DELAY);
    setDelay(() => {
        fadeOut('loadingScreen');
        setDelay(() => {
            fadeIn('canvasContainer');
            toggleDisplayNone('canvasContainer', REMOVE);
            gameStarted = true;
            setDelay(() => toggleDisplayNone('loadingScreen', ADD), LONG_DELAY - SHORT_DELAY);
        }, SHORT_DELAY);
    }, LONG_DELAY);
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


function stopGame() {
    intervalIds.forEach(clearInterval);
    document.getElementById('endScreen').classList.remove('dNone');
}

function resetGame() {
    canvas = null;
    world = null;
    gameStarted = false;
    soundMuted = false;
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