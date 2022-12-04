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
      setUsername: false,
      fields: [
        {id: 'subscriber_name', label: 'Subscriber Name', value: ''},
        {id: 'member_id', label: 'Member ID', value: ''},
        {id: 'group_number', label: 'Group Number', value: ''},
        {id: 'plan_number', label: 'Plan Number', value: ''},
        {id: 'plan_type', label: 'Plan Type', value: ''},
        {id: 'purpose', label: 'Purpose', value: ''},
        {id: 'notes', label: 'Notes', value: ''},
      ],
      title: 'Add new insurance card',
      callback: () => {
        this.$store.commit('refreshInsurances');
        this.$store.commit('alert', {
          message: 'Successfully created the contact!',
          status: 'success'
        });
      }
    };
  }
};
</script>