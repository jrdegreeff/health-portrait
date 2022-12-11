<!-- Form for changing password (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'ChangePasswordForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/accounts/credentials',
      method: 'PATCH',
      fields: [
        {id: 'password', label: 'Password', type: 'password'}
      ],
      validators: {
        password: this.$helpers.validators.password,
      },
      title: 'Change password',
      callback: () => {
        this.$store.commit('alert', {
          message: 'Successfully changed password!',
          status: 'success'
        });
      }
    };
  }
};
</script>
