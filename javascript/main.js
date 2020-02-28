let playerOneScore = document.querySelector('#playerOneScore');
let playerTwoScore = document.querySelector('#playerTwoScore');
let tie = document.querySelector('#tie');

function Game() {
  let currentPlayer = 'x';

  const wins = [
    //2dimensional arrays -- first count down which is i; theen go across after which is j hree
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  this.gameState = ['', '', '', '', '', '', '', '', ''];
  this.hasWon = false;
  this.checkGameState = function() {
    console.log(this.gameState);
    //checking the game state array within the gamee state function
    const xSpotsPicked = [];
    // ****
    const oSpotsPicked = [];
    for (let i = 0; i < this.gameState.length; i++) {
      this.gameState[i]; // replace the array with gameState bc thats the name of the object-array / game class property
      if (this.gameState[i] === 'x') {
        xSpotsPicked.push(i); // push puts the argument on the array, thing we are putting is i bc it was assigned as a variable in the line beefore
      }
      // ****
      else if (this.gameState[i] === 'o') {
        oSpotsPicked.push(i); // push puts the argument on the array, thing we are putting is i bc it was assigned as a variable in the line beefore
      }
    } //referance; game is the outside refereance, and inside it is this

    for (let i = 0; i < wins.length; i++) {
      //running the for loop to compare what player picked to wins
      let currentWin = wins[i];
      let xthreeInARow = 0; //need to geet 3 in a row in an array; setting it to 0 bc you dont want the leftover from previous plays to come back;
      let othreeInARow = 0;

      for (var j = 0; j < currentWin.length; j++) {
        //look inside the current win for the second loop, named j
        currentWin[j];
        if (xSpotsPicked.includes(currentWin[j])) {
          //used array includes bc it is used to see if it includes that function
          xthreeInARow++;
        }
        // ****
        if (oSpotsPicked.includes(currentWin[j])) {
          //used array includes bc it is used to see if it includes that function
          othreeInARow++;
        }
      }
      if (xthreeInARow === 3) {
        alert('x wins!');
        this.hasWon = true;
        playerOneScore.innerHTML++;
      }
      if (othreeInARow === 3) {
        alert('o wins!');
        this.hasWon = true;
        playerTwoScore.innerHTML++;
      }
      // WHAT DO TO ON A TIE
    }
    if (!this.gameState.includes('')) {
      if (!this.hasWon) { //!this.hasWon=false
        alert('tie');
        tie.innerHTML++;
      }
    }
  }; // checking to see who won
  //referring to the grid array from a few lines ago and gamestate is a common term ; another one is board

  const cellElements = document.querySelectorAll('[data-cell-index]'); //got data cell indexfrom html class

  cellElements.forEach(cell => {
    cell.addEventListener('click', handleCellClick, { once: true }); //once true is so you cannot change it to x or o after
  });

  function handleCellClick(e) { //return ends the function; placement matters; handle cell click is a copy machine, you dont know how it works but you know if you want to make a copy it will work. so you hit copy x copies and then x copiese will be printed; put it inside handle cell click bc this function recognizes that the eclick checks for the other stuff and it says "oh we won so stop the clicks"
    if(game.hasWon){
      return
    }
    // console.log(game.hasWon)

    //writing the e and recognizing the spot it targeted; use it to update gameState
    let clickedCell = e.target; // every event has a target and that causees the event to generate
    let spot = clickedCell.getAttribute('data-cell-index'); // get the value of the attribute from e.target
    game.gameState[spot] = currentPlayer; //the spot is associated with 0-8 and so game is the object instantiation; game is a class and every instance of the game class juas a game state so whene creating a new game it created a newe gamestate to work with
    clickedCell.innerHTML = currentPlayer; //replaced "x" which is a string with a variable
    game.checkGameState();
    if (currentPlayer === 'x') {
      //current player is x, then change it o ---- if its o, changee it back to x
      currentPlayer = 'o';
    } else if (currentPlayer === 'o') {
      //current player is x, then change it o ---- if its o, changee it back to x
      currentPlayer = 'x';
    }
  }
}

let game = new Game();
console.log(game);

const reset = document.querySelector('button');
let cells = document.querySelectorAll('.cell');

reset.addEventListener('click', () => {
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = '';
  }
  game = new Game();
});
