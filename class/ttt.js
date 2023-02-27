const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('t', 'test command (remove)', TTT.testCommand);

    Screen.render();
  }

  // Remove this
  static testCommand() {
    console.log("TEST COMMAND");
  }

  static checkWin(grid) {
    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended
    let data=
    {
      x:"X",o:"O",space:" ",xcount:0,ocount:0,spaceCount:0
    }
    let updateDate=()=>{
    for(let i=0;i<3;i++){
      let first=grid[i];
      first.forEach(element => {
          if(element===data.x){
            data.xcount+=1;
          }else if(element===data.o){
            data.ocount+=1;
          }else{
            data.spaceCount+=1;
          }
      });
    }
    }
    updateDate();
      if(data.spaceCount===9){
        return false;
      }
    if(data.ocount>=3 || data.xcount>=3){
      
    }

  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
