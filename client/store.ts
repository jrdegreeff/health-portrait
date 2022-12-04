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
    headerLinks: {},
    activeLink: undefined,
    account: null,
    username: null,
    contacts: null,
    alerts: {},
  },
  mutations: {
    setHeader(state, {title, enableBack, headerLinks, activeLink}) {
      state.title = title;
      state.enableBack = enableBack;
      state.headerLinks = headerLinks || {};
      state.activeLink = activeLink;
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
