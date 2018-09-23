import colors from '../constants/colors';

export default class Tile {
    constructor(row, col) {
        this.order = {row, col};
        this.color = colors.white;
        this.resetScore();
    }
    resetScore() {
        this.score = {
            player1: 0,
            player2: 0
        }
    }
}
