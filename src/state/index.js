import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import getters from './getters';

/**
  * @namespace VuexState
  * @description just contains the factory to init the Vuex State
*/

function storeFactory() { 
    return new Vuex.Store({
        state,
        getters,
        mutations});
}

export default storeFactory;
