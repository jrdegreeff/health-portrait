<!-- Form for changing username (block style) -->

<script lang="ts">
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'ChangeUsernameForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/accounts/credentials',
      method: 'PATCH',
      hasBody: true,
      setAccount: true,
      setUsername: true,
      fields: [
        {id: 'username', label: 'Username', value: ''}
      ],
      title: 'Change username',
      callback: () => {
        this.$store.commit('alert', {
          message: 'Successfully changed username!',
          status: 'success'
        });
      }
    };
  }
};
</script>
