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
    account: null,
    username: null,
    alerts: {},
  },
  mutations: {
    setTitle(state, {title, enableBack}) {
      state.title = title;
      state.enableBack = enableBack;
    },
    setAccount(state, account) {
      state.account = account || null;
    },
    setUsername(state, username) {
      state.username = username || null;
    },
    alert(state, {message, status}) {
      Vue.set(state.alerts, message, status);
      setTimeout(() => {
        Vue.delete(state.alerts, message);
      }, 3000);
    },
  },
  actions: {
    
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
