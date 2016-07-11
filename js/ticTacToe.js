// Vars
var playerToken = "X",
    aiToken = "O",
    rows = 3,
    cols = 3,
    playing = false,
    grid = new Array(rows),
    aiTurn=false;
    board = new Array(9);
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

// Functions

//Clear grid
function clearGrid() {
var clearCell = document.getElementsByTagName("td");
  for (var i =0; i<clearCell.length; i++) {
 clearCell[i].innerHTML = "";
    clearCell[i].setAttribute("class", "empty");
  }
}


//Start everything
function initialize() {
  createTable();
  clearGrid();
}



//run the game
function play() {
  if (aiTurn){
  var emptyCells = document.getElementsByClassName("empty");
  var item = emptyCells[Math.floor(Math.random()*emptyCells.length)];
  item.innerHTML = aiToken;
    item.setAttribute("class", "full");
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

(function() {
        var chooseToken = document.getElementById("chooseToken");
        var choiceBtn = document.querySelector(".chooseTokenContent");
        chooseToken.style.display = "block";
        choiceBtn.addEventListener("click", function(e) {
            playerToken = e.target.value || "X";
            if (playerToken == "X"){
              aiToken = "O";
            }
            else {
              aiToken = "X";
            }
            chooseToken.style.display = "none";
            if (playerToken === "O") {
                playerMove = false;
                playerStart = false;
                aiPlay();
            } else {
                statusUserMove();
            }
        });
    })();

//start everything
window.onload = initialize;
