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
    <section class="alerts">
      <article
      v-for="(status, alert, index) in $store.state.alerts"
      :key="index"
      :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
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

.alerts {
  position: absolute;
  z-index: 99;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 50%;
  text-align: center;
}

.alerts article {
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  color: white;
}

.alerts p {
  margin: 0;
}

.error {
  background-color: rgba(166, 23, 33, 0.9);
}

.success {
  background-color: rgba(45, 135, 87, 0.9);
}
</style>
