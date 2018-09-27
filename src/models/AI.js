import {
    canWin,
    blockThree,
} from '../ai/score';

import {
    last,
    flatten
} from '../ai/utils';
import colors from '../constants/colors';

/**
  * @class AI
  * @namespace AI
  * @description via composition provides a Player with an ai
  * opponent
*/
export class AI {
    constructor(color) {
        this.currentRound = null;
        this.nextRound = null;
        this.color = color;
    }
    /**
     * @param {Array.<Tile[]>} board
     * @param {Array.<Boolean>} legal
     * @return {Tile} a tile
     * @description this method determines a move for the ai
     */
    getMove(board, legal) {
        const winners = canWin(board, legal, this.color);
        if (winners.length) return last(winners[0]);
        const opponentColor = this.color === colors.red ? colors.blue : colors.red;
        const blockOpponentWin = blockThree(board, legal, opponentColor);
        const middleFirst = (a, b) => {
            const aMiddle = a.key.row === 4;
            const bMiddle = b.key.row === 4;
            if (aMiddle) return 1;
            if (bMiddle) return 1;
            return -1;
        };
        if (blockOpponentWin.length) return last(blockOpponentWin[0]);
        const possibleMoves = flatten(legal
            .map((row, rowIndex) => {
                return row.map((allowed, colIndex) => {
                    if (allowed) return board[rowIndex][colIndex];
                })
            }))
            .filter(t => t)
            .sort(middleFirst);
        return possibleMoves[0];
    }
}

export default AI;
