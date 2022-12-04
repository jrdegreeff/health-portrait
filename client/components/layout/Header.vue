<template>
  <header>
    <header class="title">
      <h1
        v-if="$store.state.enableBack"
        @click="() => $router.go(-1)"
        class="back"
      >
        ←
      </h1>
      <h1> {{ $store.state.title }} </h1>
    </header>
    <nav v-if="Object.keys($store.state.headerLinks).length">
      <router-link
        v-for="(name, link) in $store.state.headerLinks"
        :to=link
        :class="name === $store.state.activeLink ? 'active' : 'inactive'"
        :key="name"
      >{{name}}</router-link>
    </nav>
  </header>
</template>

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

.title {
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px black solid;
}

nav {
  border-bottom: 1px black solid;
}

nav a {
  margin-right: 2rem;
  font-size: 1.5rem;
}

nav a.active {
  border-bottom: 1px black solid;
}
</style>
