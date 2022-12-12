<script lang="ts">
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateMedicationForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/medications',
      method: 'POST',
      fields: [
        {id: 'name', label: 'Medication Name', instructions: "This is the brand name of the drug (e.g. Advil)"},
        {id: 'generic_name', label: 'Generic Name', instructions: "This is the drug's compound (e.g. ibuprofen)", optional: true},
        {id: 'dose', label: 'Dose'},
        {id: 'notes', label: 'Notes', type: 'textarea', optional: true},
      ],
      validators: {
        name: this.$helpers.validators.nonEmpty,
        dose: this.$helpers.validators.nonEmpty,
      },
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
