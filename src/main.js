//==========RESOURCES==========//
//=====IMAGES=====//

function newImage(src){
    var tmp = new Image();
    tmp.src = src;
    return tmp;
}
//Frame
let buttonFrame = newImage("./resources/img/structure.png");

//Red Button
let redOff = newImage("./resources/img/redOff.png");
let redOn = newImage("./resources/img/whiteRed.png");

//Yellow Button
let yellOff = newImage("./resources/img/yellOf.png");
let yellOn = newImage("./resources/img/whiteYell.png");

//Blue Button
let blueOff = newImage("./resources/img/blueOff.png");
let blueOn = newImage("./resources/img/whiteBlue.png");

//Green Button
let greenOff = newImage("./resources/img/greenOff.png");
let greenOn = newImage("./resources/img/whiteGreen.png");

//=====SOUND=====//

let Sound = {
    intro : new Audio("./resources/sound/M.U.M. Intro.mp3"),
    choice : new Audio("./resources/sound/selectSound.mp3"),
    fail : new Audio("./resources/sound/Fail.wav"),
    yellow: new Audio("./resources/sound/soundYell.wav"),
    blue : new Audio("./resources/sound/soundBlue.wav"),
    green: new Audio("./resources/sound/soundGreen.wav"),
    red: new Audio("./resources/sound/soundRed.wav"),
    outro: new Audio("./resources/sound/M.U.M. Outro.mp3")
};

//==========MAIN GAME FUNCTION==========//
//=====CREATE THE SCREENS=====//
function buildDom(content) {
    var div = document.createElement("div");
    div.innerHTML = content;
    return div.children[0];
}

function main(){
    let splashScreen; 
    let gameScreen;
    let gameOverScreen;
    let score = 0;
    
    
    //=====HOME SCREEN=====//
    function createSplashScreen(){
        splashScreen = buildDom(`
            <main>
                <section id="title">
                    <header id="header">
                        <h1 class="neonGreen">>M.U.M. SAYS</h1>
                        <h2 class="lightGreen">>Memory. Upgrading. Machine.</h2>
                    </header>
                    <div id="aboutMe"class ="about">
                        <a href="./about.html">About</a>
                    </div>
                </section>
                <div id="info-container"> 
                    <section id="instructions" class="game-space-dark">
                        <h3 class="neonGreen">>Welcome player... </h3>
                        <p class="neonGreen">>Repeat the sequence using your keyboard's arrows</p>
                        <p class="lightGreen">>PS: M.U.M. is not very young. Sometimes she needs time to process</p>
                        <button id="gameStart" class=" quadrat1"><h3 class="blackGreen">>Press space to start.</h3></button>
                    </section>
                </div>
                <section id="responsive">
                    <div id="small-screen">
                        <h3 class="neonGreen">>Too bad, it seems your screen is too small to fully enjoy the game...</h3>
                    </div>
                    <div class ="small-about">
                            <a href="./about.html">About</a>
                    </div>
                </section>
            </main>`);
        document.body.appendChild(splashScreen);

        //Check when the space bar is pressed
        document.addEventListener("keydown",function(event){
            if (event.keyCode ==32){
                //Style Update
                document.querySelector(".game-space-dark").classList.add("turnneon");
                let btnSelect = document.getElementById("gameStart");
                btnSelect.style.backgroundColor='#21891A';
                
                //Sound Control
                Sound.choice.volume = 0.1;
                Sound.choice.play();

                //Changing Display
                setTimeout(function(){
                    splashScreen.remove(); 
                    return createGameScreen();
                }, 1000); 
            }
        });
    }

//=====GAME SCREEN=====//

    function createGameScreen(){
        gameScreen = buildDom(`
            <main>
                <section id="title">
                    <header>
                        <h1 class="neonGreen">>M.U.M. SAYS</h1>
                        <h2 class="lightGreen">>Memory. Upgrading. Machine.</h2>
                    </header>
                    <div class ="about">
                        <a href="./about.html">About</a>
                    </div>
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

        let userSequence = [];
        let generatedSequence = [];
        let numberSequence = 0;
        let boxStyle = document.querySelector(".game-space-dark");
        score = document.querySelector(".score").innerHTML = 0;

        const canvas = document.getElementById('myCanvas');
        let ctx = canvas.getContext('2d');

        setTimeout(function(){
            ctx.drawImage(buttonFrame, 20, 0); 
            ctx.drawImage(yellOff, 168, 28);
            ctx.drawImage(blueOff, 289, 149);
            ctx.drawImage(greenOff, 168, 269);
            ctx.drawImage(redOff, 48, 149);
        }, 10);

        //The player can adapt 
        setTimeout(function(){
            createSequence();
        }, 1000);
    
        function createSequence(){
            //The sequence doens't start immediatly after asnwer
            setTimeout(function(){
                numberSequence +=1;
                let randomNum = Math.floor(Math.random()*4);
                generatedSequence.push(randomNum);
                lightsUp();
            },800);
        }

        function lightsUp(){
            let numberOfStep = 0;
            for (let i=0; i<numberSequence;i++){
                //To turn the lights one after the other
                setTimeout(function(){
                    numberOfStep+=1;
                    switch (generatedSequence[i]) {
                        case 0 : 
                            //Turn On
                            ctx.drawImage(yellOn, 168, 28);

                            //Sound 
                            Sound.yellow.volume = 0.1;
                            Sound.yellow.play();

                            //Turn Off
                            setTimeout(function(){ctx.drawImage(yellOff, 168, 28);},100);
                        break;
        
                        case 1 : 
                            //Turn On 
                            ctx.drawImage(blueOn, 289, 149);

                            //Sound 
                            Sound.blue.volume=0.1;
                            Sound.blue.play();

                            //Turn Off
                            setTimeout(function(){ctx.drawImage(blueOff, 289, 149);},100);
                            break; 
                        
                        case 2 : 
                            //Turn On
                            ctx.drawImage(greenOn, 168, 269);

                            //Sound
                            Sound.green.volume=0.1;
                            Sound.green.play();

                            //Turn Off
                            setTimeout(function(){ctx.drawImage(greenOff, 168, 269);},100);
                        break;
        
                        case 3 : 
                            //Turn On 
                            ctx.drawImage(redOn, 41, 149);

                            //Sound 
                            Sound.red.volume=0.1;
                            Sound.red.play();

                            //Turn Off
                            setTimeout(function(){ctx.drawImage(redOff, 48, 149);},100);
                        break;
                    }
                },i*500);
            }
            //Wait that the sequence is over to start saving the answer
            if (numberOfStep+1 === numberSequence){
                getUserAnswer();
            }
        }
        
        
        function getUserAnswer(){
            //Button Pressed
            document.addEventListener('keydown',function(event) {
                if (event.keyCode==38){ // UP Arrow
                    //Save Player input
                    userSequence.push(0);
                    
                    //Turn On
                    ctx.drawImage(yellOn, 168, 28);
                    boxStyle.classList.add("turnneon");

                    //Sound 
                    Sound.yellow.volume=0.1;
                    Sound.yellow.play();
    
                } else if (event.keyCode==39){ // Left Arrow
                    //Save Player input
                    userSequence.push(1);

                    //Turn On
                    ctx.drawImage(blueOn, 289, 149);
                    boxStyle.classList.add("turnneon");

                    //Sound 
                    Sound.blue.volume=0.1;
                    Sound.blue.play();
                                            
                } else if (event.keyCode==40){ // Down Arrow
                    //Save Player input
                    userSequence.push(2);

                    //Turn On
                    ctx.drawImage(greenOn, 168, 269);
                    boxStyle.classList.add("turnneon");

                    //Sound
                    Sound.green.volume=0.1;
                    Sound.green.play();

                } else if (event.keyCode==37){ // Left Arrow
                    //Save Player Input
                    userSequence.push(3);
                    
                    //Turn On
                    ctx.drawImage(redOn,41, 149);
                    boxStyle.classList.add("turnneon");

                    //Sound 
                    Sound.red.volume=0.1;
                    Sound.red.play();  
                }
                    
            });

            //Turn Off 
            document.addEventListener('keyup',function(event2) {
                if (event2.keyCode === 38 ) {
                    ctx.drawImage(yellOff, 168, 28);
                    boxStyle.classList.remove("turnneon");

                } else if (event2.keyCode === 39) {
                    ctx.drawImage(blueOff, 289, 149);
                    boxStyle.classList.remove("turnneon");
                
                }else if (event2.keyCode === 40){
                    ctx.drawImage(greenOff, 168, 269);
                    boxStyle.classList.remove("turnneon");
                                        
                }else if (event2.keyCode === 37){
                    ctx.drawImage(redOff,48, 149);
                    boxStyle.classList.remove("turnneon");    
                }
            });     
        }

        var intervalId = setInterval(function(){
            if (userSequence.length == numberSequence || userSequence.length >= numberSequence){
                checkCorrect();
            }
        }, 1000);

        function checkCorrect(){
            if ( JSON.stringify(userSequence) == JSON.stringify(generatedSequence)){
                userSequence = [];
                score = document.querySelector(".score").innerHTML = score+1;
                createSequence();
                
            } else {
                clearInterval(intervalId);
                Sound.fail.volume=0.2;
                Sound.fail.play();
                Sound.outro.volume=0.2;
                Sound.outro.play();
                gameScreen.remove();
                createGameOverScreen();
            }
        }
          
    }
  
    //=====GAME OVER SCREEN=====//
 

    function createGameOverScreen(){
        gameOverScreen = buildDom
        (`<main>
            <section id="title">
                <header>
                    <h1 class="red">>M.U.M. SAYS</h1>
                    <h2 class="red">>Memory. Upgrading. Machine.</h2>
                </header>
                <div class ="about">
                    <a href="./about.html">About</a>
                </div>
            </section>
                <section id="gameOver">
                    <h5 class="red">>GAME OVER</h5>
                    <div class="totalScoreBoard">
                        <div class="normal-score">
                            <h4 class="red">>YOUR SCORE :  </h4>
                            <h4 class="red score"> </h4>
                        </div>
                        <div class="highest-score">
                            <h4 class="red mumComment"></h4>
                        </div>
                    </div> 
                    <button id="restartGame" class="quadrat"><h3 class="blackGreen">>Press space to try again.</h3></button>
            </section>
        </main>`);

        document.body.appendChild(gameOverScreen);
        document.querySelector('.score').innerHTML = score;

        if (score < 5){
            document.querySelector('.mumComment').innerHTML = ">M.U.M. doesn't know what do you with you.";
        } else if (score < 10){
            document.querySelector('.mumComment').innerHTML = ">M.U.M. is not impressed";
        } else if (score < 15){
            document.querySelector('.mumComment').innerHTML = ">M.U.M. is looking";
        }else if (score < 20){
            document.querySelector('.mumComment').innerHTML = ">You did well, but not enough for M.U.M.";
        } else if (score < 25){
            document.querySelector('.mumComment').innerHTML = ">M.U.M. is alright with this";
        }else if (score < 35){
            document.querySelector('.mumComment').innerHTML = ">I think M.U.M. just smiled !";
        }
    
        document.addEventListener("keydown",function(event){
            if (event.keyCode ==32){
                Sound.choice.play();
                setTimeout(function(){ 
                    this.location.reload();  
                },500);
                
            }
        }); 
    }
    

    //Start the game after loading
    createSplashScreen();
    Sound.intro.volume =0.2;
    Sound.intro.play();
} 

//Wait before the page appears, avoiding styling issues
window.addEventListener("load", main);