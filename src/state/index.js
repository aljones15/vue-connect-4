import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';

function storeFactory() { 
    return new Vuex.Store({
        state,
        mutations});
}

export default storeFactory;
