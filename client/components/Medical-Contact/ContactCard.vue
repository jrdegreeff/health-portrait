<script>
import EditableCard from '@/components/common/EditableCard.vue';

export default {
  name: 'ContactCard',
  mixins: [EditableCard],
  data() {
    return {
      url: '/api/medical-contacts',
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
        title: this.$helpers.validators.nonEmpty,
        first_name: this.$helpers.validators.nonEmpty,
        last_name: this.$helpers.validators.nonEmpty,
        phone_number: this.$helpers.validators.phoneNumber, 
      },
      deleteCallback: async () => {
        this.$store.commit('alert', {
            message: 'Successfully deleted the contact!',
            status: 'success',
          });
        await this.$store.dispatch('refreshContacts');
      },
      patchCallback: async () => {
        this.$store.commit('alert', {
            message: 'Successfully updated the contact!',
            status: 'success',
          });
        await this.$store.dispatch('refreshContacts');
      }
    };
  }
};
</script>
