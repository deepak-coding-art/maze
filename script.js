const canvas = document.getElementById("maze");
const context = canvas.getContext("2d");
const textureTiles = document.getElementById("texture-tile");
const gameOverScreen = document.getElementById("gameOver");
const gameWinScreen = document.getElementById("gameWin");
const helpMessage = document.getElementById("help-message");
const zombieMail = document.getElementById("zombie-male");
const boy = document.getElementById("boy");
const boyDead = document.getElementById("boy-dead");
const houseSprite = document.getElementById("house");
const loadingScreen = document.getElementById("loadingScreen");
const dpr = window.devicePixelRatio || 1;
canvas.width = canvas.clientWidth * dpr;
canvas.height = canvas.clientHeight * dpr;

let notHelped = true;
let gameOver = false;

// Draw maze
const maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
  [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const mazeWidth = maze[0].length;
const mazeHeight = maze.length;
const cellWidth = canvas.width / mazeWidth;
const cellHeight = canvas.height / mazeHeight;

function drawMaze() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < mazeHeight; y++) {
    for (let x = 0; x < mazeWidth; x++) {
      if (maze[y][x] === 1) {
        context.drawImage(
          textureTiles,
          x * cellWidth,
          y * cellHeight,
          cellWidth,
          cellHeight
        );
      }
    }
  }
}

// Add obstacles
const defaultObstacles = [
  { x: 13, y: 3 },
  { x: 13, y: 11 },
  { x: 7, y: 5 },
  { x: 1, y: 4 },
  { x: 11, y: 14 },
  { x: 5, y: 14 },
];
let obstacles = [...defaultObstacles];

function drawObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    context.fillStyle = "red";
    context.drawImage(
      houseSprite,
      obstacle.x * cellWidth,
      obstacle.y * cellHeight,
      cellWidth,
      cellHeight
    );
  }
}

function drawAll() {
  drawMaze();
  drawObstacles();
  drawCharacter();
}

// Add character
let character = { x: 1, y: 1 };

function drawCharacter() {
  context.fillStyle = "green";
  context.drawImage(
    boy,
    character.x * cellWidth,
    character.y * cellHeight,
    cellWidth,
    cellHeight
  );
}

function drawCharacterDead() {
  context.fillStyle = "green";
  context.drawImage(
    boyDead,
    character.x * cellWidth,
    character.y * cellHeight,
    cellWidth,
    cellHeight
  );
}

function showHelp() {
  gameOver = true;
  gameOverScreen.classList.remove("hide");
}

function checkAttack() {
  console.log(character.x, character.y);
  if (notHelped) {
    if (character.x === 14 && character.y === 3) {
      console.log("trigger");
      obstacles[0].x = 14;
      drawMaze();
      drawCharacterDead();
      drawObstacles();
      showHelp();
    }
  }
}

function checkEnter() {
  if (character.x === home.x && character.y === home.y) {
    gameWinScreen.classList.remove("hide");
  }
}

function winPopup() {
  gameWinScreen.classList.remove("hide");
}

function checkPosition() {
  let removeIndex;
  obstacles.forEach((obstacle, index) => {
    if (obstacle.x === character.x && obstacle.y === character.y) {
      removeIndex = index;
    }
  });
  if (removeIndex >= 0) {
    if (notHelped) {
      obstacles.splice(removeIndex, 1);
      drawAll();
      if (obstacles.length < 4) {
        showHelp();
      }
    } else {
      winPopup();
    }
  }
}

// Move character with arrow keys
document.addEventListener("keydown", (event) => {
  if (gameOver) {
    return;
  }
  switch (event.key) {
    case "ArrowUp":
      if (maze[character.y - 1][character.x] === 0) {
        character.y--;
        drawAll();
      }
      break;
    case "ArrowDown":
      if (
        character.y < mazeHeight - 1 &&
        maze[character.y + 1][character.x] === 0
      ) {
        character.y++;
        drawAll();
      }
      break;
    case "ArrowLeft":
      if (character.x > 0 && maze[character.y][character.x - 1] === 0) {
        character.x--;
        drawAll();
      }
      break;
    case "ArrowRight":
      if (
        character.x < mazeWidth - 1 &&
        maze[character.y][character.x + 1] === 0
      ) {
        character.x++;
        drawAll();
      }
      break;
  }

  checkPosition();
});

document.getElementById("up-key").addEventListener("click", () => {
  if (gameOver) {
    return;
  }
  if (maze[character.y - 1][character.x] === 0) {
    character.y--;
    drawAll();
  }
  checkPosition();
});

document.getElementById("left-key").addEventListener("click", () => {
  if (gameOver) {
    return;
  }
  if (character.x > 0 && maze[character.y][character.x - 1] === 0) {
    character.x--;
    drawAll();
  }
  checkPosition();
});

document.getElementById("right-key").addEventListener("click", () => {
  if (gameOver) {
    return;
  }
  if (character.x < mazeWidth - 1 && maze[character.y][character.x + 1] === 0) {
    character.x++;
    drawAll();
  }
  checkPosition();
});

document.getElementById("down-key").addEventListener("click", () => {
  if (gameOver) {
    return;
  }
  if (
    character.y < mazeHeight - 1 &&
    maze[character.y + 1][character.x] === 0
  ) {
    character.y++;
    drawAll();
  }
  checkPosition();
});

function getHelp() {
  gameOverScreen.classList.add("hide");
  notHelped = false;
  gameOver = false;
  obstacles = [{ x: 14, y: 14 }];
  drawAll();
  helpMessage.classList.remove("hide");
}

window.addEventListener("load", () => {
  loadingScreen.classList.add("hide");
  drawAll();
});
