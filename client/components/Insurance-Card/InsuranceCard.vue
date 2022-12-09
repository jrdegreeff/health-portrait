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
        {id: 'member_id', label: 'Member ID', value: '', optional: true},
        {id: 'group_number', label: 'Group Number', value: '', optional: true},
        {id: 'plan_number', label: 'Plan Number', value: '', optional: true},
        {id: 'plan_type', label: 'Plan Type', value: '', optional: true},
        {id: 'notes', label: 'Notes', value: '', type: 'textarea', optional: true},
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
