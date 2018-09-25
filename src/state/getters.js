/**
  @namespace getters
  @memberof VuexState
  @description factories for initial state or resets
*/

export const getters = {
/**
  * @description computers the current player from a boolean
  * and an array with length 2
  * @param {Object} state
  * @memberof VuexState.getters
  * @return {Player}
*/
    currentPlayer(state) {
        const index = Number(state.currentPlayer);
        if (!state.players || !state.players[index]) return null;
        return state.players[index];
    }
}
export default getters;
