<template>
  <div>
    <section>
      <article
      v-for="(status, alert, index) in $store.state.alerts"
      :key="index"
      :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </div>
</template>

<style scoped>
section {
  position: fixed;
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

article.error {
  background-color: rgba(166, 23, 33, 0.8);
}

article.success {
  background-color: rgba(45, 135, 87, 0.8);
}

p {
  margin: 0;
}
</style>