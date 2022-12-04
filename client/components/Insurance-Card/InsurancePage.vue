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
      </header>
      <InsuranceCard
        v-for="insurance in $store.state.insurances"
        :key="insurance.id"
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
    mounted() {
      this.$store.commit("setHeader", {
        title: "Health Book",
        enableBack: true,
        headerLinks: {
          "/contacts": "Contacts",
          "/medications": "Medications",
          "/insurance": "Insurance",
        },
        activeLink: "Insurance",
      });
    },
  };
</script>