import { gameOver } from '../ai/score';
import playerTypes from '../constants/playerTypes';

export const actions = {
    endRound({ commit, state, getters, dispatch },{move, player}) {
        commit('makeMove', move);
        const won = gameOver(state.board, player);
        if (won) {
            commit('declareWinnner', player);
            return commit('reset');
        }
        commit('incrementRound');
        if (getters.currentPlayer.type === playerTypes.AI) {
            const aimove = getters.currentPlayer.plotMove(null, state.board);
            setTimeout(dispatch, 720,'endRound', {move: aimove, player: getters.currentPlayer}); 
        }
    }
};

export default actions;
