<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateContactForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/medical-contacts',
      method: 'POST',
      fields: [
        {id: 'title', label: 'Title'},
        {id: 'first_name', label: 'First Name'},
        {id: 'last_name', label: 'Last Name'},
        {id: 'hospital', label: 'Hospital', optional: true},
        {id: 'specialty', label: 'Specialty', optional: true},
        {id: 'phone_number', label: 'Phone Number', hint: 'Format: 123-456-7890'},
        {id: 'notes', label: 'Notes', type: 'textarea', optional: true},
      ],
      validators: { 
        phone_number: this.$helpers.validators.phoneNumber,  
      },
      title: 'Add contact',
      callback: async () => {
        await this.$store.dispatch('refreshContacts');
        this.$store.commit('alert', {
          message: 'Successfully created the contact!',
          status: 'success'
        });
      }
    };
  }
};
</script>
