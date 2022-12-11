<template>
  <main>
    <section>
      <CreateMedicationForm />
    </section>
    <hr>
    <section>
      <header>
        <h2>Current Medications</h2>
        <div class="search-wrapper">
          <label>Search by medication name:</label>
          <input
            v-model="search"
            type="text"
            placeholder="Search medication.."
          >
        </div>
      </header>
      <MedicationCard
        v-for="medication in filteredMedications"
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
  data() {
    return {
      search: '',
      medicationList: this.$store.state.medications,
    };
  },
  computed: {
    // Inspired by https://codepen.io/AndrewThian/pen/QdeOVa
    filteredMedications() {
      return this.medicationList.filter(medication => {
        return medication.name.toLowerCase().includes(this.search.toLowerCase())
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
      activeLink: "Medications",
    });
  },
  methods: {},
};
</script>

<style scoped>

/* h2 {
  display: inline;
} */
.search-wrapper {
  padding-top: 20px;
}

</style>
