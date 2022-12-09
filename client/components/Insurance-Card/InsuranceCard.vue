<script lang="ts">
import EditableCard from '@/components/common/EditableCard.vue';

export default {
  name: 'InsuranceCard',
  mixins: [EditableCard],
  data() {
    return {
      url: '/api/insurance-cards',
      fields: [
        {id: 'purpose', label: 'Purpose', value: ''},
        {id: 'subscriber_name', label: 'Subscriber Name', value: ''},
        {id: 'member_id', label: 'Member ID', value: ''},
        {id: 'group_number', label: 'Group Number', value: ''},
        {id: 'plan_number', label: 'Plan Number', value: ''},
        {id: 'plan_type', label: 'Plan Type', value: ''},
        {id: 'notes', label: 'Notes', value: '', type: 'textarea'},
      ],
      deleteCallback: async () => {
        this.$store.commit('alert', {
            message: 'Successfully deleted the insurance card!',
            status: 'success',
          });
        await this.$store.dispatch('refreshInsurances');
      },
      patchCallback: async () => {
        this.$store.commit('alert', {
            message: 'Successfully updated the insurance card!',
            status: 'success',
          });
        await this.$store.dispatch('refreshInsurances');
      }
    };
  }
};
</script>
