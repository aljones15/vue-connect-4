import playerTypes from '../constants/playerTypes';
import colors from '../constants/colors';
import AI from './AI';
import legalMoves from '../ai/legal';

export default class Player {
    constructor(type, first = false) {
        this.type = type;
        this.wins = 0;
        if (this.type === playerTypes.AI) {
            this.ai = new AI();
        }
        this.color = first ? colors.red : colors.blue;
    }
    produceMove(tile) {
        const move = {key: tile.order, color: this.color}; 
        return move;
    }
    plotMove(tile, board) {
        const legal = legalMoves(board);
        if (this.type === playerTypes.HUMAN) {
            const { order } = tile;
            const { row, col } = order;
            const allowed = legal[row][col];
            if (allowed) return this.produceMove(tile);
            return null;
        }
        const aiTile = this.ai.getMove(board, legal);
        return this.produceMove(aiTile);
    }
}
