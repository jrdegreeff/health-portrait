<!-- Page for viewing graphs (trends) -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <article v-if="filteredEntries.length">
      <p>Click on the colored rectangles next to the <b>Cognition</b>, <b>Pain</b>, or <b>Happiness</b> labels at the top of each chart to show/hide trend lines.</p>
      <div v-for="detail in new Set(filteredEntries.map(entry => entry.detail))" :key="detail">
        <TrendsVisualization :entries="filteredEntries.filter(entry => entry.detail === detail).reverse()" :detail="detail" />
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
    props: {
      type: {
        type: String,
        required: true
      }
    },
    computed: {
      filteredEntries() {
        return this.type === "all" ? this.$store.state.entries : this.$store.state.entries.filter(e => e.type === this.type);
      }
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
