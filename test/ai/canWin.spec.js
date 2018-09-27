import { expect } from 'chai';
import legalMoves from '../../src/ai/legal';
import { boardFactory } from '../../src/state/factories';
import colors from '../../src/constants/colors';
import { canWin } from '../../src/ai/score';


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
        expect(winner).to.have.lengthOf(1);
        const expectedWin = [board[col][0], board[col][1], board[col][2], board[col][3]];
        expect(winner[0]).to.have.lengthOf(4);
        expect(winner[0]).to.deep.eql(expectedWin);

    });

    it('should see a diagnol 3 in a row win', function() {
        const board = boardFactory();
        const tiles = [board[5][0], board[4][1], board[3][2]];
        tiles.forEach(d => d.taken = colors.blue);
        const reds = [board[5][1], board[4][2], board[5][3], board[4][3]];
        reds.forEach(r => r.taken = colors.red);
        const blues = [board[5][2], board[3][3]];
        blues.forEach(r => r.taken = colors.blue);
        const legal = legalMoves(board);
        const winner = canWin(board, legal, colors.blue);
        expect(winner).to.have.lengthOf(1);
        const expectedWin = [board[5][0], board[4][1], board[3][2], board[2][3]];
        expect(winner[0]).to.have.lengthOf(4);
        expect(winner[0]).to.deep.eql(expectedWin);
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
