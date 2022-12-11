<template>
  <fieldset>
    <legend>People with access to the shared account</legend>
    <table>
      <tr v-for="username in $store.getters.credentials"
          :key="username">
        <td>
          @{{username}}
        </td>
        <td>
          <button class="btn-secondary"
                  @click="() => deleteCredential(username)">
            Remove from shared account
          </button>
        </td>
      </tr>
    </table>
  </fieldset>
</template>

<script>
export default {
  name: 'AccessList',
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
td {
  padding: 0.5rem 1rem;
}
</style>
