<template>
  <header>
    <h1
      v-if="$store.state.enableBack"
      @click="() => $router.go(-1)"
      class="back"
    >
      ←
    </h1>
    <h1> {{ $store.state.title }} </h1>
    <section>
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

header {
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px black solid;
}

section {
  position: absolute;
  z-index: 99;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 50%;
  text-align: center;
}

article {
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  color: white;
}

p {
  margin: 0;
}

.error {
  background-color: rgba(166, 23, 33, 0.9);
}

.success {
  background-color: rgba(45, 135, 87, 0.9);
}
</style>
