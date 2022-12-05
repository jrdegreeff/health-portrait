<!-- Page for viewing graphs (trends) -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>Trends for {{ $store.state.account.name }}</h2>
      </header>
      <!-- <fieldset>
        <legend>Users with access to shared account</legend> -->
        <!-- <ul>
          <li v-for="username in $store.state.account.credentials"
              :key="username">
            <button class="btn-tertiary"
              @click="() => deleteCredential(username)">
              Revoke Access
            </button>
            <span>
              @{{username}}
            </span>
          </li>
        </ul> -->
      <!-- </fieldset> -->

      <TrendsVisualization />
      
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
