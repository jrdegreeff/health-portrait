<script>
import CreateEntryForm from '@/components/Entry/CreateEntryForm.vue';

export default {
  name: 'EditEntryForm',
  mixins: [CreateEntryForm],
  props: {
    entryId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      url: `/api/entries/${this.entryId}`,
      method: 'PATCH',
      hasBody: true,
      title: 'Edit entry',
      callback: () => {
        this.$router.go(-1);
        this.$store.dispatch('refreshEntries');
        this.$store.commit('alert', {
          message: 'You\'ve saved changes to the entry!', status: 'success'
        });
      }
    };
  },
  created() {
    this.values = this.$store.state.entries.find(e => e._id === this.entryId);
  },
};

</script>