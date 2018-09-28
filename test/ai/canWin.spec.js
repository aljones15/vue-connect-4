import { expect } from 'chai';
import { setLegal } from '../../src/ai/legal';
import { boardFactory } from '../../src/state/factories';
import colors from '../../src/constants/colors';
import { canWin } from '../../src/ai/score';


describe('canWin', function() {

    it('should see a horizontal 3 in a row win', function() {
        let board = boardFactory();
        const row = 5
        const cols = [0, 1, 2];
        cols.forEach(col => board[row][col].taken = colors.blue);
        board = setLegal(board);
        const winner = canWin(board, colors.blue);
        expect(winner).to.have.lengthOf(1);
        const expectedWin = [board[row][0], board[row][1], board[row][2], board[row][3]];
        expect(winner[0]).to.have.lengthOf(4);
        expect(winner[0]).to.deep.eql(expectedWin);
    });

    it('should see a vertical 3 in a row win', function() {
        let board = boardFactory();
        const col = 0;
        const rows = [5, 4, 3];
        rows.forEach(row => board[row][col].taken = colors.blue);
        board = setLegal(board);
        const winner = canWin(board, colors.blue);
        expect(winner).to.have.lengthOf(1);
        const expectedWin = [board[5][col], board[4][col], board[3][col], board[2][col]];
        expect(winner[0]).to.have.lengthOf(4);
        expect(winner[0]).to.deep.eql(expectedWin);

    });

    it('should see a diagnol 3 in a row win', function() {
        let board = boardFactory();
        const tiles = [board[5][0], board[4][1], board[3][2]];
        tiles.forEach(d => d.taken = colors.blue);
        const reds = [board[5][1], board[4][2], board[5][3], board[4][3]];
        reds.forEach(r => r.taken = colors.red);
        const blues = [board[5][2], board[3][3]];
        blues.forEach(r => r.taken = colors.blue);
        board = setLegal(board);
        const winner = canWin(board, colors.blue);
        expect(winner).to.have.lengthOf(1);
        const expectedWin = [board[5][0], board[4][1], board[3][2], board[2][3]];
        expect(winner[0]).to.have.lengthOf(4);
        expect(winner[0]).to.deep.eql(expectedWin);
    });

    it('should not see a win when if the winning move would be outside the board', function() {
        let board = boardFactory();
        const row = 5;
        const cols = [0, 1, 2];
        cols.forEach(col => board[row][col].taken = colors.blue);
        board[row][3].taken = colors.red;
        board = setLegal(board);
        const winner = canWin(board, colors.blue);
        expect(winner, 'Expected no winners').to.have.lengthOf(0);
    });

});
