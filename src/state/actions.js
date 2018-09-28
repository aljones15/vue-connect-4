import { gameOver } from '../ai/score';

export const actions = {
    endRound({ commit, state },{move, player}) {
        commit('makeMove', move);
        const won = gameOver(state.board, player);
        if (won) {
            commit('declareWinnner', player);
            return commit('reset');
        }
        return commit('incrementRound');
    }
};

export default actions;
