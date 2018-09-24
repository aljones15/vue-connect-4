export const getters = {
    currentPlayer(state) {
        const index = Number(state.currentPlayer);
        if (!state.players || !state.players[index]) return null;
        return state.players[index];
    }
}
export default getters;
