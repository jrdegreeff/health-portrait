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
    insurances: [],
    contacts: [],
    medications: [],
    alerts: {},
  },
  mutations: {
    setHeader(state, {title, enableBack, headerLinks, activeLink}) {
      state.title = title;
      state.enableBack = enableBack;
      state.headerLinks = headerLinks || {};
      state.activeLink = activeLink;
    },
    async refreshInsurances(state) {
      /**
       * Request the server for the currently available insurances.
       */
      const url = `/api/insurance-cards`;
      const res = await fetch(url).then(async r => r.json());
      state.insurances = res;
    },
    setAccount(state, account) {
      state.account = account || null;
    },
    setUsername(state, username) {
      state.username = username || null;
    },
    setContacts(state, contacts) {
      state.contacts = contacts || [];
    },
    setMedications(state, medications) {
      state.medications = medications || [];
    },
    setInsurances(state, insurances) {
      state.insurances = insurances || [];
    },
    alert(state, {message, status}) {
      Vue.set(state.alerts, message, status);
      setTimeout(() => {
        Vue.delete(state.alerts, message);
      }, 3000);
    },
  },
  actions: {
    async loadAccount({commit, dispatch}, {account, username}) {
      commit('setAccount', account);
      commit('setUsername', username);

      // Anything that needs to be refreshed on login/logout should be called here
      await dispatch('refreshContacts');
      await dispatch('refreshMedications');
      await dispatch('refreshInsurances');
    },
    async refreshCollection({state, commit}, {url, method}) {
      if (state.account) {
        const res = await fetch(url).then(async r => r.json());
        commit(method, res);
      } else {
        commit(method, null);
      }
    },
    async refreshContacts({dispatch}) {
      await dispatch('refreshCollection', {
        url: '/api/medical-contacts',
        method: 'setContacts',
      });
    },
    async refreshMedications({dispatch}) {
      await dispatch('refreshCollection', {
        url: '/api/medications',
        method: 'setMedications',
      });
    },
    async refreshInsurances({dispatch}) {
      await dispatch('refreshCollection', {
        url: '/api/insurance-cards',
        method: 'setInsurances',
      });
    },
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
