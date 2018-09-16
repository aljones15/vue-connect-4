import Vuex from 'vuex';

function storeFactory() { 
    return  new Vuex.Store({
        state: {
            players: [],
            round: 0,
            winners: [],
            moves: new Map(),
            thinking: false
        },
        mutations: {
            selectPlayer (state, players) {
                state.players = players;
            },
            makeMove(state, move) {
                const [key, values] = move;
                state.moves.set(key, values);
            },
            thinking(state, pondering) {
                state.thinking = pondering;
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
       }
    });
}

export default storeFactory;
