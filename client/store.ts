import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various components.
 */
const store = new Vuex.Store({
  state: {
    // TODO
  },
  mutations: {
    // TODO
  },
  actions: {
    // TODO
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
