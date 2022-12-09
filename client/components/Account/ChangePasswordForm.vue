<!-- Form for changing password (block style) -->

<script lang="ts">
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'ChangePasswordForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/accounts/credentials',
      method: 'PATCH',
      hasBody: true,
      fields: [
        {id: 'password', label: 'Password', value: '', type: 'password'}
      ],
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
