import colors from '../constants/colors';

/**
  * @class Tile
  * @param {Number} row row in the board array
  * @param {Number} col index inside a row
  * @param {String} Color either red, blue, or white
  * @description Tile handles the state of a single connect 4 square
*/
export default class Tile {
    constructor(row, col, color = colors.white) {
        this.order = {row, col};
        this._color = color;
        this._taken = false;
        this.resetScore();
    }
    resetScore() {
        this.score = {
            player1: 0,
            player2: 0
        }
    }
    get color() {
        return this._color;
    }
    set color(c) {
        this._color = c;
    }
    get taken() {
        return this._taken;
    }
    set taken(color) {
        this._taken = true;
        this.color = color;
    }
}
