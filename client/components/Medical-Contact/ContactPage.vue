<!-- Page for medical contacts management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <button class="btn-primary" @click="toggleForm">
        {{ showForm ? 'Cancel' : 'Add contact' }}
      </button>
      <CreateContactForm v-if="showForm" @submit="hideForm" />
    </section>
    <hr>
    <section>
      <header>
        <h2>Current Contacts</h2>
        <div class="search-wrapper">
          <label>Search by contact name:</label>
          <input
            v-model="search"
            type="text"
            placeholder="Search contacts..."
          >
        </div>
      </header>
      <ContactCard
        v-for="contact in filteredContacts"
        :key="contact._id"
        :document="contact"
        :ref="`#${contact._id}`"
      />
    </section>
  </main>
</template>
  
<script>
  import CreateContactForm from '@/components/Medical-Contact/CreateContactForm.vue';
  import ContactCard from '@/components/Medical-Contact/ContactCard.vue';
  
  export default {
    name: 'ContactPage',
    components: {
      CreateContactForm, 
      ContactCard
    },
    data() {
      return {
        search: '',
        showForm: false,
      };
    },
    computed: {
      filteredContacts() {
        return this.$store.filter('activeContacts', ['last_name', 'first_name'], this.search);
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
      if (this.$route.hash) {
        const component = this.$refs[this.$route.hash][0];
        component.$el.scrollIntoView({ behavior: 'smooth' });
      }
    },
  };
</script>

<style scoped>
.search-wrapper {
  padding-top: 20px;
}
</style>
