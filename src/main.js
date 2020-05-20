
//=====IMAGES=====//

let redOff = new Image();
redOff.src = "./resources/img/redOff.png";

let redOn = new Image();
redOn.src = "./resources/img/whiteRed.png";

let yellOff = new Image();
yellOff.src = "./resources/img/yellOf.png";

let yellOn = new Image();
yellOn.src = "./resources/img/whiteYell.png";

let blueOff = new Image();
blueOff.src = "./resources/img/blueOff.png";

let blueOn = new Image();
blueOn.src = "./resources/img/whiteBlue.png";

let greenOff = new Image();
greenOff.src = "./resources/img/greenOff.png";

let greenOn = new Image();
greenOn.src = "./resources/img/whiteGreen.png";

let buttonFrame = new Image();
buttonFrame.src = "./resources/img/structure.png";

//=====SOUND=====//

let soundChoice = new Audio("./resources/sound/selectSound.mp3");
let fail = new Audio("./resources/sound/Fail.wav");
let soundYell = new Audio("./resources/sound/soundYell.wav");
let soundBlue = new Audio("./resources/sound/soundBlue.wav");
let soundGreen = new Audio("./resources/sound/soundGreen.wav");
let soundRed = new Audio("./resources/sound/soundRed.wav");



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
            <section id="instructions" class="game-space-dark">
                <h3 class="neonGreen">>Welcome player... </h3>
                <p class="neonGreen">>Repeat the sequence using your keyboard's arrows</p>
                <p class="neonGreen">>Be careful, we do not accept any mistake.</p>
                <p class="lightGreen">>PS: M.U.M. is not very young. Sometimes she needs time to process</p>
                <button id="gameStart"><h3 class="blackGreen">>Ready ? Press Space.</h3></button>
            </section>
        </div>
    </main>`);
    
    document.body.appendChild(splashScreen);

    
    document.addEventListener("keydown",function(event){
        if (event.keyCode ==32){
            let btnSelect = document.getElementById("gameStart");
            btnSelect.style.backgroundColor='#21891A';
            document.querySelector(".game-space-dark").classList.add("turnneon");
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

let generatedSequence =[];

function createGameScreen(){

    let gameScreen = buildDom(`
    <main>
        <section id="title">
            <h1 class="neonGreen">>M.U.M. SAYS</h1>
            <h2 class="lightGreen">>Memory. Upgrading. Machine.</h2>
        </section>
        <div id="game-space" class="game-space-dark">
            <div class="scoreBox">
                    <p class="neonGreen">>SCORE : </p>
                    <p class="neonGreen score"></p>
            </div>
            <section id="gameBoard">
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
    let boxStyle = document.querySelector(".game-space-dark");
    let numberSequence = 0;
    var score = document.querySelector(".score").innerHTML = 0;


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
        numberSequence +=1;
        console.log('TOUR ', numberSequence) // CHECK
        let randomNum = Math.floor(Math.random()*4);
        generatedSequence.push(randomNum);
        lightsUp();
        console.log("The Sequence lenght is ",generatedSequence.length); 
        console.log("At the beginning User Key Count lenght is ",userKeycount)
    }

    function lightsUp(){
        let numberOfStep = 0;
        for (let i=0; i<numberSequence;i++){
            let timeOut = setTimeout(function(){
                numberOfStep+=1;
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
                        ctx.drawImage(redOn, 41, 149);
                        soundRed.volume = 0.1;
                        soundRed.play();
                        setTimeout(function(){
                            ctx.drawImage(redOff, 48, 149);
                        },500);
                        break;
                }
                if (numberOfStep == numberSequence){
                    clearTimeout(timeOut);
                    
                }
            },i*700)
            
        }
        
        if (numberOfStep+1 === numberSequence){
            getUserAnswer();
        }
    }
    
    
    function getUserAnswer(){
                $(document).keydown(function(event) {
                 
                if (event.keyCode==38){ // YELLOW BUTTON
                    ctx.drawImage(yellOn, 168, 28);
                    soundYell.volume = 0.1;
                    soundYell.play();
                    userKeycount+=1;
                    userSequence.push(0);
                    boxStyle.classList.add("turnneon");
                    
                } else if (event.keyCode==39){ // BLUE BUTTON
                    ctx.drawImage(blueOn, 289, 149);
                    soundBlue.volume = 0.1;
                    soundBlue.play();
                    userSequence.push(1);
                    boxStyle.classList.add("turnneon");
                    userKeycount+=1;
                    console.log('Button B working');
                    
                } else if (event.keyCode==40){ // GREEN BUTTON
                    ctx.drawImage(greenOn, 168, 269);
                    soundGreen.volume = 0.1;
                    soundGreen.play();
                    userKeycount+=1;
                    userSequence.push(2);
                    boxStyle.classList.add("turnneon");
                    console.log('Button G working');
                    
                } else if (event.keyCode==37){ // RED BUTTON
                    ctx.drawImage(redOn,41, 149);
                    console.log("R",userSequence);
                    soundRed.volume = 0.1;
                    console.log("R",userSequence);
                    soundRed.play();
                    console.log("R",userSequence); 
                    console.log("R",userSequence);
                    userKeycount+=1;
                    userSequence.push(3);
                    boxStyle.classList.add("turnneon");
                    console.log("R",userSequence);
                    console.log('Button R working');
                
                }
                
            });

            $(document).keyup(function(event2) {
                if (event2.keyCode === 38 ) {
                    ctx.drawImage(yellOff, 168, 28);
                    boxStyle.classList.remove("turnneon");
                    
                    return userSequence;
                } else if (event2.keyCode === 39) {
                    ctx.drawImage(blueOff, 289, 149);
                    boxStyle.classList.remove("turnneon");
                    
                    return userSequence;
                }else if (event2.keyCode === 40){
                    ctx.drawImage(greenOff, 168, 269);
                    boxStyle.classList.remove("turnneon");
                    
                    return userSequence;
                }else if (event2.keyCode === 37){
                    ctx.drawImage(redOff,48, 149);
                    boxStyle.classList.remove("turnneon");
                    return userSequence;
                }
            });

            
    }

    var intervalId = setInterval(function(){
        console.log(' SET INTERVAL : NUMBER OF SEQUENCE IS');
        if (userSequence.length == numberSequence || userSequence.length >= numberSequence){
            console.log('NUMBER OF SEQUENCE IS');
            checkCorrect();
        }
    }, 2000);

    

    function checkCorrect(){
        if ( JSON.stringify(userSequence) == JSON.stringify(generatedSequence)){
            console.log("NEXT");
            userSequence = [];
            score = document.querySelector(".score").innerHTML = score+1;
            userKeycount = 0;
            console.log('userKeyCount is ',userKeycount);
            createSequence(); 
        } else {
            clearInterval(intervalId);
            fail.volume = 0.1;
            fail.play();
            gameScreen.remove();
            createGameOverScreen();
        }
    }
    
}

//=====GAME OVER SCREEN=====//


function createGameOverScreen(){
    let totalScore = generatedSequence.length-1;
    let gameOverScreen = buildDom(`
    <main>
        <section id="title">
            <h1 class="red">>M.U.M. SAYS</h1>
            <h2 class="red">>Memory. Upgrading. Machine.</h2>
        </section>
            <section id="gameOver">
                <h2 class="red">>GAME OVER</h2>
                <div class="totalScoreBoard">
                    <h4 class="red">>YOUR SCORE :  </h4>
                    <h4 class="red score"></h4>
                </div>
                
                <button id="restartGame"><h3 class="blackGreen">>Dare to try again ? Press Space.</h3></button>
            </section>
        
    </main>`);

    document.body.appendChild(gameOverScreen);

    document.querySelector('.score').innerHTML = totalScore;

    document.addEventListener("keydown",function(event){
        if (event.keyCode ==32){
            soundChoice.volume = 0.1;
            soundChoice.play();
            this.location.reload();    
        }
    }); 
}

createSplashScreen(); 