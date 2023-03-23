<script lang="ts" setup>
	let counter = useState('counter', () => 1)

	var akgfj: number

	const bird: string = "kerem"


	function increment() {
		counter.value = counter.value + 1;
	}
	</script>

	<template>
	<div>
		<button @click="() => {increment()}">{{ counter }}</button>
		<button>{{ counter }}</button>
	</div>
</template>

<style scoped>

</style>
