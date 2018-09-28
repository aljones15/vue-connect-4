import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';

/**
  * @namespace VuexState
  * @description just contains the factory to init the Vuex State
*/

function storeFactory() { 
    return new Vuex.Store({
        state,
        getters,
        mutations,
        actions});
}

export default storeFactory;
