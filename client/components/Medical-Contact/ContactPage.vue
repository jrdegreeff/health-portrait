<!-- Page for medical contacts management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <header>
      <!-- <button>
        Add contact
      </button> -->
      <CreateContactForm />
    </header>
    <hr>
    <section>
      <ContactComponent
        v-for="contact in $store.state.contacts"
        :key="contact.id"
        :contact="contact"
      />
    </section>
  </main>
</template>
  
<script>
  import CreateContactForm from '@/components/Medical-Contact/CreateContactForm.vue';
  import ContactComponent from '@/components/Medical-Contact/ContactComponent.vue';
  
  export default {
    name: 'ContactPage',
    components: {
      CreateContactForm, 
      ContactComponent
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
      this.$store.commit('refreshContacts');
    },
  };
</script>