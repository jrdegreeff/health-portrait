<script lang="ts">
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateInsuranceForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/insurance-cards',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'purpose', label: 'Purpose', value: ''},
        {id: 'subscriber_name', label: 'Subscriber Name', value: ''},
        {id: 'member_id', label: 'Member ID', value: '', optional: true},
        {id: 'group_number', label: 'Group Number', value: '', optional: true},
        {id: 'plan_number', label: 'Plan Number', value: '', optional: true},
        {id: 'plan_type', label: 'Plan Type', value: '', optional: true},
        {id: 'notes', label: 'Notes', value: '', type: 'textarea', optional: true},
      ],
      title: 'Add new insurance card',
      callback: async () => {
        await this.$store.dispatch('refreshInsurances');
        this.$store.commit('alert', {
          message: 'Successfully added the new insurance card!',
          status: 'success'
        });
      }
    };
  }
};
</script>