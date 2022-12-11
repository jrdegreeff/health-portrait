<template>
  <main>
    <section>
      <ChangeAccountNameForm />
    </section>
    <hr/>
    <section>
      <AddCredentialForm />
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
    </section>
    <hr/>
    <section>
      <DeleteAccountForm />
    </section>
    <hr/>
  </main>
</template>

<script>
import ChangeAccountNameForm from '@/components/Account/ChangeAccountNameForm.vue';
import AddCredentialForm from '@/components/Account/AddCredentialForm.vue';
import DeleteAccountForm from '@/components/Account/DeleteAccountForm.vue';

export default {
  name: 'AccountPage',
  components: {
    ChangeAccountNameForm,
    AddCredentialForm,
    DeleteAccountForm,
  },
  mounted() {
    this.$store.commit('setHeader', {
      title: `Shared Account Settings for ${this.$store.getters.accountName}`,
      enableBack: true,
      headerLinks: {
        '/account': 'Shared Account',
        '/user': this.$store.getters.username,
      },
    });
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
