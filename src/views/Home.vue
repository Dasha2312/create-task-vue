<template>
	<div class="row">
		<div class="col s6">
			<h1>Create</h1>

			<form @submit.prevent="submitHandler">
				<div class="input-field">
					<input id="title" type="text" v-model="title" class="validate" required>
					<label for="title">title</label>
					<span class="helper-text" data-error="Title us required"></span>
				</div>
				<div class="chips" ref="chips"></div>
				<div class="input-field">
					<textarea v-model="description" id="description" class="materialize-textarea"></textarea>
            		<label for="textarea2">Description</label>
					<span class="character-counter" style="float: right; font-size: 12px;">{{description.length}}/2048</span>
				</div>
				<div class="input-field">
					<input type="text" ref="datepicker" placeholder="Date">
				</div>
				<button type="submit" class="btn">Create task</button>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'create',
	data() {
		return {
			title: '',
			description: '',
			chips: null,
			date: null
		}
	},
	mounted() {
		this.chips = M.Chips.init(this.$refs.chips, {
			placeholder: 'Task tags'
		});
		this.date = M.Datepicker.init(this.$refs.datepicker, {
			format: 'dd.mm.yy',
			defaultDate: new Date(),
			setDefaultDate: true
		})
	},
	methods: {
		submitHandler() {
			const task = {
				title: this.title,
				description: this.description,
				id: Date.now(),
				status: 'active',
				tags: this.chips.chipsData,
				date: this.date.date
			}
			console.log(task)
			this.$store.dispatch('createTask', task);
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