<!-- Reusable component representing a form that can be used in multiple contexts -->

<template>
  <article>
    <span
      v-for="{id, label, type, options, hint, optional, range} in fields"
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
        @input="() => validate(id)"
      />
      <input
        v-else-if="type === 'range'"
        type="range"
        :min="range.min"
        :max="range.max"
        list="tickmarks"
        :class="errors[id] ? 'error' : ''"
        v-model="values[id]"
        @change="() => validate(id)"
      >
      <input
        v-else
        :class="errors[id] ? 'error' : ''"
        :type="type || 'text'"
        v-model="values[id]"
        @input="() => validate(id)"
      >
      <small v-if="type === 'range'"> {{ values[id] }} </small>
      <small v-if="hint"> {{ hint }} </small>
      <small v-if="errors[id]" class="error"> {{ errors[id] }} </small>
      
      <datalist v-if="type === 'range'" id="tickmarks">
        <option v-for="num in [1,2,3,4,5,6,7,8,9,10]" :value="num"></option>
      </datalist>
    </span>
  </article>
</template>

<script>
export default {
  name: 'BaseForm',
  props: {
    fields: {
      type: Array,
      required: true
    },
    document: {
      type: Object,
      required: true
    },
    customValidators: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      values: Object.assign({}, this.document), // The values of the form
      validators: {}, // Functions to run for client-side validation
      errors: {}, // Errors from validators
    };
  },
  created() {
    this.fields.forEach(f => {
      const validators = [
        !f.optional && (v => v ? '' : 'required field'),
        this.customValidators[f.id]
      ].filter(x => x);
      this.$set(this.validators, f.id, v => validators.reduce((message, validator) => message || validator(v), null));
    });
  },
  mounted() {
    this.$emit('interface', {
      hasErrors: () => {
        this.fields.forEach(f => this.validate(f.id));
        return Object.values(this.errors).some(x => x);
      },
      values: () => Object.assign({}, this.values),
      modified: () => {
        return Object.fromEntries(this.fields.filter(f => this.values[f.id] !== this.document[f.id])
                                             .map(f => [f.id, this.values[f.id]]));
      },
      clear: () => this.values = Object.assign({}, this.document)
    });
  },
  methods: {
    validate(id) {
      this.$set(this.errors, id, this.validators[id](this.values[id]));
    },
  },
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
