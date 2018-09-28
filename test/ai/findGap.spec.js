import { expect } from 'chai';
import { boardFactory } from '../../src/state/factories';
import colors from '../../src/constants/colors';
import { findGapWins, onlyMyColor } from '../../src/ai/score';
import { flatten } from '../../src/ai/utils';
import { setLegal } from '../../src/ai/legal';
import { testConnection } from './helpers';

const remove = true;
const testColor = colors.red;

describe('findGaps', function() {
    it('should find a horizontal gap win', function() {
        const row = 5;
        const cols = [3,4,6];
        let board = boardFactory();
        cols.forEach(col => board[row][col].taken = testColor);
        // this should not matter in this case but leaving it in
        board = setLegal(board);
        const pieces = flatten(onlyMyColor(board, testColor, remove));
        const onlyRed = onlyMyColor(board, testColor);
        const winners = findGapWins(board, onlyRed, pieces);
        expect(winners).to.have.lengthOf(1);
        const expectedTiles = [board[row][3], board[row][4], board[row][5], board[row][6]];
        testConnection(winners[0], expectedTiles, 4);
    });
    it('should find a diagnol gap win', function() {
        const reds = [[5,0], [4,1],[2,3], [5,2]];
        const blues = [[5,1],[5,3],[4,2],[4,3], [3,3]];
        let board = boardFactory();
        reds.forEach(([row, col]) => board[row][col].taken = colors.red);
        blues.forEach(([row, col]) => board[row][col].taken = colors.blue);
        // this should not matter in this case but leaving it in
        board = setLegal(board);
        const pieces = flatten(onlyMyColor(board, testColor, remove));
        const onlyRed = onlyMyColor(board, testColor);
        const winners = findGapWins(board, onlyRed, pieces);
        expect(winners).to.have.lengthOf(1);
        const expectedTiles = [board[5][0], board[4][1], board[3][2], board[2][3]];
        testConnection(winners[0], expectedTiles, 4);
    });

});
