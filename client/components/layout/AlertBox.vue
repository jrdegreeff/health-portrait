<template>
  <div>
    <section>
      <article
      v-for="({message, status}, id, index) in $store.state.alerts"
      :key="index"
      :class="status"
      >
        <span class="placeholder">✖</span>
        <p>{{ message }}</p>
        <span class="dismiss" @click="() => dismiss(id)">✖</span>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AlertBox',
  methods: {
    dismiss(id) {
      this.$store.commit('dismissAlert', id)
    }
  },
}
</script>

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

  display: flex;
  justify-content: space-between;

  -webkit-animation-duration: 8s;
  animation-duration: 8s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: fadeOut;
  animation-name: fadeOut;
}

@-webkit-keyframes fadeOut {
  0% {opacity: 0.9;}
  50% {opacity: 0.9;}
  90% {opacity: 0.5;}
  100% {opacity: 0.0;}
}

@keyframes fadeOut {
  0% {opacity: 0.9;}
  50% {opacity: 0.9;}
  90% {opacity: 0.5;}
  100% {opacity: 0.0;}
}

article.error {
  background-color: var(--error);
}

article.success {
  background-color: var(--success);
}

p {
  margin: 0;
}

.placeholder {
  visibility: hidden;
}

.dismiss {
  cursor: pointer;
}
</style>
