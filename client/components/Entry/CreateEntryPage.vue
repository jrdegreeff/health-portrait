<template>
    <main>
        <h2>Create New Log</h2>
        <CreateEntryForm :type="type"/>
    </main>
</template>

<script lang="ts">
import CreateEntryForm from '@/components/Entry/CreateEntryForm.vue';

export default {
    name: "CreateEntryPage",
    components: {CreateEntryForm},
    props: {
        type: {
            type: String,
            required: true
        }
    },
    mounted() {
        this.$store.commit('setHeader', {title: 'Health Journal', enableBack: true});
    }
}
</script>