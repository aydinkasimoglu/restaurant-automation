<script lang="ts" setup>
const { data: masalar, pending, error: masalarError } = await useFetch('/api/masalar')

if (masalarError.value !== null) {
  console.error(`Masalar yüklenirken hata oluştu: ${masalarError.value.message}`)
}
</script>

<template>
	<div v-if="masalarError">
		Bir hata oluştu
	</div>
	<div v-else-if="pending">
		Yükleniyor...
	</div>
	<div v-else id="masalar">
		<div v-for="masa of masalar" :key="masa.id" :style="`border: 3px solid ${masa.dolu ? 'green' : 'red'}; background-color: var(--primary-color)`" class="masa">
      <div class="masa-id">Masa {{ masa.id }}</div>
      <div class="masa-dolu">{{ masa.dolu == 0 ? 'Boş' : 'Dolu' }}</div>
      <div class="masa-ucret">Toplam ücret: {{ masa.toplam_fiyat }}₺</div>
    </div>
	</div>
</template>

<style scoped>
#masalar {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
}

.masa {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  gap: 0.5rem;
}

.masa-id {
  font-weight: bold;
}
</style>
