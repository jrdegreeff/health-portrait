<!-- Form for changing username (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'ChangeUsernameForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/accounts/credentials',
      method: 'PATCH',
      setAccount: true,
      setUsername: true,
      fields: [
        {id: 'username', label: 'Username'}
      ],
      validators: {
        username: this.$helpers.validators.username,
      },
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
