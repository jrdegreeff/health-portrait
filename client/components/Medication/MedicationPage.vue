<template>
  <main>
    <section>
      <CreateMedicationForm />
    </section>
    <hr>
    <section>
      <header>
        <h2>Current Medications</h2>
      </header>
      <MedicationCard
        v-for="medication in $store.state.medications"
        :key="medication._id"
        :document="medication"
      />
    </section>
  </main>
</template>

<script>
import CreateMedicationForm from '@/components/Medication/CreateMedicationForm.vue';
import MedicationCard from '@/components/Medication/MedicationCard.vue'

export default {
  name: "MedicationPage",
  components: {CreateMedicationForm, MedicationCard},
  mounted() {
    this.$store.commit("setHeader", {
      title: `${this.$store.state.account.name}'s Health Book`,
      enableBack: true,
      headerLinks: {
        "/contacts": "Contacts",
        "/medications": "Medications",
        "/insurance": "Insurance",
      },
      activeLink: "Medications",
    });
  },
  methods: {},
};
</script>
