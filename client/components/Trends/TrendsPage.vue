<!-- Page for viewing graphs (trends) -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <article v-if="$store.state.entries.length">
      <p>Click on the <b>Cognition</b>, <b>Pain</b>, or <b>Happiness</b> labels at the top of each chart to show/hide trend lines.</p>
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
    props: {
      type: {
        type: String,
        required: true
      }
    },
    computed: {
      activeType() {
        const type = this.type;
        return type.charAt(0).toUpperCase() + type.slice(1);
      },
      filteredEntries() {
        return this.type === "all" ? this.$store.state.entries : this.$store.state.entries.filter(e => e.type === this.type);
      }
    },
    mounted() {
      this.$store.commit('setHeader', {
        title: `${this.$store.state.account.name}'s Health Trends`,
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
