/**
  * @module Score
  * @description determines the score for each piece on the board
*/

/**
 * @param {Object} tile the target tile
 * @param {Array.<Tile[]>} board the current board
 * @return {Tile[]} neighbors of the target tile
 * @description finds neighbors of a tile in 6 directions
*/
export function withNeighbors(tile, board){
    /**
      * @function subSet
      * @param {Tile[]} newRow
      * @param {number} col
      * @return {Tile[]}
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
 * @return {Tile[]} an array of moves
 * that would block a win for a color
*/
export function blockThree(board, legal) {

}
