import colors from '../constants/colors';

export default class Tile {
    constructor(row, col, color = colors.white) {
        this.order = {row, col};
        this._color = color;
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
}
