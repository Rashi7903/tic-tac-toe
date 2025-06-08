const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const restartButton = document.getElementById('restart');

const xScoreEl = document.getElementById('x-score');
const oScoreEl = document.getElementById('o-score');

const startGameButton = document.getElementById('startGame');
const nameInputArea = document.getElementById('nameInput');
const gameArea = document.getElementById('gameArea');
const playerXInput = document.getElementById('playerXName');
const playerOInput = document.getElementById('playerOName');

let currentPlayer = 'X';
let gameActive = true;
let xScore = 0;
let oScore = 0;

let playerXName = 'Player X';
let playerOName = 'Player O';

// Start Game with custom names
startGameButton.addEventListener('click', () => {
    playerXName = playerXInput.value.trim() || 'Player X';
    playerOName = playerOInput.value.trim() || 'Player O';

    nameInputArea.style.display = 'none';
    gameArea.style.display = 'block';

    status.textContent = `${playerXName}'s (X) turn`;
});

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (cell.textContent !== '' || !gameActive) return;

    cell.textContent = currentPlayer;
    cell.classList.add('played');

    if (checkWin()) {
        const winnerName = currentPlayer === 'X' ? playerXName : playerOName;
        status.textContent = `🎉 ${winnerName} wins! 🎉`;
        highlightWinningCells();
        updateScore();
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        status.textContent = "It's a draw! 🤝";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    const nextPlayerName = currentPlayer === 'X' ? playerXName : playerOName;
    status.textContent = `${nextPlayerName}'s (${currentPlayer}) turn`;
}

function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return (
            cells[a].textContent === currentPlayer &&
            cells[b].textContent === currentPlayer &&
            cells[c].textContent === currentPlayer
        );
    });
}

function checkDraw() {
    return [...cells].every(cell => cell.textContent !== '');
}

function updateScore() {
    if (currentPlayer === 'X') {
        xScore++;
        xScoreEl.textContent = xScore;
    } else {
        oScore++;
        oScoreEl.textContent = oScore;
    }
}

function highlightWinningCells() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    winConditions.forEach(condition => {
        const [a, b, c] = condition;
        if (
            cells[a].textContent === currentPlayer &&
            cells[b].textContent === currentPlayer &&
            cells[c].textContent === currentPlayer
        ) {
            cells[a].classList.add('win');
            cells[b].classList.add('win');
            cells[c].classList.add('win');
        }
    });
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('played', 'win');
    });
    currentPlayer = 'X';
    gameActive = true;
    status.textContent = `${playerXName}'s (X) turn`;
}

restartButton.addEventListener('click', restartGame);
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
