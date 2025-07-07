const GOAL_CANS = 25;
let currentCans = 0;
let gameActive = false;
let spawnInterval;
let timeLeft = 30;
let timerInterval;

// Create the 3x3 game grid
function createGrid() {
  const grid = document.querySelector('.game-grid');
  grid.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    grid.appendChild(cell);
  }
}

// Show a can in a random cell
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
    can.parentElement.innerHTML = '';

    if (currentCans >= GOAL_CANS) {
      endGame(true);
    }
  });

  wrapper.appendChild(can);
  randomCell.appendChild(wrapper);
}

// Timer countdown
function updateTimer() {
  document.getElementById('timer').textContent = timeLeft;
  timeLeft--;
  if (timeLeft < 0) {
    endGame(false);
  }
}

// Start game logic
function startGame() {
  if (gameActive) return;
  gameActive = true;
  currentCans = 0;
  timeLeft = 30;
  document.getElementById('current-cans').textContent = '0';
  document.getElementById('timer').textContent = '30';
  document.getElementById('achievements').textContent = '';
  createGrid();
  spawnInterval = setInterval(spawnWaterCan, 1000);
  timerInterval = setInterval(updateTimer, 1000);
}

// End game logic
function endGame(won) {
  gameActive = false;
  clearInterval(spawnInterval);
  clearInterval(timerInterval);

  const message = won
    ? '🎉 You win! You collected enough water!'
    : '💧 Time\'s up! Try again!';
  document.getElementById('achievements').textContent = message;
}

// Button listener
document.getElementById('start-game').addEventListener('click', startGame);

// Create the grid on page load
createGrid();
