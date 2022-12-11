<template>
  <main>
    <section>
      <button v-if="!showForm" class="btn-primary" @click="showForm=true">
        Add medication
      </button>
      <button v-if="showForm" class="btn-primary" @click="showForm=false">
        Add medication
      </button>
      <CreateMedicationForm v-if="showForm"/>
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
            placeholder="Search medications..."
          >
        </div>
      </header>
      <MedicationCard
        v-for="medication in filteredMedications"
        :key="medication._id"
        :document="medication"
        :ref="`#${medication._id}`"
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
      showForm: false,
    };
  },
  computed: {
    filteredMedications() {
      return this.$store.filter('activeMedications', ['name'], this.search);
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
    if (this.$route.hash) {
      const component = this.$refs[this.$route.hash][0];
      component.$el.scrollIntoView({ behavior: 'smooth' });
    }
  },
  methods: {},
};
</script>

<style scoped>
.search-wrapper {
  padding-top: 20px;
}
</style>
