import { expect } from 'chai';
import { mutations } from '../src/state';
import Player from '../src/state/Player';
import playerTypes from '../src/constants/playerTypes';

describe('mutations', function() {
    it('should see 2 human players', function() {
        const { human } = playerTypes;
        const players = [new Player(human), new Player(human)];
        const state = {players: []};
        mutations.selectPlayer(state, players);
        expect(state.players, 'expected 2 players').to.have.lengthOf(2);
        expect(state.players, 'expected players to match input').to.deep.eql(players); 
    });    
})
