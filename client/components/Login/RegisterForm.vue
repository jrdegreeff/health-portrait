<!-- Form for registering an account (block style) -->

<script lang="ts">
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'RegisterForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/accounts',
      method: 'POST',
      hasBody: true,
      setAccount: true,
      setUsername: true,
      fields: [
        {id: 'name', label: 'Name', value: ''},
        {id: 'username', label: 'Username', value: ''},
        {id: 'password', label: 'Password', value: ''}
      ],
      title: 'Create account',
      callback: () => {
        this.$store.commit('alert', {
          message: 'Successfully created an account!',
          status: 'success'
        });
        this.$router.push({name: 'Home'});
      }
    };
  }
};
</script>
