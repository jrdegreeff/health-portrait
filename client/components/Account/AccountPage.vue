<template>
  <main>
    <section>
      <ChangeAccountNameForm />
    </section>
    <hr/>
    <section>
      <AddCredentialForm />
      <AccessList />
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
};
</script>
