import { boardFactory } from './factories';
import Player from '../models/Player';
import playerTypes from '../constants/playerTypes';
const human = new Player(playerTypes.human);
const ai = new Player(playerTypes.ai);

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
