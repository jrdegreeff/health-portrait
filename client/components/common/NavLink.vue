<template>
  <router-link
    :to="to"
    :class="active ? 'active' : 'inactive'"
    :key="name"
  >{{ name }}</router-link>
</template>

<script lang="ts">
export default {
  name: "NavLink",
  props: {
    to: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    activatable: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    active() {
      return this.activatable && this.$route.path.startsWith(this.to);
    }
  },
};
</script>

<style scoped>
a.active {
  border-bottom: 3px var(--darkPrimary) solid;
}
</style>
