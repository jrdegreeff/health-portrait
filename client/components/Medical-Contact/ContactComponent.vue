<!-- Reusable component representing a single contact and its actions -->

<template>
  <article
    class="contact"
  >
    <section>
      <div>
        <label> Title: </label>
        <input
          v-if="editing"
          v-model="title"
        >
        <p
          v-else
        >
          {{ contact.title }}
        </p>
        </label>
      </div>
    
      <div>
        <label> First Name: </label>
        <input
          v-if="editing"
          v-model="first_name"
        >
        <p
          v-else
        >
          {{ contact.first_name }}
        </p>
        </label>
      </div>

      <div>
        <label> Last Name: </label>
        <input
          v-if="editing"
          v-model="last_name"
        >
        <p
          v-else
        >
          {{ contact.last_name }}
        </p>
        </label>
      </div>

      <div>
        <label> Hospital: </label>
        <input
          v-if="editing"
          v-model="hospital"
        >
        <p
          v-else
        >
          {{ contact.hospital }}
        </p>
        </label>
      </div>

      <div>
        <label> Specialty: </label>
        <input
          v-if="editing"
          v-model="specialty"
        >
        <p
          v-else
        >
          {{ contact.specialty }}
        </p>
        </label>
      </div>

      <div>
        <label> Phone Number: </label>
        <input
          v-if="editing"
          v-model="phone_number"
        >
        <small v-if="editing"> Format: 123-456-7890 </small>
        <p
          v-else
        >
          {{ contact.phone_number }}
        </p>
        </label>
      </div>

      <div>
        <label> Notes: </label>
        <textarea
          v-if="editing"
          v-model="notes"
        >
        <p
          v-else
        >
          {{ contact.notes }}
        </p>
        </textarea>
      </div>
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
      hospital: this.contact.hospital,
      specialty: this.contact.specialty,
      phone_number: this.contact.phone_number,
      notes: this.contact.notes,
      selected: '',
      alerts: {} // Displays success/error messages encountered during contact modification
    };
  },
  methods: {
    startEditing() {
      /**
       * Enables edit mode on this freet.
       */

      this.editing = true; // Keeps track of if a contact is being edited
      this.title = this.contact.title;
      this.first_name = this.contact.first_name;
      this.last_name = this.contact.last_name;
      this.hospital = this.contact.hospital;
      this.specialty = this.contact.specialty;
      this.phone_number = this.contact.phone_number;
      this.notes = this.contact.notes;
    },
    stopEditing() {
      /**
       * Disables edit mode on this contact.
       */
      this.editing = false;
      this.title = this.contact.title;
      this.first_name = this.contact.first_name;
      this.last_name = this.contact.last_name;
      this.hospital = this.contact.hospital;
      this.specialty = this.contact.specialty;
      this.phone_number = this.contact.phone_number;
      this.notes = this.contact.notes;
    },
    deleteContact() {
      /**
       * Deletes this contact.
       */
      const params = {
        method: 'DELETE',
        callback: () => {
          this.$store.commit('refreshContacts');
          this.$store.commit('alert', {
            message: 'Successfully deleted contact!', status: 'success'
          });
        }
      };
      this.request(params);
    },
    submitEdit() {
      /**
       * Updates contact to have the submitted draft content.
       */
      const params = {
        method: 'PATCH',
        message: 'Successfully edited contact!',
        body: JSON.stringify({title: this.title, first_name: this.first_name, last_name: this.last_name, hospital: this.hospital, specialty: this.specialty, phone_number: this.phone_number, notes: this.notes}),
        callback: () => {
          this.$set(this.alerts, params.message, 'success');
          setTimeout(() => this.$delete(this.alerts, params.message), 3000);
        }
      };
      this.request(params);
    },
    async request(params) {
      /**
       * Submits a request to the contact's endpoint
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
        const r = await fetch(`/api/medical-contacts/${this.contact._id}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }
        this.$store.commit('refreshContacts');
        this.editing = false;
  
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

p {
  display: inline;
}

div {
  display: block;
  padding: 5px;
}

small {
  color: #AAAAAA;
}

 </style>