<script lang="ts">
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateInsuranceForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/insurance-cards',
      method: 'POST',
      fields: [
        {id: 'purpose', label: 'Purpose', instructions: "What do you use this insurance for? Dental, medical, etc.?" },
        {id: 'subscriber_name', label: 'Subscriber Name'},
        {id: 'member_id', label: 'Member ID', optional: true},
        {id: 'group_number', label: 'Group Number', optional: true},
        {id: 'plan_number', label: 'Plan Number', optional: true},
        {id: 'plan_type', label: 'Plan Type', optional: true},
        {id: 'notes', label: 'Notes', type: 'textarea', optional: true},
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