<!-- Page for insurance cards management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <button class="btn-primary" @click="toggleForm">
        {{ showForm ? 'Cancel' : 'Add insurance' }}
      </button>
      <CreateInsuranceForm v-if="showForm" @submit="hideForm" />
    </section>
    <hr>
    <section>
      <header>
        <h2>Current Insurance Cards</h2>
        <div class="search-wrapper">
          <label>Search by purpose:</label>
          <input
            v-model="search"
            type="text"
            placeholder="Search insurance cards..."
          >
        </div>
      </header>
      <InsuranceCard
        v-for="insurance in filteredInsurances"
        :key="insurance._id"
        :document="insurance"
      />
    </section>
  </main>
</template>
    
<script>
  import CreateInsuranceForm from '@/components/Insurance-Card/CreateInsuranceForm.vue';
  import InsuranceCard from '@/components/Insurance-Card/InsuranceCard.vue';
  
  export default {
    name: 'InsurancePage',
    components: {
      CreateInsuranceForm, 
      InsuranceCard
    },
    data() {
      return {
        search: '',
        showForm: false,
      };
    },
    computed: {
      filteredInsurances() {
        return this.$store.filter('activeInsurances', ['purpose'], this.search);
      }
    },
    methods: {
      toggleForm() {
        this.showForm = !this.showForm;
      },
      hideForm() {
        this.showForm = false;
      }
    },
    mounted() {
      this.$store.commit("setHeader", {
        title: `${this.$store.getters.accountName}'s Health Book`,
        enableBack: true,
        headerLinks: {
          "/contacts": "Contacts",
          "/medications": "Medications",
          "/insurance": "Insurance",
        },
      });
    },
  };
</script>

<style scoped>
.search-wrapper {
  padding-top: 20px;
}
</style>
