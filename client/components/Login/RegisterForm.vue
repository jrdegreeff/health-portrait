<!-- Form for registering an account (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'RegisterForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/accounts',
      method: 'POST',
      loadAccount: true,
      fields: [
        {id: 'name', label: 'Shared Account Name', instructions: 'This should be the name of the person whose health data will be recorded in this account.'},
        {id: 'username', label: 'Username'},
        {id: 'password', label: 'Password', type: 'password'}
      ],
      validators: {
        username: this.$helpers.validators.username,
        password: this.$helpers.validators.password,
      },
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
