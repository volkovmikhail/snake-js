
let canv = document.getElementById("canvas");
let ctx = canv.getContext('2d');

const snakeSize = 25; //snake size

canv.width = Math.floor(window.innerWidth / snakeSize) * snakeSize;
canv.height = Math.floor(window.innerHeight / snakeSize) * snakeSize;

const bgColor = window.getComputedStyle(document.body,null).getPropertyValue('background-color');

const snakeColor = "olive"; 

const fruitColor = "red";

const delay = 100;

//////////////////////////////////////////////

Snake = [];
let Fruit;

let direction = {
    up: false,
    down: false,
    right: false,
    left: false
};

direction.right = true;

class Chank{

    constructor(x,y){
       this.x = x;
       this.y = y; 
    }

    Draw(){
        ctx.fillRect(this.x,this.y,snakeSize,snakeSize);
    }

}

function drawSnake(){
    clear();
    ctx.fillStyle = snakeColor;
    for(let i = 0; i<Snake.length; i++){
        Snake[i].Draw();
    }
}

function clear(){
    ctx.fillStyle = bgColor;
    ctx.fillRect(0,0,canv.width,canv.height);
}

let prevKey;

window.addEventListener('keydown',(e)=>{

    if(e.code === "ArrowUp" && prevKey != "ArrowDown" && e.code != prevKey) {
        direction.up = true;
        direction.down = false;
        direction.right = false;
        direction.left = false;
    }
    if(e.code === "ArrowDown" && prevKey != "ArrowUp" && e.code != prevKey){
        direction.up = false;
        direction.down = true;
        direction.right = false;
        direction.left = false;
    } 
    if(e.code === "ArrowRight" && prevKey != "ArrowLeft" && e.code != prevKey) {
        direction.up = false;
        direction.down = false;
        direction.right = true;
        direction.left = false;
    }
    if(e.code === "ArrowLeft"&& prevKey != "ArrowRight" && e.code != prevKey){
        direction.up = false;
        direction.down = false;
        direction.right = false;
        direction.left = true;
    }

    prevKey = e.code;

});

function drawNewFruit(){
    Fruit.x = Math.round(Math.floor(Math.random() * canv.width / snakeSize) * snakeSize);
    Fruit.y = Math.round(Math.floor(Math.random() * canv.height / snakeSize) * snakeSize);
    ctx.fillRect(Fruit.x,Fruit.y,snakeSize,snakeSize);
}

Snake.push(new Chank(25,25));
Fruit = new Chank(0,0);

let head = Snake[Snake.length-1];

function main(){

    head = Snake[Snake.length-1];

    if(direction.up){
        Snake.push(new Chank(head.x,head.y - snakeSize));
        Snake.splice(0,1);
    }

    if(direction.down){
        Snake.push(new Chank(head.x,head.y + snakeSize));
        Snake.splice(0,1);
    }

    if(direction.right){
        Snake.push(new Chank(head.x + snakeSize,head.y));
        Snake.splice(0,1);
    }

    if(direction.left){
        Snake.push(new Chank(head.x - snakeSize,head.y));
        Snake.splice(0,1);
    }

    newHead = Snake[Snake.length-1];

    if(newHead.x === Fruit.x && newHead.y === Fruit.y){
        Snake.push(new Chank(newHead.x,newHead.y));
        drawNewFruit();
    }

    if(newHead.x >= canv.width)newHead.x = 0;
    if(newHead.y >= canv.height)newHead.y = 0;
    if(newHead.x < 0)newHead.x = canv.width;
    if(newHead.y < 0)newHead.y = canv.height;

    for(let i = 0; i < Snake.length-2; i++){
        if(Snake[i].x === newHead.x && Snake[i].y === newHead.y){
            Snake = [new Chank(0,0)];
        }
    }

    drawSnake();
    ctx.fillStyle = fruitColor;
    Fruit.Draw();
}

ctx.fillStyle = fruitColor;
drawNewFruit();
setInterval(main,delay);
