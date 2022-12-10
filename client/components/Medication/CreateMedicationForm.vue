<script lang="ts">
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateMedicationForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/medications',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'name', label: 'Medication Name'},
        {id: 'generic_name', label: 'Generic Name', optional: true},
        {id: 'dose', label: 'Dose'},
        {id: 'notes', label: 'Notes', type: 'textarea', optional: true},
      ],
      title: 'Add medication',
      callback: async () => {
        await this.$store.dispatch('refreshMedications');
        this.$store.commit('alert', {
          message: 'Successfully added the medication!',
          status: 'success'
        });
      }
    };
  }
};
</script>
