import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const alertDurationMillis = 8000;

const formatContact = (contact) => {
  return contact ? `${contact.title} ${contact.first_name} ${contact.last_name}` : '';
}

const formatMedication = (medication) => {
  return medication ? medication.name : '';
}


/**
 * Storage for data that needs to be accessed from various components.
 */
const store = new Vuex.Store({
  state: {
    title: "",
    enableBack: false,
    headerLinks: {},
    account: null,
    username: null,
    entries: [],
    contacts: [],
    insurances: [],
    medications: [],
    alerts: {},
  },
  getters: {
    username(state) {
      return state.username && `@${state.username}`;
    },
    accountName(state) {
      return state.account && state.account.name;
    },
    credentials(state) {
      return state.account ? state.account.credentials : [];
    },
    populatedEntries(state) {
      return state.entries.map(e => {
        return {
          ...e,
          title: e.type === 'appointment' ? formatContact(state.contacts.find(c => c._id === e.detail))
               : e.type === 'medication' ? formatMedication(state.medications.find(m => m._id === e.detail))
               : e.detail
        };
      });
    },
  },
  mutations: {
    setHeader(state, {title, enableBack, headerLinks}) {
      state.title = title;
      state.enableBack = enableBack;
      state.headerLinks = headerLinks || {};
    },
    setAccount(state, account) {
      state.account = account || null;
    },
    setUsername(state, username) {
      state.username = username || null;
    },
    setEntries(state, entries) {
      state.entries = entries || [];
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
      const id = Date.now();  // unique identifier for each message
      Vue.set(state.alerts, id, {message, status});
      setTimeout(() => {
        this.commit('dismissAlert', id);
      }, alertDurationMillis);
    },
    dismissAlert(state, id) {
      Vue.delete(state.alerts, id);
    },
    clearAlerts(state) {
      state.alerts = {};
    }
  },
  actions: {
    async loadAccount({commit, dispatch}, {account, username}) {
      commit('setAccount', account);
      commit('setUsername', username);

      // Anything that needs to be refreshed on login/logout should be called here
      await dispatch('refreshEntries');
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
    async refreshEntries({dispatch}) {
      await dispatch('refreshCollection', {
        url: '/api/entries',
        method: 'setEntries',
      });
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

store.filter = (collection, fields, value) => {
  return store.state[collection].filter(r => fields.some(f => r[f].toLowerCase().includes(value.toLowerCase())));
}

export default store;
