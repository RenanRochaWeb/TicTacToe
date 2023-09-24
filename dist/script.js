//Imports
import Board from "./board.js";
//Constants
const BOARD = new Board();
const PLAYER_1 = "Player 1";
const PLAYER_2 = "Player 2";
const HTMLGRID = document.querySelector(".board");
const HTMLMESSAGE = document.querySelector(".message");
const POPUP = document.getElementById("popup");
const BACKDROP = document.getElementById("backdrop");
let grid = BOARD.build();
let currentPlayer = PLAYER_1;
//Create the board and necessary elements
function initializeBoard() {
    const message = document.createElement("p");
    message.textContent = `${currentPlayer} turn!`;
    HTMLMESSAGE.append(message);
    for (let i = 0; i < BOARD.size; i++) {
        for (let j = 0; j < BOARD.size; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            const cellData = grid[j][i];
            cell.addEventListener("click", () => cellClickHandler(cell));
            cell.setAttribute("positionX", cellData.positionX.toString());
            cell.setAttribute("positionY", cellData.positionY.toString());
            HTMLGRID.append(cell);
        }
    }
}
//handle the cell clicks
function cellClickHandler(cell) {
    const winMsg = document.getElementById("win-player");
    //Fill the cell and lock it
    if (currentPlayer === PLAYER_1) {
        cell.classList.add("x");
    }
    else {
        cell.classList.add("o");
    }
    cell.style.pointerEvents = "none";
    //Set the played cell properties
    grid = BOARD.setCell(currentPlayer, parseInt(cell.getAttribute("positionX")), parseInt(cell.getAttribute("positionY")), grid);
    //Check if game ended
    if (BOARD.checkWin(grid)) {
        winMsg.textContent = `${currentPlayer} WON!!`;
        POPUP.style.display = "block";
        BACKDROP.style.display = "block";
    }
    else if (BOARD.checkDraw(grid)) {
        winMsg.textContent = `No winners, go again!`;
        POPUP.style.display = "block";
        BACKDROP.style.display = "block";
    }
    else {
        //Change player and display message
        currentPlayer = currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1;
        if (HTMLMESSAGE.firstChild !== null) {
            HTMLMESSAGE.firstChild.textContent = `${currentPlayer} turn!`;
        }
    }
}
//handle reset
const resetBtn = document.querySelectorAll(".reset-button");
resetBtn.forEach((btn) => {
    btn.addEventListener("click", () => resetGame());
});
function resetGame() {
    currentPlayer = PLAYER_1;
    const cells = document.querySelectorAll(".cell");
    cells.forEach((c) => {
        c.classList.remove("x");
        c.classList.remove("o");
        c.style.pointerEvents = "auto";
    });
    if (HTMLMESSAGE.firstChild !== null) {
        HTMLMESSAGE.firstChild.textContent = `${currentPlayer} turn!`;
    }
    grid = BOARD.build();
    POPUP.style.display = "none";
    BACKDROP.style.display = "none";
}
// Starts the game when the page loads
function init() {
    initializeBoard();
}
window.addEventListener("load", init);
