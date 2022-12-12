<script lang="ts">
import EditableCard from '@/components/common/EditableCard.vue';

export default {
  name: 'InsuranceCard',
  mixins: [EditableCard],
  data() {
    return {
      url: '/api/insurance-cards',
      fields: [
        {id: 'purpose', label: 'Purpose', instructions: "What do you use this insurance for? (Dental, Primary Care, etc.)"},
        {id: 'subscriber_name', label: 'Subscriber Name'},
        {id: 'member_id', label: 'Member ID', optional: true},
        {id: 'group_number', label: 'Group Number', optional: true},
        {id: 'plan_number', label: 'Plan Number', optional: true},
        {id: 'plan_type', label: 'Plan Type', optional: true},
        {id: 'notes', label: 'Notes', type: 'textarea', optional: true},
      ],
      validators: {
        purpose: this.$helpers.validators.nonEmpty,
        subscriber_name: this.$helpers.validators.nonEmpty,
      },
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
