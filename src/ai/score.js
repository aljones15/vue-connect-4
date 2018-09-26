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
  * @function findConnection
  * @param {Tile} tile
  * @param {Number} depth
  * @return {Tile[]}
  * @description searches to a max depth of 3 recursively from the starting tile
  * @memberof AI.Score
*/  
export function findConnection (tile, members, depth = 2) {
    const searchSpace = members.map(row => row.filter(t => t !== tile));
    const adjacentColors = withNeighbors(tile, searchSpace)
        .filter(row => row.length);
   if (depth <= 0) return [tile, adjacentColors];
   if (!adjacentColors.length) return [];
   const next = adjacentColors.map(row => row.map(ac => findConnection(ac, searchSpace, depth - 1))).reduce((acc, cur) => acc.concat(cur), []);
   const noDeadEnds = next.filter(results => results.length);
   return [tile, noDeadEnds]; 
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
    // this will start at the bottom row 0 and go up
    const pieces = thisColor
        .map(row => row.map(t => findConnection(t, thisColor)))
        .reduce((acc, cur) => acc.concat(cur), [])
    return pieces;
}

/**
 * @param {String} color
 * @param {Array.<Tile[]>} board
 * @param {Array.<Tile[]>} acc
 * @param {colors} color
 * @return {Tile[]} an array of moves
 * that would block a win for a color
 * @memberof AI.Score
*/
export function blockThree(board, legal, color) {
    return canWin(board, legal, color);
}


