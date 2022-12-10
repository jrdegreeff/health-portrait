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
        :ref="medication._id"
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
      title: "Health Book",
      enableBack: true,
      headerLinks: {
        "/contacts": "Contacts",
        "/medications": "Medications",
        "/insurance": "Insurance",
      },
      activeLink: "Medications",
    });
    // https://forsmile.jp/en/vue-en/1118/
    // https://forum.vuejs.org/t/dynamic-ref-not-working/79131/8
    // https://www.reddit.com/r/vuejs/comments/x4ws8k/scrolling_to_ref_in_composition_api/
    this.$nextTick(() => {
      const hash = this.$route.hash;
      if (hash) {
          const refName = hash.replace('#', '');
          const component = this.$refs[refName][0];
          component.$el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  },
  methods: {},
};
</script>
