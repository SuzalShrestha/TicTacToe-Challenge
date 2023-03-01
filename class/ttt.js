const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3,3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3,3);
    Screen.setGridlines(true);
    this.cursor.setBackgroundColor();
    // Replace this with real commands
    Screen.addCommand('up', 'cursor up', this.cursor.up.bind(this.cursor));
    Screen.addCommand('down', 'cursor down', this.cursor.down.bind(this.cursor));
    Screen.addCommand('left', 'cursor left', this.cursor.left.bind(this.cursor));
    Screen.addCommand('right', 'cursor right', this.cursor.right.bind(this.cursor));
    Screen.addCommand('return', 'place move', this.placeMove.bind(this));
    Screen.render();
    
  }
      placeMove() {
        let col=this.cursor.col;
        let row=this.cursor.row;
        let char=this.playerTurn;
        Screen.setGrid(row,col,char);
        Screen.render();
        if(this.playerTurn==="X"){

          this.playerTurn="O";
        }else{
          this.playerTurn="X";
        }
        let winner=TTT.checkWin(Screen.grid);
        if(winner){
          TTT.endGame(winner);
        }
       
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
