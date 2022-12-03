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
      setUsername: false,
      fields: [
        {id: 'title', label: 'Title', value: ''},
        {id: 'first_name', label: 'First Name', value: ''},
        {id: 'last_name', label: 'Last Name', value: ''},
        {id: 'hospital', label: 'Hospital', value: ''},
        {id: 'specialty', label: 'Specialty', value: ''},
        {id: 'phone_number', label: 'Phone Number', value: ''},
        {id: 'notes', label: 'Notes', value: ''},
      ],
      title: 'Create contact',
      callback: () => {
        this.$store.commit('alert', {
          message: 'Successfully created the contact!',
          status: 'success'
        });
      }
    };
  }
};
</script>