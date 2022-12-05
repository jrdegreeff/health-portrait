<template>
    <main>
        <h2>Edit Current Log</h2>
        <EditEntryForm :entryId="entryId"/>
    </main>
</template>

<script lang="ts">
import EditEntryForm from '@/components/Entry/EditEntryForm.vue';

export default {
    name: "EditEntryPage",
    components: {EditEntryForm},
    // https://router.vuejs.org/guide/essentials/passing-props.html
    props: {
        entryId: {
            type: String,
            required: true,
        },
    },
    mounted() {
        this.$store.commit('setHeader', {title: 'Health Journal', enableBack: true});
    }
}
</script>