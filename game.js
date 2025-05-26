// ================= Основной код ==================== //
let field = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;
let score = 0;
const winCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонтальные
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикальные
  [0, 4, 8], [2, 4, 6] // Диагональные
];

// Элементы интерфейса
const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const scoreElement = document.querySelector('.score');
const resetBtn = document.querySelector('.reset-btn');

// Инициализация игры
function initGame() {
  cells.forEach((cell, index) => {
    cell.textContent = "";
    cell.style.backgroundColor = "";
  });
  field = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  message.textContent = "";
}

// Обработка хода игрока
function handlePlayerMove(index) {
  if (!gameOver && field[index] === "") {
    field[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
      gameOver = true;
      if (currentPlayer === "X") {
        score++;
        scoreElement.textContent = `счет: ${score}`;
      }
      message.textContent = `Победил ${currentPlayer}!`;
      highlightWinCombination();
      return;
    }

    if (checkDraw()) {
      gameOver = true;
      message.textContent = "Ничья!";
      return;
    }

    currentPlayer = "Z";
    setTimeout(computerMove, 500);
  }
}

// Ход компьютера
function computerMove() {
  const emptyCells = field
    .map((cell, index) => cell === "" ? index : null)
    .filter(cell => cell !== null);

  if (emptyCells.length > 0) {
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    field[randomIndex] = "Z";
    cells[randomIndex].textContent = "Z";

    if (checkWin("Z")) {
      gameOver = true;
      message.textContent = "Компьютер победил!";
      highlightWinCombination();
      return;
    }

    if (checkDraw()) {
      gameOver = true;
      message.textContent = "Ничья!";
      return;
    }

    currentPlayer = "X";
  }
}

// Проверка победы
function checkWin(player) {
  return winCombinations.some(combination =>
    combination.every(index => field[index] === player)
  );
}

// Проверка ничьи
function checkDraw() {
  return field.every(cell => cell !== "");
}

// Подсветка выигрышной комбинации
function highlightWinCombination() {
  winCombinations.forEach(combination => {
    if (combination.every(index => field[index] === currentPlayer)) {
      combination.forEach(index => {
        cells[index].style.backgroundColor = "#4CAF50";
      });
    }
  });
}

// Обработчики событий
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handlePlayerMove(index));
});

resetBtn.addEventListener('click', () => {
  initGame();
});

// Начало игры
initGame();
