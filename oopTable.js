//Canvas game
const canvas = document.getElementById('game-window');
const ctx = canvas.getContext('2d');

//canvas score
const canvas2 = document.getElementById('score');
const ctx2 = canvas2.getContext('2d');

 

    // How do globalvariable work in JS?
let ball1;
let paddle1;
let paddle2;
let game;


    window.onload = function(){
        
        // initializing instance
        game = new GameLogic(0,0,15);
        ball1 = new Ball( 10, 10,canvas.width/2,canvas.height/2, "black", 3,  1);
        paddle1 = new Paddle(100,10, 250,0,"black", "player1", 0.02);
        paddle2 = new Paddle(100,10, 250, canvas.width - 10,"black", "player2", 0.02);

        // JS canvas magic game tick
        const framesPerSecond= 60;
        setInterval(main, 1000/framesPerSecond,);
        
    }

    function main(){
        // Ball
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx2.clearRect(0, 0, canvas.width, canvas.height);
        ball1.move(paddle1,paddle2);
        ball1.draw();

        // not sure where to put this in game maybe


        // player1
        paddle1.move();
        paddle1.lock();
        paddle1.draw();

        //player2
        paddle2.move();
        paddle2.lock();
        paddle2.draw();
       

        //Scores
        game.scoreDraw();
        game.win(ball1);

        // ctx.fillText(AIScore, canvas.width -100 , 100);
        console.log(ball1.xPosition);
        console.log(game.scorep1);
    }


class GameLogic{
    constructor (scorep1, scorep2, time){
        this.scorep1 =scorep1;
        this.scorep2 = scorep2;
        this.time = time;
    }
    scoreDraw(){
        ctx2.font = '24px serif'
        ctx2.fillText('Player A:' + this.scorep1, canvas2.width/10, canvas2.height/2 + 20);
        ctx2.fillText('Player B:' + this.scorep2, 300, canvas2.height/2 + 20);
        
    }
    player1Score(ball1){
        this.scorep1++;
        // ballReset();
    }
    player2Score(ball1){
        this.scorep2++;
        // ballReset();
    }
    win(ball1){
        if (this.scorep1 >= 6){
            ball1.xVelocity = 0;
            ball1.yVelocity = 0;
            ctx.font = '64px serif';
            ctx.fillText('Player A WINS!', (canvas.width/2) - 200, (canvas.height/2) -100);
            ctx.fillText('Press Space to reset!', canvas2.width/2, 500);
            this.reset();
        }
        else if (this.scorep2 >= 6){
            ball1.xVelocity = 0;
            ball1.yVelocity = 0;
            ctx.font = '64px serif';
            ctx.fillText('Player B WINS!', (canvas.width/2) - 200, (canvas.height/2) -100);
            ctx.fillText('Press space to reset!', canvas2.width/2,500);
            this.reset();
        }
    }
    reset(){
        document.addEventListener('keydown', event => {
            // alert(event.keyCode);
    
            switch(event.keyCode){
                
                case 32:
                    //move up
                    location.reload();
               
                    break;
            }

        });
    }
}

class Ball {
    constructor(xDimention, yDimention, xPosition, yPosition, color, xVelocity, yVelocity){
        this.xDimention = xDimention;
        this.yDimention = yDimention;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.color = color;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
    }

    //ball
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.xPosition,this.yPosition, this.xDimention, this.yDimention);
    }
    move(paddle1,paddle2){
        // move in X axis
        this.xPosition += this.xVelocity;
        

        //edge
        if (this.xPosition > canvas.width){
            if (this.yPosition > paddle2.yPosition && this.yPosition < paddle2.yPosition + paddle2.height ){
                this.xVelocity = -this.xVelocity;
                
            }
            else {
                game.player1Score();
                this.ballReset();
            }
        }
        else if (this.xPosition < 0){
            if (this.yPosition > paddle1.yPosition && this.yPosition < paddle1.yPosition + paddle1.height){
                    this.xVelocity = -this.xVelocity;
                
            }
            else {
                game.player2Score();
                this.ballReset();
            }
        }
        // Move in y axis
        this.yPosition = this.yPosition + this.yVelocity;
       
        if (this.yPosition > canvas.height){
            this.yVelocity = -this.yVelocity;
        }
        else if (this.yPosition < 0 ){
            this.yVelocity = -this.yVelocity;
        }
    }
    ballReset(){
        this.xPosition = canvas.width/2;
        this.yPosition = canvas.height/2;
        this.xVelocity *= -1; 

        }  
    
}   
class Paddle{
    constructor(height, width, yPosition, xPosition, color, ai, speed){
    this.height = height;
    this.width = width;
    this.yPosition = yPosition;
    this.xPosition = xPosition;
    this.color = color;
    this.ai = ai;
    this.speed = speed;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.xPosition,this.yPosition, this.width, this.height);
    }
    lock(){
        if (this.yPosition < 0){
            this.yPosition = 0;
        }
        else if (this.yPosition > canvas.height - this.height){
            this.yPosition = canvas.height - this.height;
        }
           
    }

    move(){
        if (this.ai == 'player1'){
            document.addEventListener('keydown', event => {
                // alert(event.keyCode);
        
                switch(event.keyCode){
                    
                    case 83:
                        //move up
                        this.yPosition += this.speed;
                   
                        break;
        
                    case 87:
                        //move down
                        this.yPosition -= this.speed;
                     
                         break;
        
                }
        
            });
        }    
        else if (this.ai == 'player2'){
            document.addEventListener('keydown', event => {
                // alert(event.keyCode);
        
                switch(event.keyCode){
                    
                    case 40:
                        //move up
                        this.yPosition += this.speed;
                   
                        break;
        
                    case 38:
                        //move down
                        this.yPosition -= this.speed;
                     
                         break;
        
                }
        
            });
        }
          
    }
  
}


