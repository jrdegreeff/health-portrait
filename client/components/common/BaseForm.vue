<!-- Reusable component representing a form that can be used in multiple contexts -->

<template>
  <article>
    <span
      v-for="{id, label, type, options, hint, optional, instructions} in fields"
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
      <small v-if="instructions" class="tooltip"> 
        <img src = "question_circle.svg" alt="Question mark" width="30%"/>
        <div class="tooltiptext" v-if="instructions"> {{ instructions }}</div>
        <!-- Inspired by https://www.w3schools.com/css/css_tooltip.asp -->
      </small>
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
      hover: false, //Hover logic for instructions
    };
  },
  created() {
    // this.values = Object.fromEntries(this.fields.map(f => [f.id, this.document[f.id]]));
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

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltiptext {
  visibility: hidden;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
 
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
  width: 500px;
  bottom: 100%;
  left: 110%; 
  margin-left: -60px;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

.tooltip .tooltiptext::after {
  content: " ";
  position: absolute;
  top: 100%; /* At the bottom of the tooltip */
  left: 3%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}

</style>
