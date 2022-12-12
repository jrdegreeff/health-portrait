<template>
    <article>
        <tr class="entryLog">
            <td>{{entry.type}}</td>
            <td>
                <router-link
                    v-if="entry.active"
                    :to="{name: pageForType(entry.type), hash:`#${entry.detail}`}"
                >
                    {{entry.title}}
                </router-link>
                <span v-else>
                    {{entry.title}}
                </span>
            </td>
            <td>{{entry.condition}}</td>
            <td class="tdCentered">{{entry.scale}}</td>
            <td>{{entry.date}}</td>
            <td>
                <button class="btn-secondary" @click="toggleExpand">
                    {{ expanded ? 'view less' : 'view more' }}
                </button>
            </td>
        </tr>
        <div v-if="expanded" class="entryNote">
            <div class="left">
                <p>
                    Note: {{entry.notes}}
                </p>
            </div>
            <div class="right">
                <button class="btn-secondary" @click="$router.push({ path: `/editLog/${entry._id}` })">
                    ✏️ edit
                </button>
                <button class="btn-secondary" @click="deleteEntry">
                    🗑️ delete
                </button>
            </div>
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
            expanded: false,
        };
    },
    methods: {     
        pageForType(type) {
            return {
                appointment: 'Contacts',
                medication: 'Medications',
            }[type];
        },
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
            const res = await this.$helpers.fetch(`/api/entries/${this.entry._id}`, {
                method: params.method,
            });
            if (!res) return;

            await this.$store.dispatch('refreshEntries');
            params.callback();
        }
    }
}
</script>

<style scoped>
.entryLog {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    border-bottom: 1px solid var(--dark);
}

td {
    margin: 1rem 1rem;
    width: 10rem;
}

.tdCentered {
    text-align: center;
    width: 6rem;
}

.entryNote {
    position: relative;
    display: grid;
    grid-template-columns: 2fr 1fr;
    border-bottom: 1px solid var(--dark);
    padding: 1rem 2rem;
}

.left {
    max-width: fit-content;
}

.right {
    position: absolute;
    right: 1rem;
    top: 2rem;
}

.btn-secondary {
    width: 8rem;
    margin: 0rem 1rem;
}

td > a {
    text-decoration: underline;
}
</style>
