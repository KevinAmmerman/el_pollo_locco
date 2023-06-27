function createHtmlForGame() {
    return `
        <div id="loadingScreen" class="dNone">
            <img class="loadingImg" src="./img/loading/mexican-hat.png" alt="">
            <div class="loadingStatus">LOADING...</div>
        </div>
        <div id="starScreen" class="">
            <div class="btnContainer">
                <button onclick="startGame()" class="btnStyle">Start</button>
                <button onclick="toggleInfo('gameInfoContainer')" class="btnStyle">Info</button>
            </div>
            <div id="gameInfoContainer" class="dNone infoWindowStyle" onclick="toggleInfo('gameInfoContainer')"></div>
        </div>
        <div id="endScreen" class="dNone">
            <img class="gameOverImg" src="./img/9_intro_outro_screens/game_over/game over.png">
            <button onclick="loadGame('newStart')" class="restartBtn">Back to menu</button>
        </div>
        <div id="canvasContainer" class="dNone">
            <div id="ingameControl">
                <button class="ingameControlBtn" id="pauseBtn" onclick="pauseGame()"></button>
                <button class="ingameControlBtn" id="infoIngameBtn"
                    onclick="toggleInfo('ingameInfoContainer')"></button>
                <button class="ingameControlBtn" id="volumeBtn" onclick="muteSound()"></button>
                <button class="ingameControlBtn" id="fullScreenBtn" onclick="toggleFullscreen()"></button>
            </div>
            <div id="ingameInfoContainer" class="dNone infoWindowStyle" onclick="toggleInfo('ingameInfoContainer')"></div>
            <div id="mobileControler">
                <div class="leftHand">
                    <button id="jumpKey" class="mobileBtn"></button>
                    <button id="throwKey" class="mobileBtn"></button>
                </div>
                <div class="rightHand">
                    <button id="leftKey" class="mobileBtn"></button>
                    <button id="rightKey" class="mobileBtn"></button>
                </div>
            </div>
            <canvas class="" id="canvas" width="720px" height="480px"></canvas>
        </div>
    `;
}


function createHtmlForInfo(id) {
    return `
        <div id="gameInfo" onclick="doNotClose(event)">
            <button onclick="toggleInfo('${id}')" class="closeBtnStyle"></button>
            <div class="controlContainer">
                <img class="controllerImg" src="./img/control/arrows.png" alt="">
                <span>walk/jump</span>
            </div>
            <div class="controlContainer">
                <img class="controllerImg" src="./img/control/key-d-of-a-keyboard.png" alt="">
                <span>throw bottle</span>
            </div>
        </div>
    `;
}


function createHtmlForLicense(id) {
    return `
        <div class="linkWindow" onclick="doNotClose(event)">
            <button onclick="toggleInfo('${id}')" class="closeBtnStyle"></button>
            <ul>
                <li>
                    <a class="attributeLinkStyle" href="https://www.flaticon.com/free-icons/next"
                        title="next icons">Next icons created by Smashicons - Flaticon</a>
                </li>
                <li>
                    <a class="attributeLinkStyle" href="https://www.flaticon.com/free-icons/telephone"
                        title="telephone icons">Telephone icons created by Pixel perfect - Flaticon</a>
                </li>
                <li>
                    <a class="attributeLinkStyle" href="https://www.flaticon.com/free-icons/fullscreen"
                        title="fullscreen icons">Fullscreen icons created by Those Icons - Flaticon</a>
                </li>
            </ul>
        </div>
    `;
}