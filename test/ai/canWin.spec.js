import { expect } from 'chai';
import legalMoves from '../../src/ai/legal';
import { boardFactory } from '../../src/state/factories';
import colors from '../../src/constants/colors';
import { canWin } from '../../src/ai/score';
import { randomStart } from '../../src/ai/utils';


describe('can win', function() {
    it('it should see a horizontal 3 in a row win', function() {
        const board = boardFactory();
        const row = 5
        const cols = [0, 1, 2];
        cols.forEach(col => board[row][col].taken = colors.blue);
        const legal = legalMoves(board);
        const winner = canWin(board, legal, colors.blue);
        expect(winner).to.have.lengthOf(1);
        const expectedWin = [board[row][0], board[row][1], board[row][2], board[row][3]];
        expect(winner[0]).to.have.lengthOf(4);
        expect(winner[0]).to.deep.eql(expectedWin);
    });

    it('should see a vertical 3 in a row win', function() {
        const board = boardFactory();
        const col = 0;
        const rows = [0, 1, 2];
        rows.forEach(row => board[row][col].taken = colors.blue);
        const legal = legalMoves(board);
        const winner = canWin(board, legal, colors.blue);

    });

    it('should see a diagnol 3 in a row win', function() {
        const board = boardFactory();

    });

    it('should not see a win when if the winning move would be outside the board', function() {
        const board = boardFactory();
        const row = 0;
        const cols = [0, 1, 2];
        cols.forEach(col => board[row][col].taken = colors.blue);
        board[row][3].taken = colors.red;
        const legal = legalMoves(board);
        const winner = canWin(board, legal, colors.blue);
    });

});
