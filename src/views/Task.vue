<template>
    <div class="row">
        <div v-if="task" class="col s6">
            <h1>{{task.title}}</h1>

            <form @submit.prevent="submitHandler">
				<div class="chips" ref="chips"></div>
				<div class="input-field">
					<textarea v-model="description" id="description" class="materialize-textarea"></textarea>
            		<label for="textarea2">Description</label>
					<span class="character-counter" style="float: right; font-size: 12px;">{{description.length}}/2048</span>
				</div>
				<div class="input-field">
					<input type="text" ref="datepicker" placeholder="Date">
				</div>
                <div v-if="task.status !== 'complete'">
                    <button type="submit" class="btn">Update task</button>
                    <button class="btn blue" type="button" style="margin-left: 10px;" @click="completeTask">
                        Complete task
                    </button>
                </div>
			</form>
        </div>
        <p v-else>Task not found</p>
    </div>
</template>

<script>
    export default {
        name: 'task',
        computed: {
            task() {
                return this.$store.getters.taskById(+this.$route.params.id)
            }
        },
        data() {
            return {
                description: '',
                chips: null,
                date: null
            }
        },
        mounted() {
            this.description = this.task.description
            this.chips = M.Chips.init(this.$refs.chips, {
                placeholder: 'Task tags',
                data: this.task.tags
            });
            this.date = M.Datepicker.init(this.$refs.datepicker, {
                format: 'dd.mm.yy',
                defaultDate: new Date(this.task.date),
                setDefaultDate: true
            });
            setTimeout(() => {
                M.updateTextFields()
            }, 0)
        },
        methods: {
            submitHandler() {
                this.$store.dispatch('updateTask',{
                    id: this.task.id,
                    description: this.description,
                    date: this.date.date
                });
                this.$router.push('/list');
            },
            completeTask() {
                this.$store.dispatch('completeTask', this.task.id);
                this.$router.push('/list');
            }
        },
        destroyed() {
            if (this.date && this.date.destroy) {
                this.date.destroy();
            };

            if (this.chips && this.chips.destroy) {
                this.chips.destroy();
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>