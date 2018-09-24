import { boardFactory } from './factories';
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
export default mutations;
