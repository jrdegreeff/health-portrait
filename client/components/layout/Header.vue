<template>
  <header>
    <header class="title">
      <h1
        v-if="$store.state.enableBack"
        class="back"
        @click="() => $router.go(-1)"
      >
        <img class="back_arrow" src="../../public/back_arrow.png" alt="Back Arrow"/>
      </h1>
      <h1> {{ $store.state.title }} </h1>
    </header>
    <nav v-if="Object.keys($store.state.headerLinks).length">
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
.back {
  cursor: pointer;
  text-align: center;
  width: 3rem;
  height: 3rem;
  border: 1px dotted;
  border-radius: 1rem;
  margin-right: 1rem;
}

.back_arrow {
  max-width: 2rem;
  max-height: 2rem;
}

.title {
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px var(--dark) solid;
}

nav {
  border-bottom: 1px var(--dark) solid;
}

a {
  margin-right: 2rem;
  font-size: 1.5rem;
}
</style>
