// Global Vars
//ToDo: Make a class named "State" that will include all information
//concerning the state of the game
  var move,
      playerToken = "X",
      aiToken = "O",
      board = ["","","","","","","","",""],
      cellArray = document.getElementsByTagName("td"),
      playerBoard = [],
      aiBoard = [],
      playerTurn = false,
      aiTurn = false,
      nextMove,
      win = false, lose = false, tie = false,
      aiMoveCount,
      playerMoveCount,
      gameOver = false,
      winners = [
              [0, 1, 2],
              [3, 4, 5],
              [6, 7, 8],
              [0, 3, 6],
              [1, 4, 7],
              [2, 5, 8],
              [0, 4, 8],
              [2, 4, 6],
          ];

//setup functions
//count the moves by counting occupied board fields
function countMoves(player) {
  if (player == "ai"){
    return aiMoveCount = board.filter(function(value){
      return value === aiToken;
    }).length;
  }
  else if (player == "user"){
    return playerMoveCount = board.filter(function(value){
      return value === playerToken;
    }).length;
  }
}
//draw tokens on the board and update board Array
function updateBoard(val, token, playingBoard) {
  board[val] = token;
  document.getElementById(val).innerHTML = token;
  playingBoard.push($("#"+val).attr("value"));
}
//set up cell click handler
function setupCellClickHandler() {
  for (var i = 0; i<cellArray.length; i++ ){
    if (cellArray[i].innerHTML === "") {
      cellArray[i].addEventListener("click", cellClickHandler);
    }
  }
}
function cellClickHandler(e){
  //ToDo: avoid function call by click on non-empty fields
  if (playerTurn && e.target.innerHTML === "" && !gameOver){
  updateBoard(e.target.id, playerToken, playerBoard);
  countMoves("user");
  //set AI up for next turn
  winnerCheck();
  playerTurn = false;
  aiTurn = true;
  //call function for AI move
  play();
  }
}
//Clear grid
function clearGrid() {
  //reset the grid
    for (var i =0; i<cellArray.length; i++) {
   cellArray[i].innerHTML = "";
    }
    //reset game variables
    gameOver = false;
    board = ["","","","","","","","",""];
    aiBoard = [];
    win = lose = tie = false;
    playerBoard = [];
    aiMoveCount = 0;
    winningArray = [];
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
            var winnerDiv = document.getElementById("winnerDiv");
            winnerDiv.style.display = "none";
            choiceBtn.style.display = "block";
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
  //it needs to be ai's turn and no gameOver
    if (!playerTurn && !gameOver){
      countMoves("user");
  //If user hasn't made 2 moves yet there is no need for defense
  if (playerMoveCount < 2){
    //first ai move should be upper left corner
    if (board[0] === ""){
      setTimeout(function() {
        nextMove = 0;
        updateBoard(nextMove, aiToken, aiBoard);
        countMoves("ai");
        playerTurn = true;
      }, 300);
    }//end board[0] if
    //second ai move is the opposite corner
    else if (board[8] === "") {
      setTimeout(function() {
        nextMove = 8;
        updateBoard(nextMove, aiToken, aiBoard);
        countMoves("ai");
        playerTurn = true;
      }, 300);
    }//end else if
    //alternative ai move if 0 and 8 are both taken
    else {
      setTimeout(function() {
        nextMove = 2;
        updateBoard(nextMove, aiToken, aiBoard);
        countMoves("ai");
        playerTurn = true;
      }, 300);
    }//end else
  }// end playerMoveCount if
      // after two ai moves it gets a little more complicated :)
      else {
        setTimeout(function() {
          //the following iterations could also be done with winners.some and return true or false
          winners.map(function(a) {
            if (board[a[0]] === aiToken && board[a[1]] === aiToken && board[a[2]] === "" || board[a[0]] === aiToken && board[a[2]] === aiToken && board[a[1]] === "" || board[a[1]] === aiToken && board[a[2]] === aiToken && board[a[0]] === "") {
              if (aiTurn) {
              checkForWinningMove();
              updateBoard(nextMove, aiToken, aiBoard);
              countMoves("ai");
              winnerCheck();
              playerTurn = true;
              aiTurn = false;
              }
            }
          });
            //check if defense is necessary
            winners.map(function(a) {
              if (board[a[0]] === playerToken && board[a[1]] === playerToken && board[a[2]] === "" || board[a[0]] === playerToken && board[a[2]] === playerToken && board[a[1]] === "" || board[a[1]] === playerToken && board[a[2]] === playerToken && board[a[0]] === "" ) {
                if (aiTurn) {
                  checkForDefense();
                  updateBoard(nextMove, aiToken, aiBoard);
                  countMoves("ai");
                  winnerCheck();
                  playerTurn = true;
                  aiTurn = false;
              }
            }
          });
            //if neither winning nor defending is possible choose next attacking move
            winners.map(function(a) {
            if (board[a[0]] === aiToken && board[a[1]] === "" && board[a[2]] === "" || board[a[1]] === aiToken && board[a[0]] === "" && board[a[2]] === "" || board[a[2]] === aiToken && board[a[0]] === "" && board[a[1]] === "" || board[a[2]] === aiToken && board[a[0]] === playerToken && board[a[1]] === "" || board[a[2]] === playerToken && board[a[0]] === aiToken && board[a[1]] === "") {
              if (aiTurn) {
                aiAttackingMove();
                updateBoard(nextMove, aiToken, aiBoard);
                countMoves("ai");
                winnerCheck();
                playerTurn = true;
                aiTurn = false;
              }
            }
          }); //end mapping through winners array
        }, 300);
      }//end else
    }//end outer if
}//end of play()
//checking if ai has only one move to win
function checkForWinningMove(){
  winners.map(function(a) {
    if (board[a[0]] === aiToken && board[a[1]] === aiToken && board[a[2]] === ""){
          nextMove = a[2];
          return nextMove;
        }
    else if (board[a[0]] === aiToken && board[a[2]] === aiToken && board[a[1]] === ""){
          nextMove = a[1];
          return nextMove;
        }
    else if (board[a[1]] === aiToken && board[a[2]] === aiToken && board[a[0]] === ""){
          nextMove = a[0];
          return nextMove;
        }
  });
}
//check defending moves
function checkForDefense() {
  winners.map(function(a) {
    if (board[a[0]] === playerToken && board[a[1]] === playerToken && board[a[2]] === ""){
      nextMove = a[2];
      return nextMove;
    }
    else if (board[a[0]] === playerToken && board[a[2]] === playerToken && board[a[1]] === ""){
      nextMove = a[1];
      return nextMove;
    }
    else if (board[a[1]] === playerToken && board[a[2]] === playerToken && board[a[0]] === ""){
      nextMove = a[0];
      return nextMove;
    }
  });
}
    //if defending not necessary, look for a winning move
        //If there is no danger of player winning and no possibility to
        // immediately win for AI
        // then AI should play its next token on a free field in a "winner" with
        // no player tokens in it, but one aiToken already there
function aiAttackingMove() {
  winners.map(function(a) {
    if (board[a[0]] === aiToken && board[a[1]] === "" && board[a[2]] === "") {
      nextMove = a[2];
      return nextMove;
    }
    else if (board[a[1]] === aiToken && board[a[0]] === "" && board[a[2]] === "") {
      nextMove = a[0];
      return nextMove;
    }
    else if (board[a[2]] === aiToken && board[a[0]] === "" && board[a[1]] === "") {
      nextMove = a[0];
      return nextMove;
    }
    //if nothing else fits there must be only two free fields left, pick the first one
    else if (board[a[2]] === aiToken && board[a[0]] === playerToken && board[a[1]] === "") {
      nextMove = a[1];
      return nextMove;
    }
    else if (board[a[2]] === playerToken && board[a[0]] === aiToken && board[a[1]] === "") {
      nextMove = a[1];
      return nextMove;
    }
});
}
//check for a winner
function winnerCheck() {
  //restart the game by resetting the board, moveCount and all game states
  //and displaying the token choice screen
    for (var i = 0; i<winners.length; i++) {
      //check for player win
      if (board[winners[i][0]] == playerToken && board[winners[i][1]] == playerToken && board[winners[i][2]] == playerToken){
        win = true;
        gameOver = true;
        showWinner();
        setTimeout(function() {
          clearGrid();
        }, 2000);
      }
      //check for player lose
      else if (board[winners[i][0]] == aiToken && board[winners[i][1]] == aiToken && board[winners[i][2]] == aiToken){
        lose = true;
        gameOver = true;
        showWinner();
        setTimeout(function() {
          clearGrid();
        }, 2000);
      }
      //check for a draw
      else if (aiToken == "X" && aiMoveCount == 5 || playerToken == "X" && playerMoveCount == 5) {
        tie = true;
        gameOver = true;
        showWinner();
        setTimeout(function() {
          clearGrid();
        }, 2000);
      }
    }
  }
//function that displays the winning combination
function showWinner() {
  //display the announcement div
  var winnerDiv = document.getElementById("winnerDiv");
  var chooseToken = document.getElementById("chooseToken");
  var choiceBtn = document.querySelector(".chooseTokenContent");
  winnerDiv.style.display = "block";
  choiceBtn.style.display = "none";
  chooseToken.style.display = "block";
  //check different game end scenarios
  if (win) {
    winnerDiv.innerHTML = "You Win! :)"
  }
  else if (lose) {
    winnerDiv.innerHTML = "You Lose! :("
  }
  else if (tie) {
    winnerDiv.innerHTML = "It's a Tie! :| "
  }
}
window.onload = init();
