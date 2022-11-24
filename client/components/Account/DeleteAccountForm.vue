<!-- Form for deleting account (block style) -->

<script lang="ts">
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'DeleteAccountForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/accounts',
      method: 'DELETE',
      setUsername: true,
      title: 'Delete account',
      fields: [],
      content: 'Deleting your account is permanent and irreversible. Proceed only if you understand these consequences.',
      callback: () => {
        this.$store.commit('alert', {
          message: 'Your account has been deleted!', status: 'success'
        });
        this.$router.push({name: 'Home'});
      }
    };
  }
};
</script>
