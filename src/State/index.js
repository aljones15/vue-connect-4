import Vuex from 'vuex';

export const state = {
            players: [],
            round: 0,
            winners: [],
            moves: new Map(),
            thinking: false
        };

export const mutations = {
            selectPlayer (state, players) {
                state.players = players;
            },
            makeMove(state, move) {
                const [key, values] = move;
                state.moves.set(key, values);
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
