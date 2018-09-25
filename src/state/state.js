import { boardFactory } from './factories';
import Player from '../models/Player';
import playerTypes from '../constants/playerTypes';

const first = true;
const human = new Player(playerTypes.HUMAN, first);
const ai = new Player(playerTypes.AI);

export const state = {
            players: [human, ai],
            round: 0,
            // coerce the boolean to a number to get player index
            currentPlayer: false,
            winners: [],
            board: boardFactory(),
            thinking: false
};

export default state;
