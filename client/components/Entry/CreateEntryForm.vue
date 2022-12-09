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
        {id: 'type', label: 'Type', value: ''},
        {id: 'detail', label: 'Detail', value: ''},
        {id: 'condition', label: 'Condition', value: ''},
        {id: 'scale', label: 'Scale', value: '', type: 'number'},
        {id: 'notes', label: 'Notes', value: '', type: 'textarea', optional: true},
        {id: 'date', label: 'Date', value: moment().format('YYYY-MM-DD'), type: 'date'}
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