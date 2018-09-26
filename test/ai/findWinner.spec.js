import { expect } from 'chai';
import { boardFactory } from '../../src/state/factories';
import colors from '../../src/constants/colors';
import { findConnection } from '../../src/ai/score';
import Tile from '../../src/models/Tiles';

function testWinner(winner, expected) {
    expect(winner).to.be.an('array');
    expect(winner).to.have.lengthOf(2);
    const [tile, next] = winner;
    expect(tile).to.be.an.instanceOf(Tile);
    expect(tile).to.deep.eql(expected);
    expect(next).to.be.an('array');
    return next;
}

describe('findWinner', function() {
    
    it('should find a winner for the first tile', function() {
        const board = boardFactory();
        const row = 0;
        const cols = [0, 1, 2];
        cols.forEach(col => board[row][col].taken = colors.blue);
        const thisColor = board
            .map(row => row.filter(t => t.color === colors.blue));
        const winner = findConnection(board[row][0], thisColor);
        console.log('\n');
        console.log(winner[0]);
        console.log('\n');
        console.log(winner[1][0]);
        console.log('\n');
        console.log(winner[1][1]);      

    });
});
