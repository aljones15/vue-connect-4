/**
  * @module LegalMoves
  * @param {Array.<Tile[]>} board
  * @description the ai should only look at moves 
  * it can actually make in the turn it is thinking about
*/
export function legalMoves(board) {
   const bottomRow = board.length - 1;
   /**
    * @function covered
    * @param {Number} row - row in the board
    * @param {Number} col - col in a row
    * @return {Boolean}
    * @description take a row and a col return if a piece is above it
   */
   function covered (row, col) {
       // if we are on the top row we are not covered
       if (row === 0) return false;
       const aboveRow = row - 1;
       return !board[aboveRow][col].taken;
   }
    /**
    * @function onTop
    * @param {Number} row - row in a the board
    * @param {Number} col - col in a row
    * @return {Boolean}
    * @description take a row and a col return if a piece is below it
    * so it can stack on top of it
   */
  
   function onTop (row, col) {
       if (row === bottomRow) return false;
       const belowRow = row + 1;
       // if the space below is taken we can place on top of it
       return board[belowRow][col].taken;
   }
   return board.map((row, rowIndex) => row.map((tile, colIndex) => {
       
       if (rowIndex === bottomRow) {
           const legal = covered(rowIndex, colIndex) && !tile.taken;
           return legal;
       }
       return onTop(rowIndex, colIndex) && !tile.taken;
   })); 
}

export default legalMoves;
