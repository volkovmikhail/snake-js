//config variables
let snakeSize = 25;
let snakeColor = 'olive';
let fruitColor = 'red';
let delay = 100;

let canv = document.getElementById('canvas');
let ctx = canv.getContext('2d');

// canv.width = Math.floor(window.innerWidth / snakeSize) * snakeSize;
// canv.height = Math.floor(window.innerHeight / snakeSize) * snakeSize;

canv.width = 25 * snakeSize;
canv.height = 25 * snakeSize;

const bgColor = window
  .getComputedStyle(document.body, null)
  .getPropertyValue('background-color');

Snake = [];
let Fruit;

let direction = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};

const toggleDirection = (d) => {
  for (const key in direction) {
    direction[key] = key === d;
  }
};

class Chunk {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  Draw() {
    ctx.fillRect(this.x, this.y, snakeSize, snakeSize);
  }
}

function drawSnake() {
  clear();
  ctx.fillStyle = snakeColor;
  for (let i = 0; i < Snake.length; i++) {
    Snake[i].Draw();
  }
}

function clear() {
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canv.width, canv.height);
}

let prevKey;

window.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowUp' && prevKey != 'ArrowDown' && e.code != prevKey) {
    toggleDirection(e.code);
  }
  if (e.code === 'ArrowDown' && prevKey != 'ArrowUp' && e.code != prevKey) {
    toggleDirection(e.code);
  }
  if (e.code === 'ArrowRight' && prevKey != 'ArrowLeft' && e.code != prevKey) {
    toggleDirection(e.code);
  }
  if (e.code === 'ArrowLeft' && prevKey != 'ArrowRight' && e.code != prevKey) {
    toggleDirection(e.code);
  }

  prevKey = e.code;
});

function drawNewFruit() {
  Fruit.x = Math.round(
    Math.floor((Math.random() * canv.width) / snakeSize) * snakeSize
  );
  Fruit.y = Math.round(
    Math.floor((Math.random() * canv.height) / snakeSize) * snakeSize
  );
  ctx.fillRect(Fruit.x, Fruit.y, snakeSize, snakeSize);
}

Snake.push(new Chunk(25, 25));
Fruit = new Chunk(0, 0);

let head = Snake[Snake.length - 1];

function snakeEatFruit() {
  Snake.push(new Chunk(newHead.x, newHead.y));
  drawNewFruit();
  addScore();
}

function main() {
  head = Snake[Snake.length - 1];

  if (direction.ArrowUp) {
    Snake.push(new Chunk(head.x, head.y - snakeSize));
    Snake.splice(0, 1);
  }

  if (direction.ArrowDown) {
    Snake.push(new Chunk(head.x, head.y + snakeSize));
    Snake.splice(0, 1);
  }

  if (direction.ArrowRight) {
    Snake.push(new Chunk(head.x + snakeSize, head.y));
    Snake.splice(0, 1);
  }

  if (direction.ArrowLeft) {
    Snake.push(new Chunk(head.x - snakeSize, head.y));
    Snake.splice(0, 1);
  }

  newHead = Snake[Snake.length - 1];

  if (newHead.x === Fruit.x && newHead.y === Fruit.y) {
    snakeEatFruit();
  }

  if (newHead.x >= canv.width) newHead.x = 0;
  if (newHead.y >= canv.height) newHead.y = 0;
  if (newHead.x < 0) newHead.x = canv.width;
  if (newHead.y < 0) newHead.y = canv.height;

  for (let i = 0; i < Snake.length - 2; i++) {
    if (Snake[i].x === newHead.x && Snake[i].y === newHead.y) {
      Snake = [new Chunk(1, 1)]; //move this to game over function
      gameOver();
    }
  }

  drawSnake();
  ctx.fillStyle = fruitColor;
  Fruit.Draw();

  addTime();
}

ctx.fillStyle = fruitColor;
drawNewFruit();
const interval = setInterval(main, delay);

function gameOver() {
  clearInterval(interval);
}

function addScore() {
  const scoreElem = document.querySelector('#score');

  scoreElem.innerHTML = Number(scoreElem.innerHTML) + 1;
}

const initialTime = new Date().getTime();

function addTime() {
  const time = new Date().getTime();

  const gameTime = time - initialTime;

  const timeElem = document.querySelector('#time');

  const sec = Math.round(gameTime / 1000); //because .getTime() its milliseconds

  const mins = Math.floor(sec / 60);

  const secsInMinute = sec - mins * 60;

  const displaySecs = secsInMinute < 10 ? `0${secsInMinute}` : secsInMinute;
  const displayMins = mins < 10 ? `0${mins}` : mins;

  timeElem.innerHTML = `${displayMins}:${displaySecs}`;
}
