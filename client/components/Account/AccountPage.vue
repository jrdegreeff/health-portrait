<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>Shared account settings for {{ $store.state.account.name }}</h2>
      </header>
      <fieldset>
        <legend>Users with access to shared account</legend>
        <ul>
          <li v-for="username in $store.state.account.credentials"
              :key="username">
            <button class="btn-tertiary"
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
    this.$store.commit('setTitle', {title: 'Account', enableBack: true});
  },
  methods: {
    async deleteCredential(username) {
      const options = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        credentials: 'same-origin', // Sends express-session credentials with request
        body: JSON.stringify({username})
      };

      try {
        const r = await fetch('/api/accounts/credentials', options);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        this.$store.commit('setAccount', res.account);
        if (!res.account) {
          this.$store.commit('setUsername', null);
          this.$router.push({name: 'Login'});
        }
        this.$store.commit('alert', {
          message: `Successfully removed ${username} from your account!`, status: 'success'
        });
      } catch (e) {
        this.$store.commit('alert', {
          message: e, status: 'error'
        });
      }
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
