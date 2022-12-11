<template>
    <main>
        <button class="btn-primary">
            <NavLink :to="`/newLog/${type}`" name="Add log"></NavLink>
        </button>
        <table class="entries" v-if="filteredEntries">
            <EntryComponent 
                v-for="entry in filteredEntries" 
                :key="entry._id"
                :entry="entry"
            />
        </table>
    </main>
</template>

<script lang="ts">
import NavLink from '@/components/common/NavLink.vue';
import EntryComponent from '@/components/Entry/EntryComponent.vue';

export default {
    name: 'EntryPage',
    components: {NavLink, EntryComponent},
    props: {
        type: {
            type: String,
            required: true
      }
    },
    computed: {
        filteredEntries() {
            return this.$store.filter('populatedEntries', ['type'], this.type === 'all' ? '' : this.type);
        }
    },
    mounted() {
        this.$store.commit('setHeader', {
            title: `${this.$store.getters.accountName}'s Health Journal`,
            enableBack: true,
            headerLinks: {
                "/logs/all": "All", // keeping the /all here to avoid weird activeLink styling behavior
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
    border: 1px solid var(--dark);
    border-bottom: 0px;
    border-spacing: 0px;
    margin-top: 2rem;
}
</style>