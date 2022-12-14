<template>
  <header>
    <header class="title">
      <img
        :class="$store.state.enableBack ? 'back' : 'placeholder'"
        src="back_arrow.png"
        alt="Back Arrow"
        @click="() => $router.go(-1)"
      />
      <h1> {{ $store.state.title }} </h1>
      <div class="placeholder" />
    </header>
    <nav v-if="Object.keys($store.state.headerLinks).length" class="top-nav">
      <NavLink
        v-for="(name, to) in $store.state.headerLinks"
        :key="name"
        :name="name"
        :to="to"
      />
    </nav>
  </header>
</template>

<script lang="ts">
import NavLink from '@/components/common/NavLink.vue';

export default {
  name: 'Header',
  components: {NavLink},
};
</script>

<style scoped>
.back, .placeholder {
  width: 3rem;
  height: 3rem;
  padding: 0.5rem;
  border: 1px dotted;
  border-radius: 1rem;
}

.back {
  cursor: pointer;
  margin-right: 1rem;
}

.placeholder {
  visibility: hidden;
  margin-left: 1rem;
}

.title {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px var(--dark) solid;
}

nav {
  display: flex;
  justify-content: center;
  border-bottom: 1px var(--dark) solid;
}

a {
  margin-right: 2rem;
  font-size: 1.5rem;
}

a:last-child {
  margin-right: 0;
}
</style>
