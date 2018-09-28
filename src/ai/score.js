import { flatten, last } from './utils';

/**
    @namespace Score
    @memberof AI
  * @description determines the score for each piece on the board
*/

/**
 * @function tileExists
 * @param {Array.<Tile[]>} board,
 * @param {Direction} next
 * @return {Boolean}
 * @description returns if a tile exists in the board
 * @memberof AI.Score
*/
export function tileExists(board, next) {
    return board[next.row] && board[next.row][next.col];
}

/**
 * @param {Tile} tile the target tile
 * @param {Array.<Tile[]>} board the current board
 * @return {Tile[]} neighbors of the target tile
 * @description finds neighbors of a tile in 6 directions
 * @memberof AI.Score
*/
export function withNeighbors(tile, board) {
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
 * @function getDirection
 * @param {Object} baseKey
 * @param {Object} col row
 * @return {Object} direction
 * @description gets the direction we are searching in
 * @memberof AI.Score
 */
export function getDirection (baseKey, {col, row}) {
    return {row: row - baseKey.row, col: col - baseKey.col}
}

/**
 * @function nextDirection
 * @param {Object} direction
 * @param {Object} last
 * @return {Object}
 * @description returns the next direction to search towards
 * @memberof AI.Score
 */
export function nextDirection (direction, last) {
    return {row: last.key.row + direction.row, col: last.key.col + direction.col};
}

/**
  * @function findConnections
  * @param {Tile} tile
  * @param {Array.<Tile[]>} searchSpace
  * @param {Number} depth defaults to 3
  * @return {Array.<Tile[]>}
  * @description searches to a max depth of 3 recursively from the starting tile
  * @memberof AI.Score
*/  
export function findConnections(tile, searchSpace, depth = 3) {
   const adjacentColors = flatten(withNeighbors(tile, searchSpace)).filter(n => n);
   const { key : baseKey } = tile;
   const connections = [];
   adjacentColors.forEach(ac => {
       if (ac === tile) return null;
       const path = [tile, ac];
       connections.push(path);
       const { key } = ac;
       const direction = getDirection(baseKey, key);
       while(path.length < depth) {
           try {
               const lastPath = last(path);
               const nextNeighbors = flatten(withNeighbors(lastPath, searchSpace)).filter(n => n);
               const nextDir = nextDirection(direction, lastPath);
               const ac = nextNeighbors.find(ac => ac.key.row === nextDir.row && ac.key.col === nextDir.col);
               if (ac) {
                   path.push(ac);
               } else {
                   break;
               }
           } catch(e) {
               console.error(e); // eslint-disable-line no-console
               break;
           }
       }
   });
   return connections.filter(c => c.length === depth);
}

/**
 * @function onlyMyColor
 * @param {Array.<Tile[]>}
 * @param {colors} color
 * @return {Array.<Tile[]>}
 * @description replaces all tiles that not my color with other false
  * @memberof AI.Score
 */
export function onlyMyColor(board, color, remove = false) {
    if (remove) {
        return board.map(row => row.filter(t => t.color === color));
    }
    return board.map(row => row.map(t => t.color === color ? t : false));
}

/**
  * @param {Array.<Tile[]>} board
  * @param {colors} color
  * @return {Tile[]} winners winning tiles AI can legally move to
  * @description returns if the AI can Win this turn
  * @memberof AI.Score
*/
export function canWin(board, color, _pieces) {
    // restrict the search space to just this color
    const remove = true;
    const thisColor = onlyMyColor(board, color);
    const availableColors = flatten(onlyMyColor(board, color, remove));
    // this will start at the bottom row 0 and go up
    const pieces = _pieces || flatten(availableColors.map(t => findConnections(t, thisColor)));
    // win means that the final 4th tile is legal i.e. not taken and also can be placed on top of
    const isLegal = (direction) => {
        const [first, second, third] = direction;
        const { key: bossKey } = first;
        const { key: secondKey } = second;
        const currentDirection = getDirection(bossKey, secondKey);
        const next = nextDirection(currentDirection, third);
        const legalWin = tileExists(board, next);
        if (legalWin && legalWin.legal) {
            direction.push(legalWin);
            return direction;
        }
        return false;
    };
    const winners = [];
    pieces.forEach(piece => {
        const winner = isLegal(piece);
        if (winner) winners.push(winner);
    });
    return winners;
}

/**
 * @param {String} color
 * @param {Array.<Tile[]>} board
 * @param {colors} color
 * @return {Tile[]} an array of moves
 * that would block a win for a color
 * @memberof AI.Score
*/
export function blockThree(board, color) {
    return canWin(board, color);
}

/**
  * @param {Array.<Tile[]>} board
  * @param {Array.<Tile[]>} colorTiles supplied by {@link AI}
  * @param {Tile[]} pieces supplied by {@link AI}
  * @param {Number} length defaults to 3
  * @description finds places where pieces of the same color are seperated by a gap
  * and can be legally filled
  * @memberof AI.Score
  * @return {Tile[]}
*/
export function findGapWins(board, colorTiles, pieces) {
    // this will start at the bottom row 0 and go up
    const length = 2;
    const directions = flatten(pieces.map(t => findConnections(t, colorTiles, length)));
    const isWinner = (direction) => {
        const [ first, second ] = direction;
        const { key: bossKey } = first;
        const { key: secondKey } = second;
        const currentDirection = getDirection(bossKey, secondKey);
        const next = nextDirection(currentDirection, second);
        const gap = tileExists(board, next);
        const validGap = gap && gap.legal && !gap.taken;
        if (validGap) {
            const possibleWinner = tileExists(board, nextDirection(currentDirection, gap));
            const validWinner = possibleWinner && possibleWinner.color === second.color;
            if (validWinner) {
                direction.push(gap, possibleWinner);
                return direction;
            }
        }
        return false;
    };
    const winners = [];
    directions.forEach(direction => {
        const winner = isWinner(direction);
        if (winner) {
            winners.push(winner);
        }
    });
    return winners; 
}

