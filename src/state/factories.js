import range from 'lodash/range';
import Tile from '../models/Tiles';

// this could have been a Map but Vue.JS does not have Map support or Set suppoer yet
export function boardFactory() {
    return range(6)
        .map((row) => range(7)
            .map((col) => new Tile(row, col)));
}
