<!-- Reusable component representing a form in a block style -->
<!-- This is just an example; feel free to define any reusable components you want! -->

<template>
  <form @submit.prevent="submit">
    <fieldset>
      <legend>{{ title }}</legend>
      <article v-if="fields.length">
        <span
          v-for="{id, label, type, options, hint, optional} in fields"
          :key="id"
        >
        <label v-if="type !== 'hidden'" :for="id"> {{ label }}: </label>
        <small v-if="optional"> (optional) </small>
          <select
            v-if="type === 'select'"
            :class="errors[id] ? 'error' : ''"
            v-model="values[id]"
            @change="() => validate(id)"
          >
            <option/>
            <option
              v-for="option in options"
              :key="option"
              :value="option"
            >
            {{ option }}
            </option>
          </select>
          <textarea
            v-else-if="type === 'textarea'"
            :class="errors[id] ? 'error' : ''"
            v-model="values[id]"
            @change="() => validate(id)"
          />
          <input
            v-else
            :class="errors[id] ? 'error' : ''"
            :type="type || 'text'"
            v-model="values[id]"
            @change="() => validate(id)"
          >
          <small v-if="hint"> {{ hint }} </small>
          <small v-if="errors[id]" class="error"> {{ errors[id] }} </small>
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
      url: '', // URL to submit form to (supplied by specific form)
      method: 'GET', // Form request method
      hasBody: false, // Whether or not form request has a body
      title: '', // Form title and submit button text (supplied by specific form)
      fields: [], // Form fields to be rendered (supplied by specific form)
      content: '', // Text to display when no fields (supplied by specific form)
      values: {}, // The values of the form
      validators: {}, // Functions to run for client-side validation (supplied by specific form)
      errors: {}, // Errors from validators
      loadAccount: false, // Whether or not to reload all store data associated with the account
      setAccount: false, // Whether or not stored account info should be updated after form submission
      setUsername: false, // Whether or not stored username should be updated after form submission
      callback: null, // Function to run after successful form submission
    };
  },
  created() {
    this.values = Object.fromEntries(this.fields.map(f => [f.id, f.value]));
    this.fields.forEach(f => {
      const validators = [f.optional ? (v => '') : (v => v ? '' : 'required field'), this.validators[f.id] || (v => '')];
      this.$set(this.validators, f.id, v => validators.map(validator => validator(v)).find(x => x));
    });
  },
  methods: {
    validate(id) {
      this.$set(this.errors, id, this.validators[id](this.values[id]));
    },
    async submit() {
      // run client-side validation before sending to server
      this.fields.forEach(f => this.validate(f.id));
      if(Object.values(this.errors).some(x => x)) return;

      const options = {
        method: this.method,
        headers: {'Content-Type': 'application/json'},
        credentials: 'same-origin' // Sends express-session credentials with request
      };
      this.hasBody && (options.body = JSON.stringify(this.values));

      try {
        const r = await fetch(this.url, options);

        // display error message and abort on failure
        if(!r.ok) throw new Error((await r.json()).error);

        // clear form on successful submission
        this.fields.forEach(f => f.value = '');

        const text = await r.text();
        this.loadAccount && await this.$store.dispatch('loadAccount', JSON.parse(text));
        this.setAccount && this.$store.commit('setAccount', JSON.parse(text).account);
        this.setUsername && this.$store.commit('setUsername', JSON.parse(text).username);

        this.callback && this.callback();
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