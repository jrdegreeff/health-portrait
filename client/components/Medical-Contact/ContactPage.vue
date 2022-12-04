<!-- Page for medical contacts management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <router-link to="/contacts">
        <button>
          Contacts
        </button>
      </router-link>
      <button>
        Medications
      </button>
      <button>
        Insurance
      </button>
    </section>
    <hr>
    <section>
      <header>
        <h2>Health Book</h2>
      </header>
      <!-- <button>
        Add contact
      </button> -->
      <CreateContactForm />
    </section>
    <hr>
    <section>
      <ContactComponent
        v-for="contact in $store.state.contacts"
        :key="contact.id"
        :contact="contact"
      />
    </section>
    <hr>
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
      this.$store.commit('setTitle', {title: 'Health Book', enableBack: true});
      this.$store.commit('refreshContacts');
    },
  };
</script>