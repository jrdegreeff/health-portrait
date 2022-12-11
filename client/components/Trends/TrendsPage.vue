<!-- Page for viewing graphs (trends) -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <article v-if="$store.state.entries.length">
      <div v-for="detail in new Set($store.state.entries.map(entry => entry.detail))" :key="detail">
        <TrendsVisualization :entries="$store.state.entries.filter(entry => entry.detail === detail).reverse()" :detail="detail" />
        <hr />
      </div>
    </article>
    <article v-else>
      <h3>No trends found.</h3>
    </article>
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
      this.$store.commit('setHeader', {
        title: `${this.$store.getters.accountName}'s Health Trends`,
        enableBack: true,
        headerLinks: {
          "/trends/all": "All",
          "/trends/medication": "Medication",
          "/trends/appointment": "Appointment",
          "/trends/other": "Other",
        },
      });
    },
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
