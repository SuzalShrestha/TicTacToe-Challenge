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
    Screen.initialize(3,3);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('w', 'cursor up', this.cursor.up);
    Screen.addCommand('s', 'cursor down', this.cursor.down);
    Screen.addCommand('d', 'cursor left', this.cursor.left);
    Screen.addCommand('a', 'cursor right', this.cursor.right);
    Screen.render();
    

     
      Screen.setGrid(this.cursor.row,this.cursor.col,this.playerTurn);
      Screen.setBackgroundColor(this.cursor.row,this.cursor.col,"yellow");
      this.cursor.setBackgroundColor();
      
      Screen.render();
      Screen.setGrid(this.cursor.row,this.cursor.col,this.playerTurn);
    
      
  }

  
 

  static checkWin(grid) {
    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended
  //reduce horizontally
  //
  //reduce vertically
  //
  let checkThreeSame=(arr)=>{
    let reduced=arr.reduce(
      function(accum,current){
        if(accum===current){
          return accum;
        }
      }
    );
    return reduced;
  }
  //empty check

  let emptyCount=0;
  for(let item of grid){
    let space=checkThreeSame(item);
    if(space===" "){
      emptyCount++;
    }
  }
  if(emptyCount===3){
    return false;
  }
  //Horizontal Win check

    for (let item of grid){
      let bool=checkThreeSame(item);
      if(bool!==undefined){
      if(bool.indexOf("X")!==-1){
        return "X";
      }else if(bool.indexOf("O")!==-1){
        return "O";
      }
    }
      
    }
    //Vertical Win Check
    
    let verticalGrid=[];
    for(let i=0;i<3;i++){
      let arr=[];
      for(let j=0;j<3;j++){
        arr.push(grid[j][i]);
      }
      verticalGrid.push(arr);
      
    }
    for (let item of verticalGrid){
      let bool=checkThreeSame(item);
      if(bool!==undefined){
      if(bool.indexOf("X")!==-1){
        return "X";
      }else if(bool.indexOf("O")!==-1){
        return "O";
      }
    }
      
    }
    
    //diagonal wins
        
    
      let array=[];
      for(let i=0;i<3;i++){
        array.push(grid[i][i]);
      }
      
    
      if(checkThreeSame(array)!==undefined){
        if(checkThreeSame(array).indexOf("X")!==-1){
          return "X";
        }else if(checkThreeSame(array).indexOf("O")!==-1){
          return "O";
        }
      }
     let advanceGrid=grid.reverse();
      array=[];
      for(let i=0;i<3;i++){
        array.push(advanceGrid[i][i]);
      }
      if(checkThreeSame(array)!==undefined){
        if(checkThreeSame(array).indexOf("X")!==-1){
          return "X";
        }else if(checkThreeSame(array).indexOf("O")!==-1){
          return "O";
        }
      }
    
    //ties
    for(let item of grid){
      if(item.indexOf(" ")!==-1){
        return false;
      }
    }
   return "T";
    
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
