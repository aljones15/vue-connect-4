import { boardFactory } from './factories';
import { setLegal } from '../ai/legal';

/**
  * @namespace mutations
  * @description has the Vuex mutations in it
  * @memberof VuexState
  * @return {Object}
*/
export const mutations = {
            /**
              * @function selectPlayer
              * @param {Object} state
              * @param {Array} players
              * @description set the current players
              * @memberof VuexState.mutations
              * @return {Object}
            */
            selectPlayer (state, players) {
                state.players = players;
            },
            /**
              * @function makeMove
              * @param {Object} state
              * @param {Object} move
              * @description mutations the board with a new move
              * @memberof VuexState.mutations
              * @return {Object}
            */
            makeMove(state, move) {
                const { key, color} = move;
                const { row, col } = key;
                if (!Number.isInteger(row) || !Number.isInteger(col) || !color) {
                    throw new Error('Invalid Move');
                }
                state.board[row][col].taken = color;
                state.board = setLegal(state.board);
            },
            /**
              * @function thinking
              * @param {Object} state
              * @param {Boolean} thinking
              * @description sets thinking to true or false
              * @memberof VuexState.mutations
              * @return {Object}
            */
            thinking(state, thinking) {
                state.thinking = thinking;
            },
            /**
              * @function incrementRound
              * @param {Object} state
              * @description incrementRound moves the round up one
              * then changes the currentPlayer index
              * @memberof VuexState.mutations
              * @return {Object}
            */
            incrementRound(state) {
                state.round++;
                state.currentPlayer = !state.currentPlayer;
            },
            /**
              * @function declareWinner
              * @param {Object} state
              * @param {Object} winner
              * @description adds a winner to the winner's array
              * @memberof VuexState.mutations
              * @return {Object}
            */
            declareWinnner(state, winner) {
                state.winners.push(winner);
            },
            /**
              * @function reset
              * @param {Object} state
              * @description resets the players, round, board,
              * thinking, and currentPlayer
              * @memberof VuexState.mutations
              * @return {Object}
            */
            reset(state) {
                state.round = 0;
                state.board = boardFactory();
                state.thinking = false;
                state.currentPlayer = false;
            }
};
export default mutations;
