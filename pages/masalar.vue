<script lang="ts" setup>
const { data: masalar, pending, error: siparisError } = await useFetch('/api/masalar')
</script>
<template>
	<div v-if="error">
		Bir hata oluştu
	</div>
	<div v-else-if="pending">
		Yükleniyor...
	</div>
	<div v-else>
		<div v-for="masa of masalar" :key="masa.id">
			<p class="no">Masa {{ masa.id }}</p>
			<p class="totalcost">Ücret: {{ masa.toplam_fiyat }}₺</p>
		</div>
	</div>
</template>
