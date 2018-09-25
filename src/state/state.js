import { boardFactory } from './factories';
import Player from '../models/Player';
import playerTypes from '../constants/playerTypes';

/**
  @namespace state
  @memberof VuexState
  @description initial state for Vuex
*/

const first = true;
const human = new Player(playerTypes.HUMAN, first);
const ai = new Player(playerTypes.AI);

export const state = {
            /** 
                @type {Player[]}
                @memberof VuexState.state
                @description starts out with a human and an AI
            */
            players: [human, ai],
            /** 
                @type {Number}
                @memberof VuexState.state
                @description starts at 0
            */
            round: 0,
            /** 
              *  @type {Boolean}
              *  @memberof VuexState.state
              *  @description 0 coerces to false true too 1
              *  so if false first player in players is selected
              *  used by {@link VuexState.getters.currentPlayer}
            */
            currentPlayer: false,
            /** 
                @type {Player[]}
                @memberof VuexState.state
                @description starts out empty filled by winning
                {@link Player}
            */
            winners: [],
            /** 
              *  @type {Array.Tile[]}
              *  @memberof VuexState.state
              *  @description starts out with a blank board all white
              *   contains an Array of Arrays of {@link Tile}
            */
            board: boardFactory(),
            /** 
                @type {Boolean}
                @memberof VuexState.state
                @description starts out false
            */
            thinking: false
};

export default state;
