import { expect } from 'chai';
import { legalMoves } from '../../src/ai';
import { mutations, boardFactory } from '../../src/state';
import colors from '../../src/constants/colors';

const { makeMove } = mutations;

function expectRow(row, assertion, index) {
    const every = row.every(c => c === assertion);
    expect(every, `Expected Every Tile in row ${index} to be ${assertion}`).to.be.true;
}

describe('legal moves', function() {

    it('a fresh board should only have legal moves on the bottom',
    function () {
    const board = boardFactory();
    const bottom = board.length - 1;
    const legals = legalMoves(board);
    expect(legals,'expected legal to be an array').to.be.an('array');
    expect(legals, 'expected legals to have 6 rows').to.have.lengthOf(6);
    legals.forEach((row, index) => {
        if (index === bottom) {
            expectRow(row, true);
        } else {
            expectRow(row, false, index);
        }
    })
  });

  it('shoud not show legal if a space is taken', function() {
    const board = boardFactory();
    const bottom = board.length - 1;
    const row = bottom;
    const col = 0;
    const state = { board };
    const move = {key: {col, row}, color: colors.red};
    makeMove(state, move);
    const legals = legalMoves(board);
    const firstFourRows = [0,1,2,3];
    firstFourRows.forEach(row => expectRow(legals[row], false, row));
    expect(legals[row][col], `Expected row ${row} col ${col}`).to.be.false;
    expect(legals[row -1][col], 'Expected the Tile aboove the taken piece to be legal').to.be.true;

  });

});
