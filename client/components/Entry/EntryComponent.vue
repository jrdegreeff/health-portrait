<template>
    <article>
        <tr class="entryLog">
            <td>{{entry.type}}</td>
            <td>{{entry.detail}}</td>
            <td>{{entry.condition}}</td>
            <td>{{entry.scale}}</td>
            <td>{{entry.date}}</td>
            <td v-if="!expanded">
                <button class="btn-secondary" @click="toggleExpand">
                    View More
                </button>
            </td>
            <td v-else>
                <button class="btn-secondary" @click="toggleExpand">
                    View Less
                </button>
            </td>
            <td>
                <button class="btn-secondary">
                    <router-link :to="link">Edit ✏️</router-link>
                </button>
            </td>
            <td>
                <button class="btn-secondary" @click="deleteEntry">
                    Delete 🗑️
                </button>
            </td>
        </tr>
        <div v-if="expanded" class="entryNote">
            <p>
                Note: {{entry.notes}}
            </p>
        </div>
    </article>
</template>

<script>
export default {
    name: 'EntryComponent',
    props: {
        entry: {
            type: Object,
            required: true
      }
    },
    data() {
        return {
            link: `/editLog/${this.entry._id}`, 
            expanded: false,
            alerts: {} 
        };
    },
    methods: {     
        toggleExpand() {
            this.expanded = !this.expanded;
        },
        deleteEntry() {
            const params = {
                method: 'DELETE',
                callback: () => {
                    this.$store.commit('alert', {
                        message: 'Successfully deleted entry!', status: 'success'
                    });
                }
            };
            this.request(params);
        },
        async request(params) {
            const options = {
                method: params.method, headers: {'Content-Type': 'application/json'}
            };
            try {
                const r = await fetch(`/api/entries/${this.entry._id}`, options);
                if (!r.ok) {
                    const res = await r.json();
                    throw new Error(res.error);
                }
                this.$store.dispatch('refreshEntries');
                params.callback();
            } catch (e) {
                this.$set(this.alerts, e, 'error');
                setTimeout(() => this.$delete(this.alerts, e), 3000);
            }
        }
    }
}
</script>

<style scoped>
.entryLog {
    display: flex;
    border-bottom: 1px solid black;
}

td {
    margin: 1rem 2rem;
}

.entryNote {
    border-bottom: 1px solid black;
    padding: 1rem 2rem;
}
</style>