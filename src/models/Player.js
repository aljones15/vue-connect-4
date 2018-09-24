import playerTypes from '../constants/playerTypes';
import AI from './AI';

export default class Player {
    constructor(type) {
        this.type = type;
        this.wins = 0;
        if (this.type === playerTypes.AI) {
            this.ai = new AI();
        }
    }
}
