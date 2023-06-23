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
    if (newStart) {
        canvas = null;
        world = null;
        gameStarted = false;
        soundMuted = false;
    }
    await generateHTML();
    setupTouchListeners();
    initLevel();
    init();
    // setTimeout(() => {
    //     document.getElementById('loadingScreen').classList.add('fadeOut');
    //     document.getElementById('starScreen').classList.remove('dNone');
    //     setTimeout(() => {
    //         document.getElementById('loadingScreen').classList.add('dNone');
    //     }, 500);
    // }, 3000);
}

async function generateHTML() {
    document.getElementById('gameScreen').innerHTML = createHtmlForGame();
}

// function startGame() {
//     if (percent == 100) {
//         document.getElementById('starScreen').classList.add('fadeOut');
//         document.getElementById('canvas').classList.remove('dNone');
//         document.getElementById('canvasContainer').classList.remove('dNone');
//         gameStarted = true;
//         setTimeout(() => {
//             document.getElementById('starScreen').classList.add('fadeOut');
//             document.getElementById('loadingScreen').classList.remove('dNone');
//             setTimeout(() => {
//                 document.getElementById('loadingScreen').classList.add('dNone');
//             }, 500);
//         }, 3000);
//     }
// }

function startGame() {
    fadeOut('starScreen');
    fadeIn('loadingScreen');
    addOrRemoveDNone('loadingScreen', 'remove');
    setTimeout(() => {
        addOrRemoveDNone('starScreen', 'add');
    }, 1000);
    setTimeout(() => {
        fadeOut('loadingScreen');
        setTimeout(() => {
            fadeIn('canvasContainer');
            addOrRemoveDNone('canvasContainer', 'remove');
            gameStarted = true;
            setTimeout(() => {
                addOrRemoveDNone('loadingScreen', 'add');
            }, 2000);
        }, 500);
    }, 3000);
}

function fadeIn(id) {
    document.getElementById(id).classList.add('fadeIn');
}

function fadeOut(id) {
    document.getElementById(id).classList.add('fadeOut');
}

function addOrRemoveDNone(id, actionType) {
    if (actionType == 'add') {
        document.getElementById(id).classList.add('dNone');
    } else {
        document.getElementById(id).classList.remove('dNone');
    }
}

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


function toggleInfo(id) {
    document.getElementById(id).classList.toggle('dNone');
    document.getElementById(id).classList.toggle('fadeIn');
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