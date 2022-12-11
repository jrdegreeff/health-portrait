<template>
    <main>
        <button class="btn-secondary">
            <router-link to="/newLog">➕ add</router-link>
        </button>

        <table class="entries" v-if="filteredEntries">
            <!-- <tr>
                <th>Type</th>
                <th>Title</th>
                <th>Date</th>
            </tr> -->
            <EntryComponent 
                v-for="entry in filteredEntries" 
                :key="entry._id"
                :entry="entry"
            />
        </table>
    </main>
</template>

<script lang="ts">
import EntryComponent from '@/components/Entry/EntryComponent.vue';

export default {
    name: 'EntryPage',
    components: {EntryComponent},
    props: {
        type: {
            type: String,
            required: true
      }
    },
    computed: {
        activeType() {
            const type = this.type;
            return type.charAt(0).toUpperCase() + type.slice(1);
        },
        filteredEntries() {
            return this.type === "all" ? this.$store.state.entries : this.$store.state.entries.filter(e => e.type === this.type);
        }
    },
    mounted() {
        this.$store.commit('setHeader', {
            title: `${this.$store.state.account.name}'s Health Journal`,
            enableBack: true,
            headerLinks: {
                "/logs/all": "All",
                "/logs/medication": "Medication",
                "/logs/appointment": "Appointment",
                "/logs/other": "Other",
            },
        });
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
</style>