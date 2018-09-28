import {
    canWin,
    blockThree,
    onlyMyColor,
    findGapWins,
} from '../ai/score';

import {
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
        this._pieces = [];
        this._mycolor = [];
    }
    /**
     * @param {Array.<Tile[]>} board
     * @param {Array.<Boolean>} legal
     * @return {Tile} a tile
     * @description this method determines a move for the ai
     */
    getMove(board, legal) {
        this.pieces = board;
        this.myColor = board;
        const threeRow = canWin(board, this.color)
            .map(connection => connection.find(t => !t.taken));
        const gapWin = findGapWins(board, this.myColor, this.pieces)
            .map(connection => connection.find(t => !t.taken));
        const winners = threeRow.concat(gapWin).filter(win => win);
        if (winners.length) return winners[0];
        const opponentColor = this.color === colors.red ? colors.blue : colors.red;
        const blockOpponentWin = blockThree(board, opponentColor);
        if (blockOpponentWin.length) return blockOpponentWin[0];
        const middleFirst = (a, b) => {
            const aMiddle = a.key.row === 4;
            const bMiddle = b.key.row === 4;
            if (aMiddle) return 1;
            if (bMiddle) return 1;
            return -1;
        };
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
    get pieces() {
        return this._pieces;
    }
    set pieces(board) {
        const remove = true;
        this._pieces = flatten(onlyMyColor(board, this.color, remove));
    }
    get myColor() {
        return this._mycolor;
    }
    set myColor(board) {
        this._mycolor = onlyMyColor(board, this.color);
    }
}

export default AI;
