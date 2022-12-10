const helpers = (store) => {
  return {
    fetch: async (url, options) => {
      let r;

      try {
        r = await fetch(url, {
          ...options,
          headers: {'Content-Type': 'application/json'},
          credentials: 'same-origin' // Sends express-session credentials with request
        });
        
        // display error message and abort on failure
        if (r.status === 500) throw new Error('internal server error!')
        if (!r.ok) throw new Error((await r.json()).error);
      } catch (e) {
        store.commit('alert', { message: e, status: 'error' });
        return null;
      }
      
      const text = await r.text();

      try {
        return JSON.parse(text);
      } catch (e) {
        console.log(e);
        return text;
      }
    }
  };
};

export default {
  install(Vue, { store }) {
    Vue.prototype.$helpers = helpers(store);
  }
};
