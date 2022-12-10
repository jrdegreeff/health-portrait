<!-- Form for signing in (block style) -->

<script lang="ts">
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'LoginForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/accounts/session',
      method: 'POST',
      loadAccount: true,
      fields: [
        {id: 'username', label: 'Username'},
        {id: 'password', label: 'Password', type: 'password'}
      ],
      title: 'Log in',
      callback: () => {
        this.$store.commit('alert', {
          message: 'You are now logged in!', status: 'success'
        });
        this.$router.push({name: 'Home'});
      }
    };
  }
};
</script>
