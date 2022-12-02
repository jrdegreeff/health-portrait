<!-- Form for signing out (block style) -->

<script lang="ts">
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'LogoutForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/accounts/session',
      method: 'DELETE',
      setAccount: true,
      setUsername: true,
      title: 'Log out',
      fields: [],
      content: 'Taking a break? See you later.',
      callback: () => {
        this.$router.push({name: 'Login'}); // Goes to Home page after signing out
        this.$store.commit('alert', {
          message: 'You are now logged out!', status: 'success'
        });
      }
    };
  }
};
</script>
