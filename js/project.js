
let canvas = document.getElementById('myCanvas');
ctx = canvas.getContext('2d');
document.addEventListener('keydown', movement, false);
window.onload = draw;

function draw(){
    drawGame(); 
    runningMan();
    flagSprite();
}
let hero = {
    x: 0,
    y: 0
}
let enemy = {   
    x: 0,
    y: 0 
}
function movement(e){
//Player Controls 
// horizontal and vertical movement
    if (e.keyCode === 87 ){
         ctx.clearRect(0,0,canvas.width,canvas.height);
         hero.y=hero.y-20;
         sY = 97;
        draw();
    }
     if(e.keyCode === 83){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        hero.y=hero.y+20;
        sY = 0;
        draw();
    }
    if(e.keyCode === 65){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        hero.x=hero.x-20;
        sY = 32;
        draw();
    }
    if(e.keyCode === 68){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        hero.x=hero.x+20;
        sY = 64;
        draw();
    }
    // keeping the player inside the canvas
    hero.x = Math.min(Math.max(hero.x, 0-5), canvas.width-60);
    hero.y = Math.min(Math.max(hero.y, 0+5), canvas.height-70); 
}


//Animation for the sprite sheet
let img = new Image();
img.src = '../sprites/runningGood.png'
let cycle = 0
let sY;
let sW = 30 
let sH = 31
function runningMan(){
    ctx.drawImage(img,cycle*sW,sY,sW,sH,hero.x,hero.y,70,70)
    cycle = (cycle + 1) % 3;
}

let tileW = 75;
let tileH = 75;
let mapW = 10;
let mapH = 10;

let gameMap = [
    3,0,0,0,0,0,0,0,0,0,
    0,0,0,1,0,0,0,1,0,0,
    0,0,0,1,0,0,0,1,0,0,
    0,0,0,1,0,0,0,1,0,0,
    0,0,0,1,0,0,0,1,0,0,
    0,0,0,1,0,0,0,1,0,0,
    0,0,0,1,0,0,0,1,0,0,
    0,0,0,1,0,0,0,1,0,0,
    0,0,0,1,0,0,0,1,0,0,
    0,0,0,1,0,0,0,0,0,2,
]

function drawGame(){
// for loop that goes throgh the entire grid map checking what value it is and filling the color of the tile accordingly
    for (let y = 0; y<mapH; y++)
    {
        for (let x = 0; x<mapW; x++)
            {
                switch(gameMap[((y*mapW)+x)]){
                    case 0:
                        ctx.fillStyle='#307fff';
                        break;
                    case 2:
                        setTimeout(flagSprite)
                        break;
                    case 3:
                        ctx.fillStyle='#FFA500'
                        break;
                    default:
                        ctx.fillStyle='#3a3b3d';
                }
                ctx.fillRect(x*tileW, y*tileH, tileW, tileH);
        }
    }
}
// Global vars for the coords of the flag
let flagX = 685;
let flagY = 680;
let flagW = 202;
let flagH = 324;
let flagCycle = 0;
let flagImg = new Image();
flagImg.src='../sprites/flagSprite.png';
let isFlag = false; 
// the flag function... The if else statement is for clearing the background of where the flag is depending if it captured or not.
// when true the flag in the top right will appear until you return it to the starting zone in which you will get a score of 1 added;
setInterval(flagSprite, 100);
function flagSprite(){
    if (hero.x + 40 > 675 && hero.y + 55 > 67){
        isFlag = true;
 }
    else if (hero.x + 40 < 75 && hero.y + 55 < 75){
         isFlag = false;
         flagX = 685;
         flagY = 680;
     }
    if (isFlag === false){
        ctx.clearRect(675,675,75,75)
        ctx.beginPath();
        ctx.fillStyle='#42f45c';
        ctx.fillRect(675,675,75,75);
        ctx.fill();
    }
    else if (isFlag === true){
        flagX = 685;
        flagY = 0;
            
        ctx.clearRect(675,0,75,75)
        ctx.beginPath();
        ctx.fillStyle='#42f45c';
        ctx.fillRect(675,0,75,75);
        ctx.fill();
    }
    ctx.drawImage(flagImg,flagCycle*flagW,0,flagW,flagH,flagX,flagY,75,75);
    flagCycle = (flagCycle + 1) % 10;
}
// 1) check if the flag === true
// 2) if the flag is true and the
// function score(){
//     if (isFlag === true && hero.x + 40 < 200 && hero.y + 55 < 200){
//         console.log('score');
//     }
// }

let color;

function randomColor(){
    color = Math.random();
    if (color < 0.33){
        color = 'red'
    }
    else if (color > 0.33 && color <0.66){
        color = 'pink'
    }
    else if (color > 0.66){
        color = 'yellow'
    }
}
// function randomXY(){
//     enemy.x = Math.floor((Math.random()*620) + 100);
//     enemy.y = randomX = Math.floor((Math.random()*620) + 100);
// }
// //global vars for animateEnemy
// const FPS = 30;
// let radius = 25;
// let xv;
// let yv;

// function animateEnemy(){
//     //Setting up the interval
//     setInterval(animateEnemy, 1000/ FPS);
//     //random ball starting speed
//     xv = Math.floor(Math.random()  * 26 + 100 / FPS);
//     yv = Math.floor(Math.random() * 26 + 100 / FPS);
//     enemy.x +=xv;
//     emeny.y +=yv;
 
// }

let container = {x:0,y:0,width:750,height:750};

let circlesEasy = [
    {x:300,y:300,r:25,color:'red',vx:6,vy:10},
    {x:200,y:600,r:25,color:'yellow',vx:2,vy:-10},
    {x:600,y:400,r:25,color:'pink',vx:6,vy:-7}
]
let circlesMedium = [
    {x:300,y:300,r:25,color:'red',vx:6,vy:10},
    {x:200,y:600,r:30,color:'yellow',vx:2,vy:-10},
    {x:600,y:400,r:25,color:'pink',vx:6,vy:-7},
    {x:300,y:600,r:25,color:'red',vx:-2,vy:7},
    {x:500,y:250,r:30,color:'yellow',vx:6,vy:7}
]
let circlesHard = [
    {x:300,y:300,r:25,color:'red',vx:6,vy:10},
    {x:200,y:600,r:30,color:'yellow',vx:2,vy:-10},
    {x:600,y:400,r:25,color:'pink',vx:6,vy:-7},
    {x:300,y:600,r:25,color:'red',vx:-2,vy:7},
    {x:500,y:250,r:30,color:'yellow',vx:6,vy:7},
    {x:400,y:550,r:25,color:'pink',vx:-6,vy:7},
    {x:150,y:250,r:30,color:'red',vx:9,vy:3}   
]

function randomEnemies(){
    let difficulty = document.getElementById('difficulty').value;
    draw(); 
        for (let i = 0; i<3; i++){
            ctx.fillStyle = circlesEasy[i].color;
            ctx.beginPath();
            ctx.arc(circlesEasy[i].x,circlesEasy[i].y,circlesEasy[i].r,0,2*Math.PI)
            ctx.fill();
            
            if ((circlesEasy[i].x + circlesEasy[i].vx + circlesEasy[i].r > container.width) || (circlesEasy[i].x - circlesEasy[i].r + circlesEasy[i].vx < container.x)){
                circlesEasy[i].vx =- circlesEasy[i].vx
            }
            if ((circlesEasy[i].y + circlesEasy[i].vy + circlesEasy[i].r > container.height) || (circlesEasy[i].y - circlesEasy[i].r + circlesEasy[i].vy < container.y)){
                circlesEasy[i].vy =- circlesEasy[i].vy
            }
            circlesEasy[i].x += circlesEasy[i].vx;
            circlesEasy[i].y += circlesEasy[i].vy;
        }
            requestAnimationFrame(randomEnemies);
    }




// function randomEnemies(){
//     let difficulty = document.getElementById('difficulty').value;
//     if (difficulty == 'easy'){
//         for (let i = 0; i<3; i++){
//             ctx.fillStyle = circlesEasy[i].color;
//             ctx.beginPath();
//             ctx.arc(circlesEasy[i].x,circlesEasy[i].y,circlesEasy[i].r,0,2*Math.PI)
//             ctx.fill();
            
//             if ((circlesEasy[i].x + circlesEasy[i].vx + circlesEasy[i].r > container.width) || (circlesEasy[i].x - circlesEasy[i].r + circlesEasy[i].vx < container.x)){
//                 circlesEasy[i].vx =- circlesEasy[i].vx
//             }
//             if ((circlesEasy[i].y + circlesEasy[i].vy + circlesEasy[i].r > container.height) || (circlesEasy[i].y - circlesEasy[i].r + circlesEasy[i].vy < container.y)){
//                 circlesEasy[i].vy =- circlesEasy[i].vy
//             }
//             circlesEasy[i].x += circlesEasy[i].vx;
//             circlesEasy[i].y += circlesEasy[i].vy;
//         }
//     }
//     if (difficulty == 'medium'){
//         for (let i = 0; i<5; i++){
//             randomXY();
//             randomColor()
//             ctx.beginPath();
//             ctx.fillStyle = color;
//             ctx.arc(enemy.x, enemy.y, 25, 0, 2 * Math.PI)
//             ctx.fill();
//         }
//     }
//     if (difficulty == 'hard'){
//         for (let i = 0; i<7; i++){
//             randomXY();
//             randomColor()
//             ctx.beginPath();
//             ctx.fillStyle = color;
//             ctx.arc(enemy.x, enemy.y, 25, 0, 2 * Math.PI)
//             ctx.fill();
//         }
//     }
// }
