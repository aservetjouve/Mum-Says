//=====SOUND=====//

let soundChoice = new Audio("/resources/sound/selectSound.mp3");

let fail = new Audio("/resources/sound/Fail.wav");



//=====MAIN GAME FUNCTION=====//

function buildDom(content) {
    var div = document.createElement("div");
    div.innerHTML = content;
    return div.children[0];
  }

//=====HOME SCREEN=====//
function createSplashScreen(){
    let splashScreen = buildDom(`
    <main>
        <section id="title">
            <h1 class="neonGreen">>M.U.M. SAYS</h1>
            <h2 class="lightGreen">>Memory. Upgrading. Machine.</h2>
        </section>
        <div id="info-container">
            <section id="instructions">
                <h3 class="neonGreen">>Welcome player... </h3>
                <p class="neonGreen">>Repeat the sequence using your keyboard's arrows</p>
                <p class="neonGreen">>Be careful, we do not accept any mistake.</p>
                <button id="gameStart"><h3 class="blackGreen">>Ready ? Press Space.</h3></button>
            </section>
        </div>
    </main>`);
    
    document.body.appendChild(splashScreen);

    
    document.addEventListener("keydown",function(event){
        if (event.keyCode ==32){
            let btnSelect = document.getElementById("gameStart");
            btnSelect.style.backgroundColor='#21891A';
            soundChoice.volume = 0.1;
            soundChoice.play();
            setTimeout(function(){
                splashScreen.remove(); 
                return createGameScreen()
            }, 1000); 
        }
    });
}

//=====GAME SCREEN=====//

function createGameScreen(){


    let gameScreen = buildDom(`
    <main>
        <section id="title">
            <h1 class="neonGreen">>M.U.M. SAYS</h1>
            <h2 class="lightGreen">>Memory. Upgrading. Machine.</h2>
        </section>
        <div id="game-space">
            <section id="gameBoard">
                <h4 class="neonGreen">>Your score : </h4>
                <span class="score"></span>
                <div class="canvasBox">
                    <canvas id="myCanvas" width="500" height="500"></canvas>
                </div>
            </section>
        </div>
    </main>`);

    document.body.appendChild(gameScreen);
    
    document.addEventListener("keypress",function(event){
        if (event.keyCode ==13){
            fail.volume = 0.1;
            fail.play();
            gameScreen.remove(); 
            return createGameOverScreen()
        }
    });
}

//=====GAME OVER SCREEN=====//


function createGameOverScreen(){
    let gameOverScreen = buildDom(`
    <main>
        <section id="title">
            <h1 class="red">>M.U.M. SAYS</h1>
            <h2 class="red">>Memory. Upgrading. Machine.</h2>
        </section>
        <div id="game-space">
            <section id="gameOver">
                <h2 class="red">>GAME OVER</h2>
                <h4 class="red">>Your score : </h4>
                <span class="score"></span>
                <button id="restartGame"><h3 class="blackGreen">>Dare to try again ?</h3></button>
            </section>
        </div>
    </main>`);

    document.body.appendChild(gameOverScreen);

    document.addEventListener("keydown",function(event){
        if (event.keyCode ==80){
            soundChoice.volume = 0.1;
            soundChoice.play();
            this.location.reload();    
        }
    }); 
}

createGameScreen() 