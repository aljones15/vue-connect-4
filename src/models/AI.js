/**
  * @class AI
  * @namespace AI
  * @description via composition provides a Player with an ai
  * opponent
*/
export class AI {
    constructor() {
        this.currentRound = null;
        this.nextRound = null;
    }
    /**
     * @param {Array.<Tile[]>} board
     * @param {Array.<Boolean>} legal
     * @return {Tile} a tile
     * @description this method determines a move for the ai
     */
    getMove(board, legal) {
        const possibleMoves = legal
            .map((row, rowIndex) => {
                return row.map((legal, colIndex) => {
                    if (legal) return board[rowIndex][colIndex];
                })
            })
            .reduce((acc, cur) => acc.concat(cur), [])
            .filter(t => t);
        return possibleMoves[0];
    }
}

export default AI;
