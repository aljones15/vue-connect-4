import { expect } from 'chai';
import mutations from '../../src/state/mutations';
import { boardFactory } from '../../src/state/factories';
import Player from '../../src/models/Player';
import playerTypes from '../../src/constants/playerTypes';

const board = boardFactory();
const {incrementRound, declareWinnner, reset} = mutations;

describe('it should mutate a round', function() {
    let state; 
    before(function() {
        state = {round: 1, winners: []};
    });

    step('should increment a round', function() {
        incrementRound(state);
        expect(state.round, 'Expected Round to be 2').to.equal(2);
    });

    step('should declare a winner', function() {
        expect(state.winners).to.have.lengthOf(0);
        const { human } = playerTypes;
        const player = new Player(human);
        declareWinnner(state, player);
        expect(state.round, 'Expected round to not change').to.equal(2);
        expect(state.winners, 'Expected winners to contain a winner').to.have.lengthOf(1);
        expect(state.winners[0], 'Expected Winner to be player').to.deep.eql(player);
    });

    step('should reset the game', function() {
        reset(state);
        const resetState = {
            currentPlayer: false,
            round: 0,
            board,
            thinking: false,
            winners: state.winners,
            won: false,
        };
        expect(state, 'Expected State to reset but winners remain').to.deep.eql(resetState);
    });
});
