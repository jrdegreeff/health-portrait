<template>
    <article>
        <tr class="entryLog">
            <td>{{entry.type}}</td>
            <td v-if="medLink">
                <router-link :to="medLink">{{entry.detail}}</router-link>
            </td>
            <td v-else>
                {{entry.detail}}
            </td>
            <td>{{entry.condition}}</td>
            <td class="tdCentered">{{entry.scale}}</td>
            <td>{{entry.date}}</td>
            <td>
                <button class="btn-secondary">
                    <router-link :to="link">✏️ edit</router-link>
                </button>
            </td>
            <td>
                <button class="btn-secondary" @click="deleteEntry">
                    🗑️ delete
                </button>
            </td>
            <td v-if="!expanded">
                <button class="btn-secondary" @click="toggleExpand">
                    more
                </button>
            </td>
            <td v-else>
                <button class="btn-secondary" @click="toggleExpand">
                    less
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
    computed: {
        medLink() {
            if (this.entry.type === "medication") {
                const med = this.$store.state.medications.find(med => med.name === this.entry.detail);
                return med ? `/medications#${med._id}` : ''
            }
        }
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
    margin: 1rem 1rem;
    width: 8rem;
}

.tdCentered {
    text-align: center;
    width: 4rem;
}

.entryNote {
    border-bottom: 1px solid black;
    padding: 1rem 2rem;
}
</style>