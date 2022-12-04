<!-- Reusable component representing a single editable object -->

<template>
  <article class="card">
    <section>
      <div
        v-for="field in fields"
        :key="field.id"
      >
        <label>{{ field.label }}:</label>
        <textarea v-if="editing && field.id === 'notes'" v-model="values[field.id]" />
        <input v-else-if="editing" v-model="values[field.id]" />
        <span v-else>
          {{ values[field.id] }}
        </span>
        <small v-if="editing && field.hint">
          {{ field.hint }}
        </small>
      </div>
    </section>

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
  </article>
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
      values: Object.assign({}, this.document), // The values to display (editable)
      editing: false, // Whether or not this contact is in edit mode
    };
  },
  methods: {
    startEditing() {
      this.editing = true;
      this.values = Object.assign({}, this.document);
    },
    stopEditing() {
      this.editing = false;
      this.values = Object.assign({}, this.document);
    },
    async sendDelete() {
      await this.request({ method: "DELETE" });
      await this.deleteCallback();
    },
    async sendPatch() {
      const modified = this.fields.reduce(((o, f) => this.document[f.id] === this.values[f.id] ? o : {...o, [f.id]: this.values[f.id]}), {});
      await this.request({ method: "PATCH", body: JSON.stringify(modified)});
      await this.patchCallback();
    },
    async request(params) {
      const options = {
        ...params,
        headers: { "Content-Type": "application/json" },
        credentials: 'same-origin' // Sends express-session credentials with request
      };
      try {
        const r = await fetch(`${this.url}/${this.document._id}`, options);
        if (!r.ok) {
          throw new Error(res.error);
        }
        this.editing = false;
      } catch (e) {
        this.$store.commit('alert', { message: e, status: 'error' });
      }
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #111;
  padding: 20px;
  position: relative;
  margin-bottom: -1px;
}

div {
  padding: 0.5rem;
}

button {
  margin-right: 1rem;
}
</style>
