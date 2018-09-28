import { expect } from 'chai';
import { boardFactory } from '../../src/state/factories';
import colors from '../../src/constants/colors';
import { findGaps, onlyMyColor } from '../../src/ai/score';
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
        const winners = findGaps(board, onlyRed, pieces);
        expect(winners).to.have.lengthOf(1);
        const expectedTiles = [board[row][3], board[row][4], board[row][5], board[row][6]];
        testConnection(winners[0], expectedTiles, 4);
    });
});
