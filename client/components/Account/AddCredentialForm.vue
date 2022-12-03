<!-- Form for adding a credential to an account (block style) -->

<script lang="ts">
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'AddCredentialForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/accounts/credentials',
      method: 'POST',
      hasBody: true,
      setAccount: true,
      fields: [
        {id: 'username', label: 'Username', value: ''},
        {id: 'password', label: 'Password', value: ''}
      ],
      title: 'Add user to shared account',
      callback: () => {
        this.$store.commit('alert', {
          message: 'Successfully added a user to the account!',
          status: 'success'
        });
      }
    };
  }
};
</script>
