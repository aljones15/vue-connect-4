import { expect } from 'chai';
import { withNeighbors } from '../../src/ai/score';
import { boardFactory } from '../../src/state/factories';
const board = boardFactory();

describe('score - withNeighbors', function() {

    it('should return an empty top row', function() {
        const tile = board[0][4];
        const neighbors = withNeighbors(tile, board);
        expect(neighbors).to.be.an('array');
        expect(neighbors[0], 'Expected Top Row to be Empty').to.have.lengthOf(0);
        expect(neighbors[1], 'Expected Middle Row to have 3').to.have.lengthOf(3);
        expect(neighbors[2], 'Expected Bottom Row to have 3').to.have.lengthOf(3);
        expect(neighbors[1], 'Expected neighbors to include tile').to.include(tile);
        expect(neighbors[1][1], 'Expected tile to be the middle').to.deep.eql(tile);
    });

    it('should return an empty bottom row', function() {
        const tile = board[5][4];
        const neighbors = withNeighbors(tile, board);
        expect(neighbors).to.be.an('array');
        expect(neighbors[0], 'Expected Top Row to have 3').to.have.lengthOf(3);
        expect(neighbors[1], 'Expected Middle Row to have 3').to.have.lengthOf(3);
        expect(neighbors[2], 'Expected Bottom Row to have 0').to.have.lengthOf(0);
        expect(neighbors[1], 'Expected neighbors to include tile').to.include(tile);
        expect(neighbors[1][1], 'Expected tile to be the middle').to.deep.eql(tile);
    });

    it('should return only 2 neighbors when on the left side', function() {
        const tile = board[1][0];
        const neighbors = withNeighbors(tile, board);
        expect(neighbors).to.be.an('array');
        expect(neighbors[0], 'Expected Top Row to be have 2').to.have.lengthOf(2);
        expect(neighbors[1], 'Expected Middle Row to have 2').to.have.lengthOf(2);
        expect(neighbors[2], 'Expected Bottom Row to have 2').to.have.lengthOf(2);
        expect(neighbors[1], 'Expected neighbors to include tile').to.include(tile);
        expect(neighbors[1][0], 'Expected tile to be the first in the middle').to.deep.eql(tile);
    });

    it('should return only 2 neighbors when on the right side', function() {
        const tile = board[1][6];
        const neighbors = withNeighbors(tile, board);
        expect(neighbors).to.be.an('array');
        expect(neighbors[0], 'Expected Top Row to be have 2').to.have.lengthOf(2);
        expect(neighbors[1], 'Expected Middle Row to have 2').to.have.lengthOf(2);
        expect(neighbors[2], 'Expected Bottom Row to have 2').to.have.lengthOf(2);
        expect(neighbors[1], 'Expected neighbors to include tile').to.include(tile);
        expect(neighbors[1][1], 'Expected tile to be the first in the middle').to.deep.eql(tile);
    });

    it('should return a smaller set when on the top left edge', function() {
        const tile = board[0][0];
        const neighbors = withNeighbors(tile, board);
        expect(neighbors).to.be.an('array');
        expect(neighbors[0], 'Expected Top Row to be have 0').to.have.lengthOf(0);
        expect(neighbors[1], 'Expected Middle Row to have 2').to.have.lengthOf(2);
        expect(neighbors[2], 'Expected Bottom Row to have 2').to.have.lengthOf(2);
        expect(neighbors[1], 'Expected neighbors to include tile').to.include(tile);
        expect(neighbors[1][0], 'Expected tile to be the first in the middle').to.deep.eql(tile);
    });

    it('should return a smaller set when on the top right edge', function() {
        const tile = board[0][6];
        const neighbors = withNeighbors(tile, board);
        expect(neighbors).to.be.an('array');
        expect(neighbors[0], 'Expected Top Row to be have 0').to.have.lengthOf(0);
        expect(neighbors[1], 'Expected Middle Row to have 2').to.have.lengthOf(2);
        expect(neighbors[2], 'Expected Bottom Row to have 2').to.have.lengthOf(2);
        expect(neighbors[1], 'Expected neighbors to include tile').to.include(tile);
        expect(neighbors[1][1], 'Expected tile to be the first in the middle').to.deep.eql(tile);
    });

    it('should return a smaller set when on the bottom right edge', function() {
        const tile = board[5][6];
        const neighbors = withNeighbors(tile, board);
        expect(neighbors).to.be.an('array');
        expect(neighbors[0], 'Expected Top Row to be have 2').to.have.lengthOf(2);
        expect(neighbors[1], 'Expected Middle Row to have 2').to.have.lengthOf(2);
        expect(neighbors[2], 'Expected Bottom Row to have 0').to.have.lengthOf(0);
        expect(neighbors[1], 'Expected neighbors to include tile').to.include(tile);
        expect(neighbors[1][1], 'Expected tile to be the first in the middle').to.deep.eql(tile);
    });

    it('should return a smaller set when on the bottom left edge', function() {
        const tile = board[5][0];
        const neighbors = withNeighbors(tile, board);
        expect(neighbors).to.be.an('array');
        expect(neighbors[0], 'Expected Top Row to be have 2').to.have.lengthOf(2);
        expect(neighbors[1], 'Expected Middle Row to have 2').to.have.lengthOf(2);
        expect(neighbors[2], 'Expected Bottom Row to have 0').to.have.lengthOf(0);
        expect(neighbors[1], 'Expected neighbors to include tile').to.include(tile);
        expect(neighbors[1][0], 'Expected tile to be the first in the middle').to.deep.eql(tile);
    });

});
