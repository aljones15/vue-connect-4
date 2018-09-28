import colors from '../constants/colors';

/**
  * @class Tile
  * @param {Number} row row in the board array
  * @param {Number} col index inside a row
  * @param {colors} color either red, blue, or white defaults to white
  * @description Tile handles the state of a single connect 4 square
  * @property {Object} key contains row and col
  * @property {Boolean} taken if the tile has been selected
  * @property {colors} color the color of the circle
  * @property {Object} score the score for each color
*/
export default class Tile {
    constructor(row, col, color = colors.white) {
        this.key = {row, col};
        this._color = color;
        this._taken = false;
        this._legal = false;
        this.winner = false;
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
        this._legal = false;
        this.color = color;
    }
    get legal() {
        return this._legal;
    }
    // this is so we can set something to not legal if it has nothing under it
    set legal(covered) {
        this._legal = covered;
    }
}
