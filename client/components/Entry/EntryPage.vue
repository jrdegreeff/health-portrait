<template>
    <main>
        <section v-if="$store.state.username">
            <button class="btn-secondary">
                <router-link to="/newLog">Add Log ➕</router-link>
            </button>

            <table class="entries" v-if="$store.state.entries.length">
                <!-- <tr>
                    <th>Type</th>
                    <th>Title</th>
                    <th>Date</th>
                </tr> -->
                <EntryComponent 
                    v-for="entry in $store.state.entries" 
                    :key="entry._id"
                    :entry="entry"
                />
            </table>
        </section>
        <section v-else>
            <h2>Please log in to your account first!</h2>
        </section>
    </main>
</template>

<script lang="ts">
import EntryComponent from '@/components/Entry/EntryComponent.vue';

export default {
    name: 'EntryPage',
    components: {EntryComponent},
    mounted() {
        this.$store.commit('setTitle', {title: 'Health Journal', enableBack: false});
        if (this.$store.state.username) {
            this.$store.commit('refreshEntries');
        }
    }
}
</script>

<style scoped>
.entries {
    border: 1px solid black;
    border-bottom: 0px;
    border-spacing: 0px;
    margin-top: 2rem;
}

a {
    text-decoration: none;
}
</style>