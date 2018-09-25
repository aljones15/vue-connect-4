/**
  * @class AI
  * @description via composition provides a Player with an ai
  * component
*/
export class AI {
    constructor() {
        this.currentRound = null;
        this.nextRound = null;
    }
    get moves() {
    
    }
    getMove(board, legal) {
        const possibleMoves = legal
            .map((row, rowIndex) => {
                return row.map((legal, colIndex) => {
                    if (legal) return board[rowIndex][colIndex];
                }).filter(t => t)
            }).reduce((acc, cur) => acc.concat(cur), []);
        return possibleMoves[0];
    }
}

export default AI;
