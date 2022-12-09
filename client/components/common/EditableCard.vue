<!-- Reusable component representing a single editable object -->

<template>
  <section>
    <article v-if="editing">
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
    <article v-else>
      <span
        v-for="{id, label, type, hint, optional} in fields"
        :key="id"
      >
        <label> {{ label }}: </label>
        {{ values[id] }}
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
export default {
  name: "EditableCard",
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
      values: Object.assign({}, this.document), // The values to display (editable)
      validators: {}, // Functions to run for client-side validation (supplied by specific card)
      errors: {}, // Errors from validators
      editing: false, // Whether or not this contact is in edit mode
      deleteCallback: null, // Function to be called when delete request is successful (supplied by specific card)
      patchCallback: null, // Function to be called when patch request is successful (supplied by specific card)
    };
  },
  created() {
    this.fields.forEach(f => {
      const validators = [f.optional ? (v => '') : (v => v ? '' : 'required field'), this.validators[f.id] || (v => '')];
      this.$set(this.validators, f.id, v => validators.map(validator => validator(v)).find(x => x));
    });
  },
  methods: {
    validate(id) {
      this.$set(this.errors, id, this.validators[id](this.values[id]));
    },
    startEditing() {
      this.editing = true;
      this.values = Object.assign({}, this.document);
    },
    stopEditing() {
      this.editing = false;
      this.values = Object.assign({}, this.document);
    },
    async sendDelete() {
      if (await this.request({ method: "DELETE" })) {
        await this.deleteCallback();
      }
    },
    async sendPatch() {
      // run client-side validation before sending to server
      this.fields.forEach(f => this.validate(f.id));
      if(Object.values(this.errors).some(x => x)) return;

      const modified = Object.fromEntries(this.fields.filter(f => this.document[f.id] !== this.values[f.id])
                                                     .map(f => [f.id, this.values[f.id]]));
      if (await this.request({ method: "PATCH", body: JSON.stringify(modified) })) {
        await this.patchCallback();
      }
    },
    async request(params) {
      const options = {
        ...params,
        headers: { "Content-Type": "application/json" },
        credentials: 'same-origin' // Sends express-session credentials with request
      };
      try {
        const r = await fetch(`${this.url}/${this.document._id}`, options);
        
        // display error message and abort on failure
        if(!r.ok) throw new Error((await r.json()).error);

        this.editing = false;
        return true;
      } catch (e) {
        this.$store.commit('alert', { message: e, status: 'error' });
        return false;
      }
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
  display: flex;
  align-items: center;
}

button {
  margin-right: 1rem;
}
</style>
