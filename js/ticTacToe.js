//IIFE for immediate start
(function() {

  // Vars
  var playerToken = "X",
      aiToken = "O",
      rows = 3,
      cols = 3,
      playing = false,
      grid = new Array(rows),
      aiTurn = false,
      board = new Array(9),
      playerTurn = false,
      playerStart = false,
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

  //initialize output textfields
  status = document.getElementById("status");
  winner = document.getElementById("winner");

  //Clear grid
  function clearGrid() {
  var clearCell = document.getElementsByTagName("td");
    for (var i =0; i<clearCell.length; i++) {
   clearCell[i].innerHTML = "";
    }
  }


  //run the game
  function play() {
    if (aiTurn){
  //ToDo: Implement AI algorithm
    }
    aiTurn = false;
  }

  //Handle clicks in cells
  function cellClickHandler(e) {
    if (this.innerHTML === ""){
    this.innerHTML = playerToken;
    board[this.id] = playerToken;
    }
    aiTurn=true;
    play();
  }

  //check for a winner
  function winnerCheck() {

    document.getElementById("winner").innerHTML = "You win!";
    document.getElementById("winner").innerHTML = "You lose!";
  }
//token choice for the player
  (function() {
          var chooseToken = document.getElementById("chooseToken");
          var choiceBtn = document.querySelector(".chooseTokenContent");
          chooseToken.style.display = "block";
          choiceBtn.addEventListener("click", function(e) {
              playerToken = e.target.value;
              if (playerToken == "X"){
                aiToken = "O";
              }
              else {
                aiToken = "X";
              }
              chooseToken.style.display = "none";
              if (playerToken === "O") {
                  playerTurn = false;
                  playerStart = false;
                  play();
              } else {
                  whosTurnIsIt();
              }
          });
      })();

      function whosTurnIsIt() {
              status.innerHTML = "Your turn: " + userToken;
          }
})();
