<!-- Reusable component representing a single editable object -->

<template>
  <section>
    <article>
      <span
        v-for="{id, label, type, hint, required} in fields"
        :key="id"
      >
        <label>
          {{ label }}:
          <small v-if="editing && !required"> (optional) </small>
        </label>
        <textarea
          v-if="editing && type === 'textarea'"
          v-model="values[id]"
        />
        <input
          v-else-if="editing"
          :type="type || 'text'"
          v-model="values[id]"
        />
        <span v-else> {{ values[id] }} </span>
        <small v-if="editing && hint"> {{ hint }} </small>
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
      const modified = Object.fromEntries(this.fields.filter(f => this.document[f.id] !== this.values[f.id])
                                                     .map(f => [f.id, this.values[f.id]]));
      await this.request({ method: "PATCH", body: JSON.stringify(modified) });
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
          const res = await r.json();
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
