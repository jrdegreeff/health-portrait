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
          this.$router.push({path: '/logs/all'}); // Goes to Logs page after creating new log
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
      const pairs = Object.entries(this.entry);
      pairs.forEach((arr) => {
        const key = arr[0];
        const value = arr[1];
        if (key === "type") {
          this.fields[0].value = value;
        } else if (key === "detail") {
          this.fields[1].value = value;
        } else if (key === "condition") {
          this.fields[2].value = value;
        } else if (key === "scale") {
          this.fields[3].value = value;
        } else if (key === "notes") {
          this.fields[4].value = value;
        } else if (key === "date") {
          this.fields[5].value = value;
        }
      });
    },
  },
  mounted() {
    this.setDefaultFieldVals();
  },
};

</script>