import { expect } from 'chai';
import { boardFactory } from '../../src/state/factories';
import colors from '../../src/constants/colors';
import { findConnection } from '../../src/ai/score';
import Tile from '../../src/models/Tiles';

function testConnection(connection, expectedTile) {
    expect(connection).to.be.an('array');
    const [tile, next] = connection;
    expect(tile).to.be.an.instanceOf(Tile);
    expect(tile).to.deep.eql(expectedTile);
    expect(next).to.be.an('array');
    return next;
}

describe('findConnection', function() {
    
    it('should find a connection for a horizontal line', function() {
        const board = boardFactory();
        const row = 0;
        const cols = [0, 1, 2];
        cols.forEach(col => board[row][col].taken = colors.blue);
        const thisColor = board
            .map(row => row.filter(t => t.color === colors.blue));
        const connection = findConnection(board[row][0], thisColor);
        const secondRow = testConnection(connection, board[row][0]);
        const thirdRow = testConnection(secondRow[0], board[row][1]);
        const finalRow = testConnection(thirdRow[0], board[row][2]);
        expect(finalRow).to.have.lengthOf(0);
    });

    it('should find a connection for a vertical line', function() {
        const board = boardFactory();
        const col = 0;
        const rows = [0, 1, 2];
        rows.forEach(row => board[row][col].taken = colors.blue);
        const thisColor = board
            .map(row => row.filter(t => t.color === colors.blue));
        const connection = findConnection(board[0][0], thisColor);
        const secondRow = testConnection(connection, board[0][col]);
        const thirdRow = testConnection(secondRow[0], board[1][col]);
        const finalRow = testConnection(thirdRow[0], board[2][col]);
        expect(finalRow).to.have.lengthOf(0);
    });

    it('should find a connection for a diagnol line', function() {
        // NOTE: even though this configuration is not possible existing rules
        // prevent floating pieces
        const board = boardFactory();
        const rows = [0, 1, 2];
        rows.forEach(row => board[row][row].taken = colors.blue);
         
        const thisColor = board
            .map(row => row.filter(t => t.color === colors.blue));
        const connection = findConnection(board[0][0], thisColor);
        const secondRow = testConnection(connection, board[0][0]);
        const thirdRow = testConnection(secondRow[0], board[1][1]);
        const finalRow = testConnection(thirdRow[0], board[2][2]);
        expect(finalRow).to.have.lengthOf(0);
    });

    it('should not find a connection', function() {
        // NOTE: even though this configuration is not possible existing rules
        // prevent floating pieces
        const board = boardFactory();
        const rows = [0, 2, 5];
        rows.forEach(row => board[row][row].taken = colors.blue);
         
        const thisColor = board
            .map(row => row.filter(t => t.color === colors.blue));
        const connection = findConnection(board[0][0], thisColor);
        expect(connection).to.be.an('array');
        expect(connection).to.have.lengthOf(0);
    });

    it('should not find a connection for a different color', function() {
        const board = boardFactory();
        const row = 0;
        const cols = [0, 1, 2];
        cols.forEach(col => board[row][col].taken = colors.blue);
        const thisColor = board
            .map(row => row.filter(t => t.color === colors.red));
        const connection = findConnection(board[row][0], thisColor);
        expect(connection).to.be.an('array');
        expect(connection).to.have.lengthOf(0);
    });

});
