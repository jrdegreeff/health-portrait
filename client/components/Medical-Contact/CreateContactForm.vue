<script lang="ts">
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateContactForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/medical-contacts',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'title', label: 'Title', value: ''},
        {id: 'first_name', label: 'First Name', value: ''},
        {id: 'last_name', label: 'Last Name', value: ''},
        {id: 'hospital', label: 'Hospital', value: ''},
        {id: 'specialty', label: 'Specialty', value: ''},
        {id: 'phone_number', label: 'Phone Number', value: '', hint: 'Format: 123-456-7890'},
        {id: 'notes', label: 'Notes', value: '', type: 'textarea'},
      ],
      title: 'Create contact',
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
