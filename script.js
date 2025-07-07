// Game configuration and state variables
const GOAL_CANS = 25; // Target score to win
let currentCans = 0;
let timeLeft = 30;
let gameActive = false;
let spawnInterval;
let timerInterval;

// DOM Elements
const scoreDisplay = document.getElementById('current-cans');
const timerDisplay = document.getElementById('timer');
const achievementDisplay = document.getElementById('achievements');
const startButton = document.getElementById('start-game');

// Message arrays
const winMessages = [
  "You're a clean water hero! 💧",
  "Amazing! Lives changed today. 🌍",
  "Victory! Access granted. 🏆"
];

const loseMessages = [
  "Almost there! Try again! 😅",
  "Don't give up — water needs you! 💪",
  "So close! Give it another go. 🔁"
];

// Creates the 3x3 game grid
function createGrid() {
  const grid = document.querySelector('.game-grid');
  grid.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    grid.appendChild(cell);
  }
}

// Spawns a water can in a random grid cell
function spawnWaterCan() {
  if (!gameActive) return;

  const cells = document.querySelectorAll('.grid-cell');
  cells.forEach(cell => (cell.innerHTML = '')); // Clear all

  const randomCell = cells[Math.floor(Math.random() * cells.length)];
  const wrapper = document.createElement('div');
  wrapper.className = 'water-can-wrapper';

  const can = document.createElement('div');
  can.className = 'water-can';

  // Click handler for scoring
  can.addEventListener('click', () => {
    if (!gameActive) return;
    currentCans++;
    scoreDisplay.textContent = currentCans;
    wrapper.innerHTML = ''; // Remove can on click
  });

  wrapper.appendChild(can);
  randomCell.appendChild(wrapper);
}

// Starts the game
function startGame() {
  if (gameActive) return;

  // Reset state
  gameActive = true;
  currentCans = 0;
  timeLeft = 30;
  scoreDisplay.textContent = currentCans;
  timerDisplay.textContent = timeLeft;
  achievementDisplay.textContent = '';
  createGrid();

  spawnInterval = setInterval(spawnWaterCan, 1000);
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// Ends the game
function endGame() {
  gameActive = false;
  clearInterval(spawnInterval);
  clearInterval(timerInterval);

  // Clear any remaining cans
  const cells = document.querySelectorAll('.grid-cell');
  cells.forEach(cell => (cell.innerHTML = ''));

  // Pick message based on score
  const message =
    currentCans >= GOAL_CANS
      ? winMessages[Math.floor(Math.random() * winMessages.length)]
      : loseMessages[Math.floor(Math.random() * loseMessages.length)];

  achievementDisplay.textContent = message;
}

// Start button click listener
startButton.addEventListener('click', startGame);

// Create the grid on page load
createGrid();
