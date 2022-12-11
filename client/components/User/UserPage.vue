<template>
  <main>
    <section>
      <ChangeUsernameForm />
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
  mounted() {
    this.$store.commit('setHeader', {
      title: `Login Settings for ${this.$store.getters.username}`,
      enableBack: true,
      headerLinks: {
        '/account': 'Shared Account',
        '/user': this.$store.getters.username,
      },
    });
  },
};
</script>
