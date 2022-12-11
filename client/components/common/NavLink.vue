<template>
  <router-link
    :to="to"
    :class="name === $store.state.activeLink ? 'active' : 'inactive'"
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
  }
};
</script>

<style scoped>
a.active {
  border-bottom: 3px var(--darkPrimary) solid;
}
</style>
