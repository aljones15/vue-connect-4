import { expect } from 'chai';
import { boardFactory } from '../../src/state/factories';
import colors from '../../src/constants/colors';
import { findConnections } from '../../src/ai/score';
import Tile from '../../src/models/Tiles';

function testConnection(connection, expectedTiles) {
    expect(connection, 'Expected Connection to be an array').to.be.an('array');
    expect(connection, 'expected the default depth of 3').to.have.lengthOf(3);
    connection.forEach(c => expect(c, 'Expected Each Connection to be a Tile').to.be.an.instanceOf(Tile));
    expect(connection, 'expected connection to match the prepared test case array').to.deep.eql(expectedTiles);
}

describe('findConnections', function() {
    
    it('should find a connection for a horizontal line from left to right', function() {
        const board = boardFactory();
        const row = 0;
        const cols = [0, 1, 2];
        cols.forEach(col => board[row][col].taken = colors.blue);
        const thisColor = board
            .map(row => row.map(t => t.color === colors.blue ? t : false));
        const connections = findConnections(board[row][0], thisColor);        
        expect(connections, 'Expected one connection').to.have.lengthOf(1);
        const expectedTiles = [board[row][0], board[row][1], board[row][2]];
        testConnection(connections[0], expectedTiles);
    });

    it('should find a connection for a horizontal line from right to left', function() {
        const board = boardFactory();
        const row = 0;
        const cols = [0, 1, 2];
        cols.forEach(col => board[row][col].taken = colors.blue);
        const thisColor = board
            .map(row => row.map(t => t.color === colors.blue ? t : false));
        const connections = findConnections(board[row][2], thisColor);
        expect(connections, 'Expected one connection').to.have.lengthOf(1); 
        const expectedTiles = [board[row][2], board[row][1], board[row][0]];
        testConnection(connections[0], expectedTiles);
    });

    it('should find a connection for a vertical line from bottom to top', function() {
        const board = boardFactory();
        const col = 0;
        const rows = [0, 1, 2];
        rows.forEach(row => board[row][col].taken = colors.blue);
        const thisColor = board
            .map(row => row.map(t => t.color === colors.blue ? t : false));
        const connections = findConnections(board[0][col], thisColor);
        expect(connections, 'Expected one connection').to.have.lengthOf(1); 
        const expectedTiles = [board[0][col], board[1][col], board[2][col]];
        testConnection(connections[0], expectedTiles);
    });

    it('should find a connection for a vertical line from top to bottom', function() {
        const board = boardFactory();
        const col = 1;
        const rows = [0, 1, 2];
        rows.forEach(row => board[row][col].taken = colors.blue);
        const thisColor = board
            .map(row => row.map(t => t.color === colors.blue ? t : false));
        const connections = findConnections(board[2][col], thisColor);
        expect(connections, 'Expected one connection').to.have.lengthOf(1); 
        const expectedTiles = [board[2][col], board[1][col], board[0][col]];
        testConnection(connections[0], expectedTiles);
    });

    it('should find a connection for a diagnol line from bottom to top', function() {
        // NOTE: even though this configuration is not possible existing rules
        // prevent floating pieces
        const board = boardFactory();
        const rows = [0, 1, 2];
        rows.forEach(row => board[row][row].taken = colors.blue);         
        const thisColor = board
            .map(row => row.map(t => t.color === colors.blue ? t : false));
        const connections = findConnections(board[0][0], thisColor);
        expect(connections, 'Expected one connection').to.have.lengthOf(1);
        const expectedTiles = [board[0][0], board[1][1], board[2][2]];
        testConnection(connections[0], expectedTiles); 

    });

    it('should find a connection for a diagnol line from top to bottom', function() {
        // NOTE: even though this configuration is not possible existing rules
        // prevent floating pieces
        const board = boardFactory();
        const rows = [0, 1, 2];
        rows.forEach(d => board[d][d].taken = colors.blue); 
        const thisColor = board
            .map(row => row.map(t => t.color === colors.blue ? t : false));
        const connections = findConnections(board[2][2], thisColor);
        expect(connections, 'Expected one connection').to.have.lengthOf(1);
        const expectedTiles = [board[2][2], board[1][1], board[0][0]];
        testConnection(connections[0], expectedTiles);
    });

    it('should not find a connection', function() {
        // NOTE: even though this configuration is not possible existing rules
        // prevent floating pieces
        const board = boardFactory();
        const rows = [0, 2, 5];
        rows.forEach(row => board[row][row].taken = colors.blue);         
        const thisColor = board
            .map(row => row.map(t => t.color === colors.blue ? t : false));
        const connections = findConnections(board[0][0], thisColor);
        expect(connections).to.be.an('array');
        expect(connections).to.have.lengthOf(0);
    });

    it('should not find a connection for a different color', function() {
        const board = boardFactory();
        const row = 0;
        const cols = [0, 1, 2];
        cols.forEach(col => board[row][col].taken = colors.blue);
        const thisColor = board
            .map(row => row.map(t => t.color === colors.red ? t : false));
        const connections = findConnections(board[row][0], thisColor);
        expect(connections).to.be.an('array');
        expect(connections).to.have.lengthOf(0);
    });

    it('should find multiple connections', function() {
        const board = boardFactory();
        const row = 0;
        const col = 0;
        const range = [0, 1, 2];
        range.forEach(r => {
            board[row][r].taken = colors.red;
            board[r][col].taken = colors.red;
            board[r][r].taken = colors.red;
        });
        const thisColor = board
            .map(row => row.map(t => t.color === colors.red ? t : false));
        const connections = findConnections(board[0][0], thisColor);
        expect(connections).to.have.lengthOf(3);
    });

});
