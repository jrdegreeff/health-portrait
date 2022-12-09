<!-- Reusable component representing a form in a block style -->
<!-- This is just an example; feel free to define any reusable components you want! -->

<template>
  <form @submit.prevent="submit">
    <fieldset>
      <legend>{{ title }}</legend>
      <article v-if="fields.length">
        <span
          v-for="{id, label, value, type, hint, required} in fields"
          :key="id"
        >
          <label v-if="type !== 'hidden'" :for="id">
            {{ label }}:
            <small v-if="!required"> (optional) </small>
          </label>
          <textarea
            v-if="type === 'textarea'"
            :name="id"
            v-model="values[id]"
          />
          <input
            v-else
            :type="type || 'text'"
            :name="id"
            v-model="values[id]"
          >
          <small v-if="hint"> {{ hint }} </small>
        </span>
      </article>
      <p v-else>{{ content }}</p>
      <button class="btn-primary" type="submit">
        {{ title }}
      </button>
    </fieldset>
  </form>
</template>

<script>
export default {
  name: 'BlockForm',
  data() {
    return {
      values: {}, // The values of the form
      url: '', // Url to submit form to
      method: 'GET', // Form request method
      hasBody: false, // Whether or not form request has a body
      loadAccount: false, // Whether or not to reload all store data associated with the account
      setAccount: false, // Whether or not stored account info should be updated after form submission
      setUsername: false, // Whether or not stored username should be updated after form submission
      callback: null, // Function to run after successful form submission
    };
  },
  created() {
    this.values = Object.fromEntries(this.fields.map(f => [f.id, f.value]));
  },
  methods: {
    async submit() {
      /**
        * Submits a form with the specified options from data().
        */
      const options = {
        method: this.method,
        headers: {'Content-Type': 'application/json'},
        credentials: 'same-origin' // Sends express-session credentials with request
      };
      if (this.hasBody) {
        const fields = Object.fromEntries(this.fields.map(f => [f.id, this.values[f.id]]));
        options.body = JSON.stringify(fields);
      }

      try {
        const r = await fetch(this.url, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.fields.forEach(f => f.value = '');

        const text = await r.text();

        if (this.loadAccount) {
          await this.$store.dispatch('loadAccount', JSON.parse(text));
        }

        if (this.setAccount) {
          this.$store.commit('setAccount', JSON.parse(text).account);
        }
        
        if (this.setUsername) {
          this.$store.commit('setUsername', JSON.parse(text).username);
        }

        if (this.callback) {
          this.callback();
        }
      } catch (e) {
        this.$store.commit('alert', { message: e, status: 'error' });
      }
    }
  }
};
</script>

<style scoped>
article {
  display: flex;
  flex-direction: column;
}

span {
  display: flex;
  align-items: center;
}
</style>