<script lang="ts">
import EditableCard from '@/components/common/EditableCard.vue';

export default {
  name: 'MedicationCard',
  mixins: [EditableCard],
  data() {
    return {
      url: '/api/medications',
      fields: [
        {id: 'name', label: 'Medication Name', instructions: "This is the brand name of the drug (e.g. Advil)"},
        {id: 'generic_name', label: 'Generic Name', instructions: "This is the drug's compound (e.g. ibuprofen)", optional: true},
        {id: 'dose', label: 'Dose'},
        {id: 'notes', label: 'Notes', type: 'textarea', optional: true},
      ],
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
