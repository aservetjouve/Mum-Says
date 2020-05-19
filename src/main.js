
//=====IMAGES=====//

let redOff = new Image();
redOff.src = "/resources/img/redOff.png";

let redOn = new Image();
redOn.src = "/resources/img/redOn.png";

let yellOff = new Image();
yellOff.src = "/resources/img//yellOf.png";

let yellOn = new Image();
yellOn.src = "/resources/img/yellOn.png";

let blueOff = new Image();
blueOff.src = "/resources/img/blueOff.png";

let blueOn = new Image();
blueOn.src = "/resources/img/blueOn.png";

let greenOff = new Image();
greenOff.src = "/resources/img/greenOff.png";

let greenOn = new Image();
greenOn.src = "/resources/img/greenOn.png";

let buttonFrame = new Image();
buttonFrame.src = "/resources/img/structure.png";

//=====SOUND=====//

let soundChoice = new Audio("/resources/sound/selectSound.mp3");
let fail = new Audio("/resources/sound/Fail.wav");
let soundYell = new Audio("/resources/sound/soundYell.wav");
let soundBlue = new Audio("/resources/sound/soundBlue.wav");
let soundGreen = new Audio("/resources/sound/soundGreen.wav");
let soundRed = new Audio("/resources/sound/soundRed.wav");



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
                <h4 class="neonGreen">>Round </h4>
                <span class="round">0</span>
                <div class="canvasBox">
                    <canvas id="myCanvas" width="500" height="500"></canvas>
                </div>
            </section>
        </div>
    </main>`);

    document.body.appendChild(gameScreen);

    const canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');
    

    let userSequence = [];
    let userKeycount = 0;
    let generatedSequence =[];
    let numberSequence = 0;


    setTimeout(function(){
        ctx.drawImage(buttonFrame, 20, 0); 
        ctx.drawImage(yellOff, 168, 28);
        ctx.drawImage(blueOff, 289, 149);
        ctx.drawImage(greenOff, 168, 269);
        ctx.drawImage(redOff, 48, 149);
    }, 1);

    setTimeout(function(){
        createSequence();
    }, 1000);
 
    function createSequence(){
        numberSequence+=1;
        console.log('TOUR ', numberSequence) // CHECK
        let randomNum = Math.floor(Math.random()*4);
        generatedSequence.push(randomNum);
        lightsUp();
        console.log(generatedSequence.length); 
    }

    function lightsUp(){
        for (let i=0; i<numberSequence;i++){
            switch (generatedSequence[i]) {
                case 0 : 
                    ctx.drawImage(yellOn, 168, 28);
                    soundYell.volume = 0.1;
                    soundYell.play();
                    setTimeout(function(){
                        ctx.drawImage(yellOff, 168, 28);
                    },500);
                    break;

                case 1 : 
                    ctx.drawImage(blueOn, 289, 149);
                    soundBlue.volume = 0.1;
                    soundBlue.play();
                    setTimeout(function(){
                        ctx.drawImage(blueOff, 289, 149);
                    },500);
                    break; 
                
                case 2 : 
                    ctx.drawImage(greenOn, 168, 269);
                    soundGreen.volume = 0.1;
                    soundGreen.play();
                    setTimeout(function(){
                        ctx.drawImage(greenOff, 168, 269);
                    },500);
                    break;

                case 3 : 
                    ctx.drawImage(redOn, 48, 149);
                    soundRed.volume = 0.1;
                    soundRed.play();
                    setTimeout(function(){
                        ctx.drawImage(redOff, 48, 149);
                    },500);
                    break;
            }
        }
        console.log("lightsUp is working " + generatedSequence)
        getUserAnswer();
    }
    
    
    function getUserAnswer(){
            document.addEventListener("keydown",function(event){ 
    
                if (event.keyCode==38){ // YELLOW BUTTON
                    ctx.drawImage(yellOn, 168, 28);
                    soundYell.volume = 0.1;
                    soundYell.play();
                    userSequence.push(0);
                    userKeycount++;
                    document.addEventListener("keyup",function(){
                        ctx.drawImage(yellOff, 168, 28);
                        return userSequence;
                    })
                } else if (event.keyCode==39){ // BLUE BUTTON
                    ctx.drawImage(blueOn, 289, 149);
                    soundBlue.volume = 0.1;
                    soundBlue.play();
                    userSequence.push(1);
                    userKeycount++;
                    console.log('Button B working');
                    document.addEventListener("keyup",function(){
                        ctx.drawImage(blueOff, 289, 149);
                        return userSequence;
                    })
                } else if (event.keyCode==40){ // GREEN BUTTON
                    ctx.drawImage(greenOn, 168, 269);
                    soundGreen.volume = 0.1;
                    soundGreen.play();
                    userSequence.push(2);
                    userKeycount++;
                    console.log('Button G working');
                    document.addEventListener("keyup",function(){
                        ctx.drawImage(greenOff, 168, 269);
                        return userSequence;
                    })
                } else if (event.keyCode==37){ // RED BUTTON
                    ctx.drawImage(redOn,48, 149);
                    soundRed.volume = 0.1;
                    soundRed.play();
                    userSequence.push(3);
                    userKeycount++;
                    console.log('Button R working');
                    document.addEventListener("keyup",function(){
                        ctx.drawImage(redOff,48, 149);
                        return userSequence;
                    })
                }
                
            });

            let intervalId = setInterval(function(){
                if (userKeycount == numberSequence){
                    console.log('YES');
                    clearInterval(intervalId);
                    checkCorrect();
                }else{
                    console.log('NO');
                    console.log(userKeycount);
                    console.log(numberSequence);
                }
            }, 2000);
            
            
        
      
    }
    

    function checkCorrect(){
        if ( JSON.stringify(userSequence) == JSON.stringify(generatedSequence)){
            console.log("NEXT");
            userSequence = [];
            userKeycount = 0;
            createSequence(); 
        } else {
            fail.volume = 0.1;
            fail.play();
            gameScreen.remove();
            createGameOverScreen();
        }
    }
    

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

createSplashScreen();