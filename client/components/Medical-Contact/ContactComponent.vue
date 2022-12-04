<!-- Reusable component representing a single contact and its actions -->

<template>
  <article
    class="contact"
  >
    <section>
      <label> Title: </label><input
        v-if="editing"
        v-model="title"
      ></label>
      <label> First Name: </label><input
        v-if="editing"
        v-model="first_name"
      ></label>
      <label> Last Name: </label><input
        v-if="editing"
        v-model="last_name"
      ></label>
      <label> Hospital: </label><input
        v-if="editing"
        v-model="hospital"
      ></label>
      <label> Specialty: </label><input
        v-if="editing"
        v-model="specialty"
      ></label>
      <label> Phone Number: </label><input
        v-if="editing"
        v-model="phone_number"
        type="tel"
      ></label>
      <!-- <small>Format: 123-456-7890</small> -->
      <label> Notes: </label><input
        v-if="editing"
        v-model="notes"
      ></label>
    </section>

    <div
      class="actions"
    >
      <button
        v-if="editing"
        @click="submitEdit"
      >
        ✅ save changes
      </button>
      <button
        v-if="editing"
        @click="stopEditing"
      >
        🚫 discard changes
      </button>
      <button
        v-if="!editing"
        @click="startEditing"
      >
        ✏️ edit
      </button>
      <button @click="deleteContact">
        🗑️ delete
      </button>
    </div>
      
    <section class="alerts">
      <article
        v-for="(status, alert, index) in alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </article>
</template>
  
<script>
  
  
export default {
  name: 'ContactComponent',
  components: {},
  props: {
    // Data from the stored contact
    contact: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editing: false, // Whether or not this contact is in edit mode
      title: this.contact.title,
      first_name: this.contact.first_name,
      last_name: this.contact.last_name,
      
      selected: '',
      alerts: {} // Displays success/error messages encountered during contact modification
    };
  },
  methods: {
    startEditing() {
      /**
       * Enables edit mode on this freet.
       */
      this.editing = true; // Keeps track of if a freet is being edited
      this.draft = this.freet.content; // The content of our current "draft" while being edited
    },
    stopEditing() {
      /**
       * Disables edit mode on this freet.
       */
      this.editing = false;
      this.draft = this.freet.content;
    },
    deleteFreet() {
      /**
       * Deletes this freet.
       */
      const params = {
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully deleted freet!', status: 'success'
          });
        }
      };
      this.request(params);
    },
    submitEdit() {
      /**
       * Updates freet to have the submitted draft content.
       */
      if (this.freet.content === this.draft) {
        const error = 'Error: Edited freet content should be different than current freet content.';
        this.$set(this.alerts, error, 'error'); // Set an alert to be the error text, timeout of 3000 ms
        setTimeout(() => this.$delete(this.alerts, error), 3000);
        return;
      }

      const params = {
        method: 'PATCH',
        message: 'Successfully edited freet!',
        body: JSON.stringify({content: this.draft}),
        callback: () => {
          this.$set(this.alerts, params.message, 'success');
          setTimeout(() => this.$delete(this.alerts, params.message), 3000);
        }
      };
      this.request(params);
    },
    async request(params) {
      /**
       * Submits a request to the freet's endpoint
       * @param params - Options for the request
       * @param params.body - Body for the request, if it exists
       * @param params.callback - Function to run if the the request succeeds
       */
      const options = {
        method: params.method, headers: {'Content-Type': 'application/json'}
      };
      if (params.body) {
        options.body = params.body;
      }

      try {
        const r = await fetch(`/api/freets/${this.freet._id}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.editing = false;
        this.$store.commit('refreshFreets');

        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>
  
<style scoped>
.contact {
    border: 1px solid #111;
    padding: 20px;
    position: relative;
}
 </style>