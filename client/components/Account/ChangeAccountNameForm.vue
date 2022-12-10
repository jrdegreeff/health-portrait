<!-- Form for changing account name (block style) -->

<script lang="ts">
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'ChangeAccountNameForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/accounts',
      method: 'PATCH',
      hasBody: true,
      setAccount: true,
      fields: [
        {id: 'name', label: 'Name'}
      ],
      title: 'Change shared account name',
      callback: () => {
        this.$store.commit('alert', {
          message: 'Successfully changed account name!',
          status: 'success'
        });
      }
    };
  }
};
</script>
