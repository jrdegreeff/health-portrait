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
    contacts: null, // All contacts created in the app
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
    async refreshContacts(state) {
      /**
       * Request the server for the currently available contacts.
       */
      const url = `/api/medical-contacts`;
      const res = await fetch(url).then(async r => r.json());
      state.contacts = res;
    },
  },
  actions: {
    
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
