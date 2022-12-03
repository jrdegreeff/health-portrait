<script lang="ts">
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
            this.$router.push({name: 'Logs'}); // Goes to Logs page after creating new log
            this.$store.commit('alert', {
              message: 'You\'ve saved changes to the entry!', status: 'success'
            });
        }
    };
  }
};

</script>