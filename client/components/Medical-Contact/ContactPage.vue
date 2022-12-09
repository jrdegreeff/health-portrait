<!-- Page for medical contacts management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <!-- <button>
        Add contact
      </button> -->
      <CreateContactForm />
    </section>
    <hr>
    <section>
      <header>
        <h2>Current Contacts</h2>
        <div class="search-wrapper">
          <label>Search by contact last name:</label>
          <input
            v-model="search"
            type="text"
            placeholder="Search contact.."
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
        contactList: this.$store.state.contacts,
      };
    },
    computed: {
      // Inspired by https://codepen.io/AndrewThian/pen/QdeOVa
      filteredContacts() {
        return this.contactList.filter(contact => {
          return contact.last_name.toLowerCase().includes(this.search.toLowerCase())
        })
      }
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
        activeLink: "Contacts",
      });
    },
  };
</script>

<style scoped>

.search-wrapper {
  padding-top: 20px;
}

</style>