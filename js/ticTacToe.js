// Global Vars
  var move,
      playerToken = "X",
      aiToken = "O",
      board = ["","","","","","","","",""],
      playerBoard = [],
      aiBoard = [],
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
          counter = 0,
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
  playerBoard.push($("#"+e.target.id).attr("value"));
  counter++;
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
   board[i] = "";
    }
    tokenChoice();
  }


//run the game
function play() {
    if (!playerTurn){


  //First AI turn: Either center or corner uppper right corner cell
      if (board[4] == ""){
        board[4] = aiToken;
        document.getElementById("4").innerHTML = aiToken;
        aiBoard.push($("#4").attr("value"));
        counter++;
        playerTurn = true;
      }
      else if (board[4] !== ""){
        move = 2;
        board[move] = aiToken;
        document.getElementById(move).innerHTML = aiToken;
        aiBoard.push($("#"+move).attr("value"));
        counter++;
        playerTurn = true;
      }
      //check for Player having just one move to win
      else if (counter === 4){
        console.log("test");
        checkForLastMove();
      }

    }
    aiTurn = false;
  }

//checking if player has only one move to win
function checkForLastMove() {
  console.log("test2");
  playerBoard = playerBoard.sort();
  winners.filter(function(a) {
    console.log(a);
    if (a[0] == playerBoard[0] && a[1] == playerBoard[1]){
      console.log(a[3]);
      return a[3];

    }
  });
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
