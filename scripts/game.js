let canvas;
let world;
let keyboard = new Keyboard();
let imagesToLoad = 0;
let imageLoaded = 0;
let percent = 0;
let levelInitialized = false;

function toggleInfo() {
    document.getElementById('gameInfoContainer').classList.toggle('dNone');
}

function loadGame() {
    initLevel();
    init();
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('dNone');
        document.getElementById('starScreen').classList.remove('dNone');
    }, 3000);
}

function startGame() {
    document.getElementById('starScreen').classList.add('dNone');
    document.getElementById('canvas').classList.remove('dNone');
    levelInitialized = true;
}

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


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