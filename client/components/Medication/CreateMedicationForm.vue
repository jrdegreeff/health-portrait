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
        {id: 'name', label: 'Medication Name', value: ''},
        {id: 'generic_name', label: 'Generic Name', value: '', optional: true},
        {id: 'dose', label: 'Dose', value: ''},
        {id: 'notes', label: 'Notes', value: '', type: 'textarea', optional: true},
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
