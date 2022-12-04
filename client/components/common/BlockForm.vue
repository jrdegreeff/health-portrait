<!-- Reusable component representing a form in a block style -->
<!-- This is just an example; feel free to define any reusable components you want! -->

<template>
  <form @submit.prevent="submit">
    <fieldset>
      <legend>{{ title }}</legend>
      <article
        v-if="fields.length"
      >
        <div
          v-for="field in fields"
          :key="field.id"
        >
          <span>
            <label
              v-if="!field.hidden"
              :for="field.id"
            >
              {{ field.label }}:
            </label>
            <input
              v-if="field.hidden"
              type="hidden"
              :name="field.id"
              :value="field.value"
            >
            <textarea
              v-else-if="field.id === 'notes'"
              :name="field.id"
              :value="field.value"
              @input="field.value = $event.target.value"
            />
            <input
              v-else
              :type="field.id === 'password' ? 'password' : 'text'"
              :name="field.id"
              :value="field.value"
              @input="field.value = $event.target.value"
            >
          </span>
        </div>
      </article>
      <p v-else>
        {{ content }}
      </p>
      <button
        class="btn-primary"
        type="submit"
      >
        {{ title }}
      </button>
    </fieldset>
  </form>
</template>

<script>
export default {
  name: 'BlockForm',
  data() {
    /**
     * Options for submitting this form.
     */
    return {
      url: '', // Url to submit form to
      method: 'GET', // Form request method
      hasBody: false, // Whether or not form request has a body
      setAccount: false, // Whether or not stored account info should be updated after form submission
      setUsername: false, // Whether or not stored username should be updated after form submission
      callback: null // Function to run after successful form submission
    };
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
        options.body = JSON.stringify(Object.fromEntries(
          this.fields.map(field => {
            const {id, value} = field;
            field.value = '';
            return [id, value];
          })
        ));
      }

      try {
        const r = await fetch(this.url, options);
        if (!r.ok) {
          // If response is not okay, we throw an error and enter the catch block
          const res = await r.json();
          throw new Error(res.error);
        }

        const text = await r.text();

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
        this.$store.commit('alert', {
          message: e, status: 'error'
        });
      }
    }
  }
};
</script>
