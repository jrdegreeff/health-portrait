<template>
    <article>
        <tr class="entryLog">
            <td>{{entry.type}}</td>
            <td>{{entry.detail}}</td>
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
                
                if (!r.ok) throw new Error((await r.json()).error);

                await this.$store.dispatch('refreshEntries');
                params.callback();
            } catch (e) {
                this.$store.commit('alert', { message: e, status: 'error' });
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