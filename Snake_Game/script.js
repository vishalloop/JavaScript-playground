gameBox = document.querySelector(".game-box");
score = document.querySelector("#score");
highScore = document.querySelector("#high-score");
highScore.innerText = localStorage.getItem("HighScore") || 0;
time = document.querySelector("#time");
let startBtn = document.querySelector("#start");
let restartBtn = document.querySelector("#over");
let modals = document.querySelector(".modals");
let startGame = document.querySelector(".start-game");
let gameOver = document.querySelector(".game-over");
let timerInterval = null;
let totalSeconds = 0;
let blocks = [];
let  snake = [{x : 0, y : 0}];
let direction  = "down";
let intervalId = null;
score.innerHTML = Number(0);
let checking = null;

let rows = Math.floor(gameBox.clientHeight / 60);
let cols = Math.floor(gameBox.clientWidth / 60);

let food = {
    x : Math.floor(Math.random() * rows),
    y : Math.floor(Math.random() * cols),
};

for(let i = 0; i<rows ; i++){
    for(let j=0; j<cols; j++) {
        let box = document.createElement("div");
        box.classList.add("box");
        gameBox.appendChild(box);
        blocks[`${i} - ${j}`] = box;
    }
};
 
function render() {

    let head = null;

    // food generation 

    if(blocks[`${food.x} - ${food.y}`] === blocks[`0 - 0`]){
        food = {
            x : Math.floor(Math.random() * rows),
            y : Math.floor(Math.random() * cols),
    };

    blocks[`${food.x} - ${food.y}`].classList.add("food");
    }else{
        blocks[`${food.x} - ${food.y}`].classList.add("food");
    } ;

    // snake movement 

    if(direction === "down") {
        head = { x : snake[0].x + 1 , y : snake[0].y};
    }else if(direction === "up") {
        head = { x : snake[0].x - 1 , y : snake[0].y};
    }else if(direction === "right") {
        head = { x : snake[0].x , y : snake[0].y + 1};
    }else if(direction === "left") {
        head = { x : snake[0].x , y : snake[0].y - 1};
    }

    // snake collision with boundaries 

    if(head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols){
        clearInterval(intervalId);
        checking = true;
        showGameOver();
        return;
    }

    // snake removing classes 

    snake.forEach((segment) => {
        const block = blocks[`${segment.x} - ${segment.y}`];
        block.classList.remove("fill");
        block.classList.remove("head");
    });


    // Add new head
    snake.unshift(head);

    // Check if food eaten
    if (head.x === food.x && head.y === food.y) {
    blocks[`${food.x} - ${food.y}`].classList.remove("food");
    score.innerHTML = Number(score.innerHTML) + 10;


    food = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * cols),
    };

    blocks[`${food.x} - ${food.y}`].classList.add("food");

    } else {
    // Only remove tail if no food eaten
    snake.pop();
    }


    // snake adding classes 

    snake.forEach((segment, index) => {
    const block = blocks[`${segment.x} - ${segment.y}`];

        if (index === 0) {
            block.classList.add("head");
        } else {
            block.classList.add("fill");
        }
    });

    // snake food eating logic 

    // snake collision logic with it's own

    const hasDuplicate = snake.slice(1).some(segment =>
    segment.x === head.x && segment.y === head.y
    );

    if (hasDuplicate) {
        clearInterval(intervalId);
        checking = true;
        showGameOver();
        return;
    }
    
}

function startTimer() {
    timerInterval = setInterval(() => {
        totalSeconds++;

        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        time.innerText =
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0");

    }, 1000);
}


function showGameOver() {

    let currentScore = Number(score.innerHTML);
    let savedHighScore = Number(localStorage.getItem("HighScore")) || 0;

    if (currentScore > savedHighScore) {
        localStorage.setItem("HighScore", currentScore);
        highScore.innerText = currentScore;
    }

    modals.classList.remove("none");
    startGame.classList.add("none");
    gameOver.classList.add("block");
    clearInterval(timerInterval);

};


document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowUp" && direction !== "down") {
        direction = "up";
    }

    else if (event.key === "ArrowDown" && direction !== "up") {
        direction = "down";
    }

    else if (event.key === "ArrowRight" && direction !== "left") {
        direction = "right";
    }

    else if (event.key === "ArrowLeft" && direction !== "right") {
        direction = "left";
    }

});

function run() {
intervalId = setInterval(() => {
    render();
}, 300);
};

startBtn.addEventListener("click" , function(){
    modals.classList.add("none");
    startTimer();
    run();
});




function resetGame() {

    // Stop game loop
    clearInterval(intervalId);

    // Reset basic state
    snake = [{ x: 0, y: 0 }];
    direction = "down";
    checking = false;

    // Reset score
    score.innerHTML = 0;

    // Remove all snake & food classes
    Object.values(blocks).forEach(block => {
        block.classList.remove("fill");
        block.classList.remove("head");
        block.classList.remove("food");
    });

    // Generate new food
    food = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * cols),
    };

    blocks[`${food.x} - ${food.y}`].classList.add("food");

    // Hide modal
    modals.classList.add("none");
    gameOver.classList.remove("block");

    clearInterval(timerInterval);
    totalSeconds = 0;
    time.innerText = "00:00";

}



restartBtn.addEventListener("click" , function() {
    resetGame();
    startTimer();
    run();
});