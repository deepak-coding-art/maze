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
let obstacles = [
  { x: 13, y: 3, id: "attacker" },
  { x: 13, y: 11 },
  { x: 3, y: 10 },
  { x: 7, y: 2 },
  { x: 7, y: 7 },
  // { x: 4, y: 4 },
  // { x: 3, y: 5 },
];

function drawObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    context.fillStyle = "red";
    context.drawImage(
      zombieMail,
      obstacle.x * cellWidth,
      obstacle.y * cellHeight,
      cellWidth,
      cellHeight
    );
  }
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

// Add home
const home = { x: mazeWidth - 2, y: mazeHeight - 2 };

function drawHome() {
  context.fillStyle = "blue";
  context.drawImage(
    houseSprite,
    home.x * cellWidth,
    home.y * cellHeight,
    cellWidth,
    cellHeight
  );
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
      drawHome();
      gameOver = true;
      gameOverScreen.classList.remove("hide");
    }
  }
}

function winPopup() {
  if (character.x === home.x && character.y === home.y) {
    gameWinScreen.classList.remove("hide");
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
        drawMaze();
        drawObstacles();
        drawCharacter();
        drawHome();
      }
      break;
    case "ArrowDown":
      if (
        character.y < mazeHeight - 1 &&
        maze[character.y + 1][character.x] === 0
      ) {
        character.y++;
        drawMaze();
        drawObstacles();
        drawCharacter();
        drawHome();
      }
      break;
    case "ArrowLeft":
      if (character.x > 0 && maze[character.y][character.x - 1] === 0) {
        character.x--;
        drawMaze();
        drawObstacles();
        drawCharacter();
        drawHome();
      }
      break;
    case "ArrowRight":
      if (
        character.x < mazeWidth - 1 &&
        maze[character.y][character.x + 1] === 0
      ) {
        character.x++;
        drawMaze();
        drawObstacles();
        drawCharacter();
        drawHome();
      }
      break;
  }

  // Check if character has reached home

  winPopup();
  checkAttack();
});

document.getElementById("up-key").addEventListener("click", () => {
  if (gameOver) {
    return;
  }
  if (maze[character.y - 1][character.x] === 0) {
    character.y--;
    drawMaze();
    drawObstacles();
    drawCharacter();
    drawHome();
  }
  checkAttack();
  winPopup();
});

document.getElementById("left-key").addEventListener("click", () => {
  if (gameOver) {
    return;
  }
  if (character.x > 0 && maze[character.y][character.x - 1] === 0) {
    character.x--;
    drawMaze();
    drawObstacles();
    drawCharacter();
    drawHome();
  }
  checkAttack();
  winPopup();
});

document.getElementById("right-key").addEventListener("click", () => {
  if (gameOver) {
    return;
  }
  if (character.x < mazeWidth - 1 && maze[character.y][character.x + 1] === 0) {
    character.x++;
    drawMaze();
    drawObstacles();
    drawCharacter();
    drawHome();
  }
  checkAttack();
  winPopup();
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
    drawMaze();
    drawObstacles();
    drawCharacter();
    drawHome();
  }
  checkAttack();
  winPopup();
});

function getHelp() {
  gameOverScreen.classList.add("hide");
  notHelped = false;
  gameOver = false;
  character = { x: 1, y: 1 };
  obstacles = [
    { x: 13, y: 3, id: "attacker" },
    { x: 13, y: 11 },
    { x: 3, y: 10 },
    { x: 7, y: 2 },
    { x: 7, y: 7 },
    // { x: 4, y: 4 },
    // { x: 3, y: 5 },
  ];
  drawMaze();
  drawObstacles();
  drawCharacter();
  drawHome();
  helpMessage.classList.remove("hide");
}

window.addEventListener("load", () => {
  loadingScreen.classList.add("hide");
  drawMaze();
  drawCharacter();
  drawHome();
  drawObstacles();
});
