/**
    @namespace Score
    @memberof AI
  * @description determines the score for each piece on the board
*/

/**
 * @param {Tile} tile the target tile
 * @param {Array.<Tile[]>} board the current board
 * @return {Tile[]} neighbors of the target tile
 * @description finds neighbors of a tile in 6 directions
 * @memberof AI.Score
*/
export function withNeighbors(tile, board){
    /**
      * @function subSet
      * @param {Tile[]} newRow
      * @param {number} col
      * @return {Tile[]}
      * @description part of {@link withNeighbors}
      * @memberof AI.Score
    */
    const subSet = (newRow, col) => {
        const end = newRow.length - 1;
        const start = col > 0 ? col - 1 : 0;
        const finish = col === end ? col + 1: col + 2;
        return board[newRow].slice(start, finish);
    };
    const bottom = board.length - 1;
    const { key } = tile;
    const { col, row } = key;
    const topIndex = row - 1;
    const topRow = (topIndex >= 0) ? subSet(topIndex, col) : [];
    const bottomRow = (row !== bottom) ? subSet(row + 1, col) : [];
    const currentRow = subSet(row, col);
    return [topRow, currentRow, bottomRow];
}

/**
 * @param {String} color
 * @param {Array.<Tile[]>} board
 * @param {Array.<Tile[]>} acc
 * @return {Tile[]} an array of moves
 * that would block a win for a color
 * @memberof AI.Score
*/
export function blockThree(board, legal) {
    

}

/**
  * @param {Array.<Tile[]>} board
  * @param {Array<Boolean>} legal
  * @param {colors} color
  * @return {Tile[]} winners winning tiles AI can legally move to
  * @description returns if the AI can Win this turn
  * @memberof AI.Score
*/
export function canWin(board, legal, color) {
    // restrict the search space to just this color
    const thisColor = board
        .map(row => row.filter(t => t.color === color));
    const findWinner = (tile, acc = []) => {
    
    }
    // if 3 in a row and a legal move 
    // for 4 then return winning tile
}
