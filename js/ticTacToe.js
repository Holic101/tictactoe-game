  // Global Vars
  var move,
      playerToken = "X",
      aiToken = "O",
      board = ["","","","","","","","",""],
      playerTurn = false,
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
                playerToken = e.target.value;
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
                } else {
                    whosTurnIsIt();
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
  console.log(board[e.target.id]);
  }
  //set AI up for next turn
  playerTurn = false;
  //call function for AI move
  play();
}

//Clear grid
function clearGrid() {
  var clearCell = document.getElementsByTagName("td");
    for (var i =0; i<clearCell.length; i++) {
   clearCell[i].innerHTML = "";
    }
  }


//run the game
function play() {
    if (!playerTurn){
      console.log(playerTurn);
      move = 4;
  //First AI turn: Either center or corner uppper right corner cell
      if (board[move] == ""){
        console.log("test");
        board[move] = aiToken;
        document.getElementById(move).innerHTML = aiToken;
        console.log(board[move]);
      }
      else {
        move = 2;
        board[move] = aiToken;
        document.getElementById(move).innerHTML = aiToken;
      }

    }
    aiTurn = false;
  }

//check for a winner
function winnerCheck() {

    document.getElementById("winner").innerHTML = "You win!";
    document.getElementById("winner").innerHTML = "You lose!";
  }


//display prompt for next player
function whosTurnIsIt() {
              status.innerHTML = "Your turn: " + playerToken;
          }

window.onload = init();
