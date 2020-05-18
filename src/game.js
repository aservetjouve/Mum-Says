const canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

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

//let soundChoice = new Audio("/resources/sound/selectSound.mp3");
//let soundFail = new Audio("/resources/sound/Fail.wav");
let soundYell = new Audio("/resources/sound/soundYell.wav");
let soundBlue = new Audio("/resources/sound/soundBlue.wav");
let soundGreen = new Audio("/resources/sound/soundGreen.wav");
let soundRed = new Audio("/resources/sound/soundRed.wav");

//=====XXX=====//

function draw(){
    
}

buttonFrame.onload = () => {
    ctx.drawImage(buttonFrame, 20, 0);
    ctx.drawImage(redOff,48, 149);
    ctx.drawImage(blueOff, 289, 149);
    ctx.drawImage(yellOff, 168, 28);
    ctx.drawImage(greenOff, 168, 269);
}

document.addEventListener("keydown",function(event){ 
    if (event.keyCode==38){ // YELLOW BUTTON
        ctx.drawImage(yellOn, 168, 28);
        soundYell.volume = 0.1;
        soundYell.play();
        document.addEventListener("keyup",function(event2){
            ctx.drawImage(yellOff, 168, 28);
        })
    } else if (event.keyCode==39){ // BLUE BUTTON
        ctx.drawImage(blueOn, 289, 149);
        soundBlue.volume = 0.1;
        soundBlue.play();
        document.addEventListener("keyup",function(event2){
            ctx.drawImage(blueOff, 289, 149);
        })
    } else if (event.keyCode==40){ // GREEN BUTTON
        ctx.drawImage(greenOn, 168, 269);
        soundGreen.volume = 0.1;
        soundGreen.play();
        document.addEventListener("keyup",function(event2){
            ctx.drawImage(greenOff, 168, 269);
        })
    } else if (event.keyCode==37){ // RED BUTTON
        ctx.drawImage(redOn,48, 149);
        soundRed.volume = 0.1;
        soundRed.play();
        document.addEventListener("keyup",function(event2){
            ctx.drawImage(redOff,48, 149);
        })
    }

});




