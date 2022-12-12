<script>
import moment from 'moment';
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateEntryForm',
  mixins: [BlockForm],
  props: {
    type: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      url: '/api/entries',
      method: 'POST',
      title: 'Add log',
      fields: [
        {id: 'type', label: 'Type', type: 'select', options: [
          {value: 'appointment', text: 'Appointment'},
          {value: 'medication', text: 'Medication'},
          {value: 'other', text: 'Other'},
        ], default: (this.type !== "all") ? this.type : ''},
        {id: 'detail', label: '', type: 'hidden'},
        {id: 'condition', label: 'Condition', type: 'select', options: [
          {value: 'pain', text: 'pain'},
          {value: 'cognition', text: 'cognition'},
          {value: 'happiness', text: 'happiness'},
        ]},
        {id: 'scale', label: 'Scale', type: 'range', range: {min: 1, max: 10}, default: 5, instructions: '1 for lowest, 10 for highest'},
        {id: 'date', label: 'Date', type: 'date', default: moment().format('YYYY-MM-DD')},
        {id: 'notes', label: 'Notes', type: 'textarea', optional: true},
      ],
      updaters: {
        type: form => {
          const detailTypes = {
            '': {id: 'detail', label: '', type: 'hidden'},
            appointment: {id: 'detail', label: 'Appointment with', type: 'select', options: this.$store.getters.activeContacts.map(
              c => { return {value: c._id, text: c.title}; }
            )},
            medication: {id: 'detail', label: 'Medication', type: 'select', options: this.$store.getters.activeMedications.map(
              m => { return {value: m._id, text: m.title}; }
            )},
            other: {id: 'detail', label: 'Description'},
          };
          form.fields[1] = detailTypes[form.values['type']];
        }
      },
      validators: {
        date: this.$helpers.validators.date,
      },
      callback: async () => {
        this.$store.commit('alert', {
          message: 'You\'ve created a new entry!', status: 'success'
        });
        await this.$store.dispatch('refreshEntries');
        this.$router.go(-1);
      }
    };
  },
};
</script>