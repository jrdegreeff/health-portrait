<!-- Page for medical contacts management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <button v-if="!showForm" class="btn-primary" @click="showForm=true">
        Add contact
      </button>
      <button v-if="showForm" class="btn-primary" @click="showForm=false">
        Add contact
      </button>
      <CreateContactForm v-if="showForm"/>
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
      // Inspired by https://codepen.io/AndrewThian/pen/QdeOVa
      filteredContacts() {
        return this.$store.state.contacts.filter(contact => {
          return contact.last_name.toLowerCase().includes(this.search.toLowerCase()) || contact.first_name.toLowerCase().includes(this.search.toLowerCase())
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

<style scoped>

.search-wrapper {
  padding-top: 20px;
}

</style>