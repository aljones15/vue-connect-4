import playerTypes from '../constants/playerTypes';
import colors from '../constants/colors';
import AI from './AI';
import legalMoves from '../ai/legal';

/**
  * @class Player
  * @param {String} type either AI or HUMAN
  * @param {Boolean} first if the player starts the game
  * @description class that encapsulates
  * the player logic for the game
*/
export class Player {
    constructor(type, first = false) {
        this.type = type;
        this.wins = 0;
        if (this.type === playerTypes.AI) {
            this.ai = new AI();
        }
        this.color = first ? colors.red : colors.blue;
    }
    /**
      * @param {Object} tile a tile from the board
      * @return {Object} move a move object to mutate the state
    */
    produceMove(tile) {
        const move = {key: tile.order, color: this.color}; 
        return move;
    }
    /**
      * @param {Object} tile a player choosen tile
      * @param {Array} board the current board
      * @return {Object} move returns a move
      * @description if human we check for legal then return the move
      * if ai we use the getMove function
    */
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
export default Player;
