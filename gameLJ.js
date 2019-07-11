// Draw a image on the canvas or block?
let a_x = 50;

var canvas = document.getElementById('game-window');
var ctx = canvas.getContext('2d');

var a_image = new Image ();

a_image.onload = function(){
    ctx.drawImage(a_image, a_x, 0,30,30);
};
a_image.src = 'A_test.jpg';
;
//Make the image move on the canvas