const nonEmptyRegex = /^(?!\s*$).+/i;
const usernameRegex = /^\w+$/i;
const passwordRegex = /^\S+$/;
const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
const dateRegex = /^[0-9]{4}-(1[0-2]|0[1-9])-(3[01]|[12][0-9]|0[1-9])$/;

const helpers = (store) => {
  const validateRegex = (regex, message) => v => regex.test(v) ? '' : message;
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
        return text;
      }
    },
    validators: {
      nonEmpty: validateRegex(nonEmptyRegex, 'field cannot be blank'),
      username: validateRegex(usernameRegex, 'username can only have letters and numbers'),
      password: validateRegex(passwordRegex, 'password cannot have spaces'),
      phoneNumber: validateRegex(phoneRegex, 'invalid phone number'),
      date: validateRegex(dateRegex, 'invalid date'),
    },
  };
};

export default {
  install(Vue, { store }) {
    Vue.prototype.$helpers = helpers(store);
  }
};
