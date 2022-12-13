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
          const formatDetail = r => { return {value: r._id, text: r._title}; }

          const collection = {
            appointment: this.$store.getters.populatedContacts,
            medication: this.$store.getters.populatedMedications,
          }[form.values['type']];
          const inactive = collection && collection.find(r => (r._id === form.values['detail'] && !r.active));

          const activeCollection = {
            appointment: this.$store.getters.activeContacts,
            medication: this.$store.getters.activeMedications,
          }[form.values['type']];
          const options = activeCollection && activeCollection.map(formatDetail);

          const label = {
            '': '',
            appointment: 'Appointment with',
            medication: 'Medication',
            other: 'Description',
          }[form.values['type']];
            
          const type = {
            '': 'hidden',
            appointment: 'select',
            medication: 'select',
            other: 'text',
          }[form.values['type']];

          if (inactive) {
            form.fields[0].disabled = true;
            form.fields[1] = {
              id: 'detail', label, type: 'select', options: [formatDetail(inactive)], disabled: true,
              instructions: `These fields are disabled since the associated ${
                form.values['type'] === 'appointment' ? 'contact' : form.values['type']
              } has been deleted`, 
            };
          } else {
            form.fields[1] = {id: 'detail', label, type, options};
          }
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