import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows= 5, ncols= 5, chanceLightStartsOn= 0.25 }) {
  const [board, setBoard] = useState(createBoard);

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    // TODO: create array-of-arrays of true/false values
    //loop individual and push the cell into the new array 

      //this create an array of rows with undefine value and 
      // then iterate over each row to transform them into row column 
      // for each array row there will be a number of column
      // it will be fill with a value from a cell 
      // generate a value that is between 0 and .25 
      // determine when the cell is on
    
    return(
      Array.from({length: nrows}).map(
        row => Array.from({length: ncols}).map(
          cell => Math.random()< chanceLightStartsOn
        )
      )
    )
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    //when all cell is dark 
    //the board disappear

    // every method check for all element to meet a ceratin condition (which is provided by a function)
    //checking each cell to see if the cell is falsey like  having a value of 0
    // if a row of cells are falsy then it is true 

    // having two every
      //outer every is to check if all row in the board array pass the inner check
      // inner every is to check if all cell in the row is falsy 
    
    //this code check the entire board 
    // check to make sure that the rows only have false value in it 
    //If any cell is not "falsy" (i.e., if it is true, a non-zero number, a non-empty string, etc.), the expression returns false.
    return(
      Board.every(row => row.every(cell => !cell))
    )

  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      //map method is create copy of the array of row
      // [...] spread operator allow me to create a shallow copy of all the rows
      // the purpose of this to create a new array to be modify where it wouldn't change the original

      const boardCopy = oldBoard.map(row => [...row])

      // TODO: in the copy, flip this cell and the cells around it

      flipCell(y, x, boardCopy)
      flipCell(y, x+1,  boardCopy)
      flipCell(y, x-1,  boardCopy)
      flipCell(y+1, x,  boardCopy)
      flipCell(y-1, x,  boardCopy)

      // TODO: return the copy

      return boardCopy
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  if(hasWon()){
    <div>You won!</div>
  }
  // TODO

  // make table board

  let tblBoard = []
  for (let y=0; y<nrows; y++){
    let row = []
    for (let x=0; x<ncols; x++){
      let coord = `${y}-${x}`
      row.push(
        <Cell 
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={evt => flipCellsAround(coord)}
        />
      )
    }
    tblBoard.push(
      <tr key={y}>row</tr>
    )
  }

  
  // TODO
  return(
    <table className="Board">
      <tbody>{tblBoard}</tbody>
    </table>
  )
}

export default Board;
