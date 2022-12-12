<script lang="ts">
import EditableCard from '@/components/common/EditableCard.vue';

export default {
  name: 'MedicationCard',
  mixins: [EditableCard],
  data() {
    return {
      url: '/api/medications',
      fields: [
        {id: 'name', label: 'Medication Name'},
        {id: 'generic_name', label: 'Generic Name', optional: true},
        {id: 'dose', label: 'Dose'},
        {id: 'notes', label: 'Notes', type: 'textarea', optional: true},
      ],
      validators: {
        name: this.$helpers.validators.nonEmpty,
        dose: this.$helpers.validators.nonEmpty,
      },
      deleteCallback: async () => {
        this.$store.commit('alert', {
            message: 'Successfully deleted the medication!',
            status: 'success',
          });
        await this.$store.dispatch('refreshMedications');
      },
      patchCallback: async () => {
        this.$store.commit('alert', {
            message: 'Successfully updated the medication!',
            status: 'success',
          });
        await this.$store.dispatch('refreshMedications');
      }
    };
  }
};
</script>
