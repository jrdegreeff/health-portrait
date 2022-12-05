<!-- Page for viewing graphs (trends) -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>Trends for {{ $store.state.account.name }}</h2>
      </header>
      <section v-if="$store.state.entries.length">
        <div v-for="detail in [...new Set($store.state.entries.map(entry => entry.detail))]" :key="detail">
        <!-- <div v-for="detail in ['Tylenol']" :key="detail"> -->
          <hr />
          <TrendsVisualization :entries="$store.state.entries.filter(entry => entry.detail === detail).reverse()" :detail="detail" />
        </div>
      </section>
      <article v-else>
        <h3>No trends found.</h3>
      </article>
      
    </section>
    <hr/>
  </main>
</template>

<script>
  import TrendsVisualization from '@/components/Trends/TrendsVisualization.vue';

  export default {
    name: 'TrendsPage',
    components: {
      TrendsVisualization
    },
    mounted() {
      this.$store.commit('setHeader', {title: 'Trends', enableBack: true});
    },
    methods: {
    }
  };
</script>

<style scoped>
li {
  list-style-type: none;
  margin-bottom: 1rem;
}

button {
  margin-right: 2rem;
}
</style>
