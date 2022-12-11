<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>Shared account settings for {{ $store.state.account && $store.state.account.name }}</h2>
      </header>
      <fieldset>
        <legend>Users with access to shared account</legend>
        <ul>
          <li v-for="username in $store.state.account ? $store.state.account.credentials : []"
              :key="username">
            <button class="btn-secondary"
                    @click="() => deleteCredential(username)">
              Revoke Access
            </button>
            <span>
              @{{username}}
            </span>
          </li>
        </ul>
      </fieldset>
      <ChangeAccountNameForm />
      <AddCredentialForm />
    </section>
    <hr/>
    <section>
      <header>
        <h2>Login settings for @{{ $store.state.username }}</h2>
      </header>
      <ChangeUsernameForm />
      <ChangePasswordForm />
    </section>
    <hr/>
    <section>
      <header>
        <h2>Account management</h2>
      </header>
      <LogoutForm />
      <DeleteAccountForm />
    </section>
    <hr/>
  </main>
</template>

<script>
import ChangeAccountNameForm from '@/components/Account/ChangeAccountNameForm.vue';
import AddCredentialForm from '@/components/Account/AddCredentialForm.vue';
import ChangeUsernameForm from '@/components/Account/ChangeUsernameForm.vue';
import ChangePasswordForm from '@/components/Account/ChangePasswordForm.vue';
import DeleteAccountForm from '@/components/Account/DeleteAccountForm.vue';
import LogoutForm from '@/components/Account/LogoutForm.vue';

export default {
  name: 'AccountPage',
  components: {
    ChangeAccountNameForm,
    AddCredentialForm,
    ChangeUsernameForm,
    ChangePasswordForm,
    DeleteAccountForm,
    LogoutForm,
  },
  mounted() {
    this.$store.commit('setHeader', {title: 'Account', enableBack: true});
  },
  methods: {
    async deleteCredential(username) {
      const res = await this.$helpers.fetch('/api/accounts/credentials', {
        method: 'DELETE',
        body: JSON.stringify({ username })
      });
      if (!res) return;

      this.$store.commit('setAccount', res.account);
      if (!res.account) {
        this.$store.commit('setUsername', null);
        this.$router.push({ name: 'Login' });
      }
      this.$store.commit('alert', {
        message: `Successfully removed ${username} from your account!`, status: 'success'
      });
    }
  },
};
</script>

<style scoped>
li {
  list-style-type: none;
  margin-bottom: 1rem;
}

button {
  margin-right: 2rem;
}
</style>
