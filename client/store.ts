import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various components.
 */
const store = new Vuex.Store({
  state: {
    title: "",
    enableBack: false,
    username: null,
    entries: [],
    alerts: {},
  },
  mutations: {
    setTitle(state, payload) {
      state.title = payload.title;
      state.enableBack = payload.enableBack;
    },
    setUsername(state, username) {
      state.username = username;
    },
    alert(state, payload) {
      Vue.set(state.alerts, payload.message, payload.status);
      setTimeout(() => {
        Vue.delete(state.alerts, payload.message);
      }, 3000);
    },
    async refreshEntries(state) {
      /**
       * Request the server for the currently available entries.
       */
      const url = '/api/entries';
      const res = await fetch(url).then(async r => r.json());
      state.entries = res;
    },
  },
  actions: {
    
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
