import { expect } from 'chai';
import { legalMoves } from '../../src/ai';
import { boardFactory } from '../../src/state';

describe('legal moves', function() {
    it('a fresh board should only have legal moves on the bottom', function () {
    const board = boardFactory();
    const legals = legalMoves(board);
    expect(legals,'expected legal to be an array').to.be.an('array');
    expect(legals, 'expected legals to have 6 rows').to.have.lengthOf(6);
    console.log(legals);
    legals.forEach((row, index) => {
        if (index === 5) {
            expect(row.every(c => c === true), 'Expected every bottom row to be true').to.be.true;
        } else {
            expect(row.every(c => c === false), 'Expected every other row to be false').to.be.true;
        }
    })
  });
});
