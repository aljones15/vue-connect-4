import { expect } from 'chai';
import Tile from '../../src/models/Tiles';

export function testConnection(connection, expectedTiles, depth = 3) {
    expect(connection, 'Expected Connection to be an array').to.be.an('array');
    expect(connection, `expected the depth of ${depth}`).to.have.lengthOf(depth);
    connection.forEach(c => expect(c, 'Expected Each Connection to be a Tile').to.be.an.instanceOf(Tile));
    expect(connection, 'expected connection to match the prepared test case array').to.deep.eql(expectedTiles);
}

