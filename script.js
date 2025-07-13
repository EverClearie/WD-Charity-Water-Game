// Game configuration and state variables
const GOAL_CANS = 20;
let currentCans = 0;
let gameActive = false;
let spawnInterval;
let timerInterval;
let timeLeft = 30;

// Sound effects
const collectSound = new Audio('sounds/collect.mp3');
const winSound = new Audio('sounds/win.mp3');
const loseSound = new Audio('sounds/lose.mp3');

// Milestone messages
const milestoneMessages = {
  5: "Nice start! 5 cans!",
  10: "Halfway there!",
  15: "You're crushing it!",
  20: "Final push! Don't stop now!"
};

// Winning/losing messages
const winMessages = [
  "Great job! You made a difference!",
  "You're a water hero!",
  "Hydration secured! Well done!"
];
const loseMessages = [
  "So close! Try again!",
  "Don't give up yet!",
  "Keep practicing, you're getting there!"
];

// Create 3x3 grid
function createGrid() {
  const grid = document.querySelector('.game-grid');
  grid.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    grid.appendChild(cell);
  }
}

createGrid();

// Spawn a new water can
function spawnWaterCan() {
  if (!gameActive) return;
  const cells = document.querySelectorAll('.grid-cell');
  cells.forEach(cell => (cell.innerHTML = ''));

  const randomCell = cells[Math.floor(Math.random() * cells.length)];
  const wrapper = document.createElement('div');
  wrapper.className = 'water-can-wrapper';

  const can = document.createElement('div');
  can.className = 'water-can';

  can.addEventListener('click', () => {
    if (!gameActive) return;
    currentCans++;
    document.getElementById('current-cans').textContent = currentCans;
    collectSound.currentTime = 0;
    collectSound.play();

    // Milestone check
    if (milestoneMessages[currentCans]) {
      document.getElementById('achievements').textContent = milestoneMessages[currentCans];
    }

    // Goal check
    if (currentCans >= GOAL_CANS) {
      endGame(true);
    }
  });

  wrapper.appendChild(can);
  randomCell.appendChild(wrapper);
}

// Start game
function startGame() {
  if (gameActive) return;
  gameActive = true;
  currentCans = 0;
  timeLeft = 30;
  document.getElementById('current-cans').textContent = currentCans;
  document.getElementById('timer').textContent = timeLeft;
  document.getElementById('achievements').textContent = '';
  createGrid();
  spawnInterval = setInterval(spawnWaterCan, 1000);

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = timeLeft;
    if (timeLeft <= 0) {
      endGame(currentCans >= GOAL_CANS);
    }
  }, 1000);
}

// End game
function endGame(won) {
  gameActive = false;
  clearInterval(spawnInterval);
  clearInterval(timerInterval);

  const msgEl = document.getElementById('achievements');
  const messagePool = won ? winMessages : loseMessages;
  const sound = won ? winSound : loseSound;

  msgEl.textContent = messagePool[Math.floor(Math.random() * messagePool.length)];
  sound.play();
}

// Start button
document.getElementById('start-game').addEventListener('click', startGame);
