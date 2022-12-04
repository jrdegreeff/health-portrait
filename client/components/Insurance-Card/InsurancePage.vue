<!-- Page for insurance cards management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <header>
      <!-- <button>
          Add contact
        </button> -->
      <CreateInsuranceForm />
    </header>
    <hr>
    <section>
      <InsuranceComponent
        v-for="insurance in $store.state.insurances"
        :key="insurance.id"
        :insurance="insurance"
      />
    </section>
  </main>
</template>
    
  <script>
    import CreateInsuranceForm from '@/components/Insurance-Card/CreateInsuranceForm.vue';
    import InsuranceComponent from '@/components/Insurance-Card/InsuranceComponent.vue';
    
    export default {
      name: 'ContactPage',
      components: {
        CreateInsuranceForm, 
        InsuranceComponent
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
        this.$store.commit('refreshInsurances');
      },
    };
  </script>