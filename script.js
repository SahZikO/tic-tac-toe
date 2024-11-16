const statusDisplay = document.querySelector(".game-status");
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningMessage = () =>
  `<h2 class='text-style'>${currentPlayer} has won, congrats! 🎉🎉</h2>`;
const drawMessage = () =>
  `<h2 class='text-style'>Game ended in a draw, try again you shoudn't end on an draw!</h2>`;
const currentPlayerTurn = () =>
  `<h2 class='text-style'>It's ${currentPlayer}'s trun</h2>`;
const winningCond = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResult() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const WinCondition = winningCond[i];
    let a = gameState[WinCondition[0]];
    let b = gameState[WinCondition[1]];
    let c = gameState[WinCondition[2]];
    if (a == "" || b == "" || c == "") {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }
  handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );
  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    //check if the game is paused or we already made a move, if not we will ignore the click
    return;
  }
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResult();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
document
  .querySelector(".game-restart")
  .addEventListener("click", handleRestartGame);
