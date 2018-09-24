import { expect } from 'chai';
import mutations from '../../src/state/mutations';
import Player from '../../src/models/Player';
import playerTypes from '../../src/constants/playerTypes';

describe('player mutations', function() {

    it('should see 2 human players', function() {
        const { human } = playerTypes;
        const players = [new Player(human), new Player(human)];
        const state = {players: []};
        mutations.selectPlayer(state, players);
        expect(state.players, 'expected 2 players').to.have.lengthOf(2);
        expect(state.players, 'expected players to match input').to.deep.eql(players); 
    });

    it('should see 1 human players and 1 AI', function() {
        const { human, ai } = playerTypes;
        const players = [new Player(human), new Player(ai)];
        const state = {players: []};
        mutations.selectPlayer(state, players);
        expect(state.players, 'expected 2 players').to.have.lengthOf(2);
        expect(state.players, 'expected players to match input').to.deep.eql(players); 
    });

    it('should be thinking', function() {
        const state = {};
        const pondering = true;
        mutations.thinking(state, pondering);
        expect(state).to.have.property('thinking');
        expect(state.thinking, 'expected pondering to be true').to.be.true;
    });

    it('should not be thinking', function() {
        const state = {};
        const pondering = false;
        mutations.thinking(state, pondering);
        expect(state).to.have.property('thinking');
        expect(state.thinking, 'expected pondering to be false').to.be.false;
    });

})
