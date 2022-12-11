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
      <p v-else v-html="content" />
      <button :class="buttonClass" type="submit">
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
      title: '', // Form title and submit button text (supplied by specific form)
      fields: [], // Form fields to be rendered (supplied by specific form)
      content: '', // Text to display when no fields (supplied by specific form)
      buttonClass: 'btn-primary', // Class for the submit button
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
      if (this.form && this.form.hasErrors()) return;

      const res = await this.$helpers.fetch(this.url, {
        method: this.method,
        body: this.form ? JSON.stringify(this.form.values()) : undefined,
      });
      if (!res) return;

      // clear form on successful submission
      this.form && this.form.clear();

      this.loadAccount && await this.$store.dispatch('loadAccount', res);
      this.setAccount && this.$store.commit('setAccount', res.account);
      this.setUsername && this.$store.commit('setUsername', res.username);

      this.callback && this.callback();
    }
  }
};
</script>

<style>
p {
  line-height: 2rem;
  margin: 0rem;
}
</style>
