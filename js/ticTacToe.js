// Global Vars
  var move,
      playerToken = "X",
      aiToken = "O",
      board = ["","","","","","","","",""],
      playerBoard = [],
      aiBoard = [],
      playerTurn = false,
      move = 0,
      nextMove,
      moveCount,
      winners = [
              [0, 1, 2],
              [3, 4, 5],
              [6, 7, 8],
              [0, 3, 6],
              [1, 4, 7],
              [2, 5, 8],
              [0, 4, 8],
              [2, 4, 6],
          ],
          //initialize output textfields
          status = document.getElementById("status"),
          winner = document.getElementById("winner");

//setup functions
//count the moves by counting occupied board fields
function countMoves(){
  return moveCount = board.filter(function(value){return value !== "";}).length;
}
//draw tokens on the board and update board Array
function updateBoard(val, token, playingBoard) {
  board[val] = token;
  document.getElementById(val).innerHTML = token;
  playingBoard.push($("#"+val).attr("value"));
}
//set up cell click handler
function setupCellClickHandler() {
  cellArray = document.getElementsByTagName("td");
  for (var i = 0; i<cellArray.length; i++ ){
    cellArray[i].addEventListener("click", cellClickHandler);
  }
}
function cellClickHandler(e){
  if (playerTurn && e.target.innerHTML === ""){
  updateBoard(e.target.id, playerToken, playerBoard);
  countMoves();
  }
  //set AI up for next turn
  winnerCheck();
  playerTurn = false;
  //call function for AI move
  play();
}
//Clear grid
function clearGrid() {
  var clearCell = document.getElementsByTagName("td");
    for (var i =0; i<clearCell.length; i++) {
   clearCell[i].innerHTML = "";
   board[i] = "";
    }
    tokenChoice();
  }
function init () {
//setup reset button
document.getElementById("reset").addEventListener("click", clearGrid);
tokenChoice();
setupCellClickHandler()
}
//token choice for the player
function tokenChoice() {
            var chooseToken = document.getElementById("chooseToken");
            var choiceBtn = document.querySelector(".chooseTokenContent");
            chooseToken.style.display = "block";
            choiceBtn.addEventListener("click", function(e) {
                playerToken = e.target.value || "X";
                if (playerToken === "X"){
                  aiToken = "O";
                  playerTurn = true;
                }
                else {
                  aiToken = "X";
                }
                chooseToken.style.display = "none";
                if (playerToken === "O") {
                    playerTurn = false;
                    play();
                }
            });
        }

//game control functions
//run the game
function play() {
  //ToDo: Implement setTimeout with 200ms to simulate AI "thinking"
    if (!playerTurn){
  //First AI turn: Either center or uppper right corner cell
      if (board[4] == ""){
        move = 4;
        updateBoard(move, aiToken, aiBoard);
        countMoves();
        playerTurn = true;
      }
      else if (board[4] !== "" && board[2] === ""){
        move = 2;
        updateBoard(move, aiToken, aiBoard);
        countMoves();
        playerTurn = true;
      }
      //check for Player having just one move to win
      else if (moveCount === 4){
        checkForLastMove();
        updateBoard(nextMove, aiToken, aiBoard);
        playerTurn = true;
      }
    }
    winnerCheck();
    aiTurn = false;
}
//checking if player has only one move to win
function checkForLastMove() {
  playerBoard = playerBoard.sort();
  winners.map(function(a) {
    if (a[0] == playerBoard[0] && a[1] == playerBoard[1]){
      nextMove = a[2];
    }
    else if (a[0] == playerBoard[0] && a[2] == playerBoard[1]){
      nextMove = a[1];
    }
    else if (a[1] == playerBoard[0] && a[2] == playerBoard[1]){
      nextMove = a[0];
    }
    return nextMove;
  });
  //If there is no danger of player winning, the AI should choose its next move
  aiAttackMove();
}
//choose attacking move for AI
function aiAttackMove(){
  //ToDo: Check if forking is possible, if not, choose nextMove adjacent to a token in a row with 2 free fields
  
}
//check for a winner
function winnerCheck() {
    for (var i = 0; i<winners.length; i++) {
      if (board[winners[i][0]]==board[winners[i][1]]==board[winners[i][2]]==playerToken){
        document.getElementById("winner").innerHTML = "You win!";
      }
      else if (board[winners[i][0]]==board[winners[i][1]]==board[winners[i][2]]==aiToken){
        document.getElementById("winner").innerHTML = "You lose!";
      }
    }
  }
window.onload = init();
