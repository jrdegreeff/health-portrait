<!-- Page for account sign-in and registration -->
<!-- User should be NOT authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>New to Health Portrait?</h2>
      </header>
      <RegisterForm />
    </section>
    <hr/>
    <section>
      <header>
        <h2>Have an account?</h2>
      </header>
      <LoginForm />
    </section>
    <hr/>
  </main>
</template>

<script>
import RegisterForm from '@/components/Login/RegisterForm.vue';
import LoginForm from '@/components/Login/LoginForm.vue';

export default {
  name: 'LoginPage',
  components: {
    RegisterForm,
    LoginForm
  },
  mounted() {
    this.$store.commit('setTitle', {title: 'Log In', enableBack: false});
  },
};
</script>
