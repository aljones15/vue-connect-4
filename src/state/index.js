import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import getters from './getters';

function storeFactory() { 
    return new Vuex.Store({
        state,
        getters,
        mutations});
}

export default storeFactory;
