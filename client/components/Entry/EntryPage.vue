<template>
    <main>
        <button class="btn-secondary">
            <router-link to="/newLog">Add Log ➕</router-link>
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

<script>
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
        activeType: function() {
            const type = this.type;
            return type.charAt(0).toUpperCase() + type.slice(1);
        },
        filteredEntries: function() {
            const entries = this.$store.state.entries;
            if (this.type === "medication") {
                return entries.filter((entry) => {return entry.type === "medication"});
            } else if (this.type === "appointment") {
                return entries.filter((entry) => {return entry.type === "appointment"});
            } else if (this.type === "other") {
                return entries.filter((entry) => {return entry.type === "other"});
            } else {
                return entries;
            }
        }
    },
    mounted() {
        this.$store.commit('setHeader', {
            title: 'Health Journal', 
            enableBack: false,
            headerLinks: {
                "/logs/all": "All",
                "/logs/medication": "Medication",
                "/logs/appointment": "Appointment",
                "/logs/other": "Other",
            },
            activeLink: this.activeType,
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