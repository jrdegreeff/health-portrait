<!-- Form for changing account name (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'ChangeAccountNameForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/accounts',
      method: 'PATCH',
      setAccount: true,
      fields: [
        {id: 'name', label: 'Shared Account Name'}
      ],
      validators: {
        name: this.$helpers.validators.nonEmpty,
      },
      title: 'Change shared account name',
      callback: () => {
        this.$store.commit('alert', {
          message: 'Successfully changed shared account name!',
          status: 'success'
        });
      }
    };
  }
};
</script>
