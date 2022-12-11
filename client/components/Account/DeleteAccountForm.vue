<!-- Form for deleting account (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'DeleteAccountForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/accounts',
      method: 'DELETE',
      loadAccount: true,
      title: 'Delete account',
      content: 'Deleting your shared account will permanently and irreversibly delete all of your shared data.<br>\
                Proceed only if you understand these consequences.',
      buttonClass: 'btn-danger',
      callback: () => {
        this.$store.commit('alert', {
          message: 'Your shared account has been deleted!', status: 'success'
        });
        this.$router.push({name: 'Login'});
      }
    };
  }
};
</script>
