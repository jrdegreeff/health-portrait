<!-- Form for adding a credential to an account (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'AddCredentialForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/accounts/credentials',
      method: 'POST',
      setAccount: true,
      fields: [
        {id: 'username', label: 'New Username'},
        {id: 'password', label: 'New Password', type: 'password'}
      ],
      validators: {
        username: this.$helpers.validators.username,
        password: this.$helpers.validators.password,
      },
      title: 'Add new person to the shared account',
      callback: () => {
        this.$store.commit('alert', {
          message: 'Successfully added the new person to your shared account!',
          status: 'success'
        });
      }
    };
  }
};
</script>
