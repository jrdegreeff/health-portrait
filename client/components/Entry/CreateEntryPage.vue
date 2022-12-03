<template>
    <main>
        <h2>Create New Log</h2>
        <CreateEntryForm />
    </main>
</template>

<script lang="ts">
import CreateEntryForm from '@/components/Entry/CreateEntryForm.vue';

export default {
    name: "CreateEntryPage",
    components: {CreateEntryForm},
    mounted() {
        this.$store.commit('setTitle', {title: 'Health Journal', enableBack: true});
    }
}
</script>