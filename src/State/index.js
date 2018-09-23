import Vuex from 'vuex';
import range from 'lodash/range';
import Tile from './Tiles';

// this could have been a Map but Vue.JS does not have Map support or Set suppoer yet
export const board = range(6).map((row) => range(7).map((col) => new Tile(row, col)));

export const state = {
            players: [],
            round: 0,
            winners: [],
            board,
            thinking: false
        };

export const mutations = {
            selectPlayer (state, players) {
                state.players = players;
            },
            makeMove(state, move) {
                const { key, value} = move;
                const { row, col } = key;
                if (!Number.isInteger(row) || !Number.isInteger(col) || !value) {
                    throw new Error('Invalid Move');
                }
                state.board[row][col] = value;
            },
            thinking(state, thinking) {
                state.thinking = thinking;
            },
            incrementRound(state) {
                state.round++;
            },
            winnner(state, winner) {
                state.winners.push(winner);
            },
            reset(state) {
                state.players = [];
                state.round = 0;
                state.moves = new Map(),
                state.thinking = false
            }
       };

function storeFactory() { 
    return  new Vuex.Store({
        state,
        mutations});
}

export default storeFactory;
