import { update as updateSnake, draw as drawSnake, Snake_Speed, getSnakeHead, snakeIntersection } from './snake.js';
import { update as updateFood, draw as drawFood} from './food.js'
import { outsideGrid } from './grid.js'
/* Gameloop is a function  which repeats itself over and over again on a set interval that way we can constantly update our render */
let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
    if(gameOver) {
        if(confirm('You lost. Press OK to restart.')) {
            window.location = '/SnakeGame';
        }
        return;
    }

    window.requestAnimationFrame(main)
    const secondsSinceRender = (currentTime - lastRenderTime)/1000;
    if(secondsSinceRender < 1 / Snake_Speed) return
    

    lastRenderTime = currentTime;

    update();
    draw();
}

window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
    checkDeath();
}

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}

