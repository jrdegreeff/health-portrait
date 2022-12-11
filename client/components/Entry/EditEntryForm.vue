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
    type: {
        type: String,
        required: true
    },
  },
  data() {
    return {
      url: `/api/entries/${this.entryId}`,
      method: 'PATCH',
      title: 'Edit entry',
      callback: async () => {
        this.$store.commit('alert', {
          message: 'You\'ve saved changes to the entry!', status: 'success'
        });
        await this.$store.dispatch('refreshEntries');
        this.$router.go(-1);
      }
    };
  },
  created() {
    this.document = this.$store.state.entries.find(e => e._id === this.entryId);
  },
};

</script>