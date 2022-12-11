<!-- Page for insurance cards management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <!-- <button>
          Add contact
        </button> -->
      <CreateInsuranceForm />
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
            placeholder="Search insurances..."
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
      };
    },
    computed: {
      // Inspired by https://codepen.io/AndrewThian/pen/QdeOVa
      filteredInsurances() {
        return this.$store.state.insurances.filter(insurance => {
          return insurance.purpose.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    },
    mounted() {
      this.$store.commit("setHeader", {
        title: `${this.$store.state.account.name}'s Health Book`,
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