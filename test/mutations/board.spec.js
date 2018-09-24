import { expect } from 'chai';
import { mutations, boardFactory } from '../../src/state';
import Tile from '../../src/state/Tiles';
import colors from '../../src/constants/colors';

const { makeMove } = mutations;
const board = boardFactory();

describe('should implement moves', function() {

    it('should move to the first row first column', function() {
        const row = 5;
        const col = 6;
        expect(board[row][col].color, 'Expected Intital Color to be White').to.equal(colors.white);
        const state = { board };
        const key = {row, col };
        const value = new Tile(row,col, colors.red);
        makeMove(state, {key, value});
        expect(state.board[row][col].color, 'Expected new Color to be Red').to.equal(colors.red);
        
    });

    it('should throw on bad row', function() {
        const state = { board };
        const key = {col: 0};
        const value = new Tile(0,0);
        expect(() => makeMove(state, {key, value})).to.throw('Invalid Move');
    });

    it('should throw on bad col', function() {
        const state = { board };
        const key = {row: 0};
        const value = new Tile(0,0);
        expect(() => makeMove(state, {key, value})).to.throw('Invalid Move');
    });

    it('should throw on bad value', function() {
        const state = { board };
        const key = {row: 0, col: 0};
        const value = null;
        expect(() => makeMove(state, {key, value})).to.throw('Invalid Move');
    });

});
