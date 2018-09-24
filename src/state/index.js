import Vuex from 'vuex';
import range from 'lodash/range';
import Tile from '../models/Tiles';

// this could have been a Map but Vue.JS does not have Map support or Set suppoer yet
export function boardFactory() {
    return range(6).map((row) => range(7).map((col) => new Tile(row, col)));

} 
export const state = {
            players: [],
            round: 0,
            // coerce the boolean to a number to get player index
            currentPlayer: false,
            winners: [],
            board: boardFactory(),
            thinking: false
        };

export const mutations = {
            selectPlayer (state, players) {
                state.players = players;
            },
            makeMove(state, move) {
                const { key, color} = move;
                const { row, col } = key;
                if (!Number.isInteger(row) || !Number.isInteger(col) || !color) {
                    throw new Error('Invalid Move');
                }
                state.board[row][col].taken = color;
            },
            thinking(state, thinking) {
                state.thinking = thinking;
            },
            incrementRound(state) {
                state.round++;
                state.currentPlayer = !state.currentPlayer;
            },
            declareWinnner(state, winner) {
                state.winners.push(winner);
            },
            reset(state) {
                state.players = [];
                state.round = 0;
                state.board = boardFactory();
                state.thinking = false;
                state.currentPlayer = false;
            }
       };

function storeFactory() { 
    return  new Vuex.Store({
        state,
        mutations});
}

export default storeFactory;
