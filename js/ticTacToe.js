// Global Vars
  var move,
      playerToken = "X",
      aiToken = "O",
      board = ["","","","","","","","",""],
      playerBoard = [],
      aiBoard = [],
      playerTurn = false,
      move = 0,
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
          winner = document.getElementById("winner"),
          //count the moves by counting occupied board fields
          //ToDo: moveCount needs to be updated
          moveCount = board.filter(function(value){return value !== "";}).length;


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

//set up cell click handler
function setupCellClickHandler() {
  cellArray = document.getElementsByTagName("td");
  for (var i = 0; i<cellArray.length; i++ ){
    cellArray[i].addEventListener("click", cellClickHandler);
  }

}
function cellClickHandler(e){
  if (playerTurn && e.target.innerHTML === ""){
  //fill out clicked cell with user token
  e.target.innerHTML = playerToken;
  //add clicked cell to board array
  board[e.target.id] = playerToken;
  playerBoard.push($("#"+e.target.id).attr("value"));
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

//run the game
function play() {

  //ToDo: Implement setTimeout with 200ms to simulate AI "thinking"
    if (!playerTurn){
  //First AI turn: Either center or uppper right corner cell
      if (board[4] == ""){
        board[4] = aiToken;
        document.getElementById("4").innerHTML = aiToken;
        aiBoard.push($("#4").attr("value"));
        playerTurn = true;
      }
      else if (board[4] !== "" && board[2] === ""){
        move = 2;
        board[move] = aiToken;
        document.getElementById(move).innerHTML = aiToken;
        aiBoard.push($("#"+move).attr("value"));
        playerTurn = true;
      }
      //check for Player having just one move to win
      else if (moveCount === 4){
        checkForLastMove();
      }
    }
    aiTurn = false;
}

//checking if player has only one move to win
function checkForLastMove() {
  playerBoard = playerBoard.sort();
  winners.filter(function(a) {
    console.log(a[3]);
    if (a[0] == playerBoard[0] && a[1] == playerBoard[1]){
      console.log(a[3]);
      return a[3];

    }
  });
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
