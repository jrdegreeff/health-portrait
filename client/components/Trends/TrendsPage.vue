<!-- Page for viewing graphs (trends) -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>Trends for {{ $store.state.account.name }}</h2>
      </header>
      <section v-if="$store.state.entries.length">
        <!-- for each distinct title in the entries -->
        <div v-for="title in [...new Set($store.state.entries.map(entry => entry.title))]">
          <!-- create a graph using data pulled with that title -->
          <TrendsVisualization :key="title" :entries="$store.state.entries" :title="title" />
        </div>
      </section>
      <article v-else>
        <h3>No trends found.</h3>
      </article>

      <!-- <TrendsVisualization /> -->
      
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

.chart_area {
  background-color: white;
  border: solid black 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  width: 300px;
}
</style>
