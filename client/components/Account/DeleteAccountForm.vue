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
      title: 'Delete shared account',
      content: `Deleting the shared account will permanently and irreversibly delete all of ${this.$store.getters.accountName}'s health data.<br>\
                Proceed only if you understand these consequences.`,
      buttonClass: 'btn-danger',
      callback: () => {
        this.$store.commit('alert', {
          message: `${this.$store.getters.accountName}'s shared account has been deleted!`, status: 'success'
        });
        this.$router.push({name: 'Login'});
      }
    };
  }
};
</script>
