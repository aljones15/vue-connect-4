import range from 'lodash/range';
import Tile from '../models/Tiles';

/**
  @namespace factories
  @memberof VuexState
  @description factories for initial state or resets
*/

/**
  * @description makes a fresh new board for each game
  * this could have been a Map 
  * but Vue.JS does not have Map support or Set support yet
  * @memberof VuexState.factories
  * @return {Array.Tile[]}
*/
export function boardFactory() {
    return range(6)
        .map((row) => range(7)
            .map((col) => new Tile(row, col)));
}
