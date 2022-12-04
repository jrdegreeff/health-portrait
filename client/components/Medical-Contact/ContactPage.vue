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
      </header>
      <ContactCard
        v-for="contact in $store.state.contacts"
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
