import { boardFactory } from './factories';

export const state = {
            players: [],
            round: 0,
            // coerce the boolean to a number to get player index
            currentPlayer: false,
            winners: [],
            board: boardFactory(),
            thinking: false
};

export default state;
