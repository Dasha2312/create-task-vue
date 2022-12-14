<template>
    <div>
        <h1>List</h1>

        <div class="row">
            <div class="input-field col s3 m6">
                <select ref="select" v-model="filter">
                    <option value="" disabled selected>Choose your option</option>
                    <option value="active">active</option>
                    <option value="outdate">outdate</option>
                    <option value="complete">Complete</option>
                </select>
                <label>Filter tasks</label>
            </div>
        </div>

        <button v-if="filter" class="btn btn-small" @click="clearFilter">Clear filter</button>

        <table class="task-items" v-if="tasks.length">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Link</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(task, index) of displayTasks" :key="task.id">
                    <td class="number">
                        {{index + 1}}
                    </td>
                    <td class="title">
                        {{task.title}}
                    </td>
                    <td class="description">
                        <div class="text">{{task.description}}</div>
                    </td>
                    <td class="date">
                        {{ new Date(task.date).toLocaleDateString() }}
                    </td>
                    
                    <td class="status">
                        {{task.status}}
                    </td>
                    <td>
                        <router-link class="btn" :to="'/task/' + task.id">Open</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-else>No tasks</p>
    </div>
</template>

<script>
    export default {
        name: 'list',
        data() {
            return {
                filter: null
            }
        },
        computed: {
            tasks() {
                return this.$store.getters.tasks
            },
            displayTasks() {
                return this.tasks.filter(t => {
                    if(!this.filter) {
                        return true
                    }
                    return t.status === this.filter
                })
            },
            clearFilter() {
                
                this.filter = null
                M.FormSelect.getInstance(this.$refs.select).destroy();
                setTimeout(() => {
                    M.FormSelect.init(this.$refs.select)
                }, 0)
            }
        },
        mounted() {
            M.FormSelect.init(this.$refs.select)
        },

    }
</script>

<style lang="scss" scoped>
.description {
    max-width: 400px;
}
.text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>