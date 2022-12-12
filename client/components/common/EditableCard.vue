<!-- Reusable component representing a single editable object -->

<template>
  <section>
    <BaseForm
      v-if="editing"
      :fields="fields"
      :document="document"
      :customValidators="validators"
      :customUpdaters="{}"
      @interface="registerForm"
    />
    <article v-else>
      <span
        v-for="{id, label, type, hint, optional} in fields"
        :key="id"
      >
        <label> {{ label }}: </label>
        {{ document[id] }}
      </span>
    </article>
    <hr>
    <div class="actions">
      <button class="btn-secondary" v-if="editing" @click="sendPatch">
        ✅ save changes
      </button>
      <button class="btn-secondary" v-if="editing" @click="stopEditing">
        🚫 discard changes
      </button>
      <button class="btn-secondary" v-if="!editing" @click="startEditing">
        ✏️ edit
      </button>
      <button class="btn-secondary" @click="sendDelete">
        🗑️ delete
      </button>
    </div>
  </section>
</template>

<script>
import BaseForm from '@/components/common/BaseForm.vue';

export default {
  name: 'EditableCard',
  components: {BaseForm},
  props: {
    document: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      url: '', // URL to submit patch and delete requests to (supplied by specific card)
      fields: [], // Card fields to be rendered (supplied by specific card)
      validators: {}, // Functions to run for client-side validation (supplied by specific card)
      editing: false, // Whether or not this contact is in edit mode
      deleteCallback: null, // Function to be called when delete request is successful (supplied by specific card)
      patchCallback: null, // Function to be called when patch request is successful (supplied by specific card)
    };
  },
  methods: {
    registerForm(formInterface) {
      this.form = formInterface;
    },
    startEditing() {
      this.editing = true;
    },
    stopEditing() {
      this.editing = false;
    },
    async sendDelete() {
      const res = await this.$helpers.fetch(`${this.url}/${this.document._id}`, {
        method: 'DELETE'
      });
      if (!res) return;

      await this.deleteCallback();
    },
    async sendPatch() {
      // run client-side validation before sending to server
      if (this.form.hasErrors()) return;

      const res = await this.$helpers.fetch(`${this.url}/${this.document._id}`, {
        method: 'PATCH',
        body: JSON.stringify(this.form.modified())
      });
      if (!res) return;

      await this.patchCallback();
      this.stopEditing();
    },
  },
};
</script>

<style scoped>
section {
  border: 1px solid #111;
  padding: 20px;
  position: relative;
  margin-bottom: -1px;
}

article {
  display: flex;
  flex-direction: column;
}

span {
  padding: 0.5rem;
}

button {
  margin-right: 1rem;
}
</style>
