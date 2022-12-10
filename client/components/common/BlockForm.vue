<!-- Reusable component representing a form in a block style -->

<template>
  <form @submit.prevent="submit">
    <fieldset>
      <legend>{{ title }}</legend>
      <BaseForm
        v-if="fields.length"
        :fields="fields"
        :document="document"
        :customValidators="validators"
        @interface="registerForm"
      />
      <p v-else>{{ content }}</p>
      <button class="btn-primary" type="submit">
        {{ title }}
      </button>
    </fieldset>
  </form>
</template>

<script>
import BaseForm from '@/components/common/BaseForm.vue';

export default {
  name: 'BlockForm',
  components: {BaseForm},
  data() {
    return {
      url: '', // URL to submit form to (supplied by specific form)
      method: 'GET', // Form request method
      hasBody: false, // Whether or not form request has a body
      title: '', // Form title and submit button text (supplied by specific form)
      fields: [], // Form fields to be rendered (supplied by specific form)
      content: '', // Text to display when no fields (supplied by specific form)
      document: {}, // The default values of the form
      validators: {}, // Functions to run for client-side validation (supplied by specific form)
      loadAccount: false, // Whether or not to reload all store data associated with the account
      setAccount: false, // Whether or not stored account info should be updated after form submission
      setUsername: false, // Whether or not stored username should be updated after form submission
      callback: null, // Function to run after successful form submission
    };
  },
  created() {
    this.document = Object.fromEntries(this.fields.map(f => [f.id, f.default]));
  },
  methods: {
    registerForm(formInterface) {
      this.form = formInterface;
    },
    async submit() {
      // run client-side validation before sending to server
      if(this.form.hasErrors()) return;

      const options = {
        method: this.method,
        headers: {'Content-Type': 'application/json'},
        credentials: 'same-origin' // Sends express-session credentials with request
      };
      this.hasBody && (options.body = JSON.stringify(this.form.values()));

      try {
        const r = await fetch(this.url, options);

        // display error message and abort on failure
        if(!r.ok) throw new Error((await r.json()).error);

        // clear form on successful submission
        this.form.clear();

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
