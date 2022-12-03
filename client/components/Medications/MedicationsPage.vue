<template>
  <main>
    
  </main>
</template>

<script>
export default {
  name: "MedicationPage",
  components: {},
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
  },
  methods: {},
};
</script>
