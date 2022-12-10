<script lang="ts">
import moment from 'moment';
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateEntryForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/entries',
      method: 'POST',
      hasBody: true,
      title: 'Create new entry',
      fields: [
        {id: 'type', label: 'Type', type: 'select', options: ['medication', 'appointment', 'other']},
        {id: 'detail', label: 'Detail'},
        {id: 'condition', label: 'Condition', type: 'select', options: ['pain', 'cognition', 'happiness']},
        {id: 'scale', label: 'Scale', type: 'number'},
        {id: 'notes', label: 'Notes', type: 'textarea', optional: true},
        {id: 'date', label: 'Date', type: 'date', default: moment().format('YYYY-MM-DD')}
      ],
      callback: () => {
        this.$router.go(-1);
        this.$store.dispatch('refreshEntries');
        this.$store.commit('alert', {
          message: 'You\'ve created a new entry!', status: 'success'
        });
      }
    };
  },
};
</script>