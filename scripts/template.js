function createHtmlForGame() {
    return `
        <div id="loadingScreen" class="">
            <img class="loadingImg" src="./img/loading/mexican-hat.png" alt="">
            <div class="loadingStatus">LOADING...</div>
        </div>
        <div id="starScreen" class="dNone">
            <div class="btnContainer">
                <button onclick="startGame()" class="btnStyle">Start</button>
                <button onclick="toggleInfo('gameInfoContainer')" class="btnStyle">Info</button>
            </div>
            <div id="gameInfoContainer" class="dNone infoWindowStyle" onclick="toggleInfo('gameInfoContainer')">
                <div id="gameInfo" onclick="doNotClose(event)">
                    <button onclick="toggleInfo('gameInfoContainer')" class="closeInfo"></button>
                    <div class="controlContainer">
                        <img class="controllerImg" src="./img/control/arrows.png" alt="">
                        <span>walk/jump</span>
                    </div>
                    <div class="controlContainer">
                        <img class="controllerImg" src="./img/control/key-d-of-a-keyboard.png" alt="">
                        <span>throw bottle</span>
                    </div>
                </div>
            </div>
        </div>
        <div id="endScreen" class="dNone">
            <img class="gameOverImg" src="./img/9_intro_outro_screens/game_over/game over.png">
            <button onclick="loadGame('newStart')" class="restartBtn">Back to menu</button>
        </div>
        <div id="canvasContainer" class="dNone">
            <div id="ingameControl">
                <button class="ingameControlBtn" id="pauseBtn" onclick="pauseGame()"></button>
                <button class="ingameControlBtn" id="infoIngameBtn"
                    onclick="toggleInfo('infoIngameContainer')"></button>
                <button class="ingameControlBtn" id="volumeBtn" onclick="muteSound()"></button>
            </div>
            <div id="infoIngameContainer" class="dNone infoWindowStyle" onclick="toggleInfo('infoIngameContainer')">
                <div id="gameInfo" onclick="doNotClose(event)">
                    <button onclick="toggleInfo('infoIngameContainer')" class="closeInfo"></button>
                    <div class="controlContainer">
                        <img class="controllerImg" src="./img/control/arrows.png" alt="">
                        <span>walk/jump</span>
                    </div>
                    <div class="controlContainer">
                        <img class="controllerImg" src="./img/control/key-d-of-a-keyboard.png" alt="">
                        <span>throw bottle</span>
                    </div>
                </div>
            </div>
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
            <canvas class="dNone" id="canvas" width="720px" height="480px"></canvas>
        </div>
    `;
}