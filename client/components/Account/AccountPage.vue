<template>
  <main>
    <section>
      <ChangeAccountNameForm @submit="setHeader" />
    </section>
    <hr/>
    <section>
      <AddCredentialForm />
      <AccessList v-if="$store.getters.credentials.length > 1" />
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
import AccessList from '@/components/Account/AccessList.vue';
import DeleteAccountForm from '@/components/Account/DeleteAccountForm.vue';

export default {
  name: 'AccountPage',
  components: {
    ChangeAccountNameForm,
    AddCredentialForm,
    AccessList,
    DeleteAccountForm,
  },
  methods: {
    setHeader() {
      this.$store.commit('setHeader', {
      title: `Shared Account Settings for ${this.$store.getters.accountName}`,
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
