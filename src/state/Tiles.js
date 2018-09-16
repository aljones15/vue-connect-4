import colors from '../constants/colors';

export default class Tile {
    constructor(order) {
        this.order = order;
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
