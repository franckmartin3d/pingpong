// Draw a image on the canvas or block?


const canvas = document.getElementById('game-window');
const ctx = canvas.getContext('2d');


//ball variable
let ballx = 50
let ballSpeedX = 5;
let ballY =50;
let ballSpeedY = 5;

window.onload = function(){

    const framesPerSecond= 30;
    setInterval(updateEverything, 1000/framesPerSecond);
    
}
function updateEverything(){
    drawEverthing();
    moveX();
    moveY()
}


function drawEverthing(){
    
    //background
    colorRect(0,0,canvas.clientWidth,canvas.height, "black");

    //player paddle
    colorRect(0, 210, 10 , 100 ,'white');

    //ball
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(ballx, 100, 10, 0,Math.PI*2,true);
    ctx.fill();

}


function colorRect(corX, corY, width, height, color){
    ctx.fillStyle = color;
    ctx.fillRect(corX,corY, width, height);
}
// Ball movement in x axis
function moveX(){

    ballx += ballSpeedX;

    // adding boundaries
    if (ballx > canvas.width){
        ballSpeedX = -ballSpeedX;
    }
    else if (ballx < 0 ){
        ballSpeedX = -ballSpeedX;
    }
}
function moveY(){
    ballY += ballSpeedY;

    // adding boundaries
    if (ballY > canvas.height){
        ballSpeedY = -ballSpeedY;
    }
    else if (ballY < 0 ){
        ballSpeedY = -ballSpeedY;
    }

}


//Make the image move on the canvas