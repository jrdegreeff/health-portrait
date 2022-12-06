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
  computed: {
    entry: function() {
      return this.$store.state.entries.find((entry) => entry._id === this.entryId);
    },
  },
  methods: {
    setDefaultFieldVals() {
      Object.entries(this.entry).forEach(([id, value]) => {
        const field = this.fields.find(f => f.id === id);
        field && (field.value = value);
      });
    },
  },
  mounted() {
    this.setDefaultFieldVals();
  },
};

</script>