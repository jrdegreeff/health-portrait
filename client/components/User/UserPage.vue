<template>
  <main>
    <section>
      <ChangeUsernameForm @submit="setHeader" />
      <ChangePasswordForm />
    </section>
    <hr/>
    <section>
      <LogoutForm />
    </section>
    <hr/>
  </main>
</template>

<script>
import ChangeUsernameForm from '@/components/User/ChangeUsernameForm.vue';
import ChangePasswordForm from '@/components/User/ChangePasswordForm.vue';
import LogoutForm from '@/components/User/LogoutForm.vue';

export default {
  name: 'UserPage',
  components: {
    ChangeUsernameForm,
    ChangePasswordForm,
    LogoutForm,
  },
  methods: {
    setHeader() {
      this.$store.commit('setHeader', {
      title: `Login Settings for ${this.$store.getters.username}`,
      enableBack: true,
      headerLinks: {
        '/account': 'Shared Account',
        '/user': 'Login Settings',
      },
    });
    }
  },
  mounted() {
    this.setHeader();
  },
};
</script>
