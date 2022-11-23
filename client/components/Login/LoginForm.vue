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
      hasBody: true,
      setUsername: true,
      fields: [
        {id: 'username', label: 'Username', value: ''},
        {id: 'password', label: 'Password', value: ''}
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
