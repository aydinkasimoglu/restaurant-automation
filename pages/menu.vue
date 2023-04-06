<script lang="ts" setup>
  const { data: yiyecekler, pending, error } = await useFetch('/api/menu')

  if (error) {
    console.log(`Menü yüklerken hata oluştu: ${error.value?.message}`)
  }
</script>

<template>
  <div v-if="error">
    Bir hata oluştu
  </div>
  <div v-else-if="pending">
    Yükleniyor...
  </div>
  <div v-else>
    <div v-for="yiyecek of yiyecekler" :key="yiyecek.ad">
      <p>{{ yiyecek.ad }}</p>
      <p>{{ yiyecek.fiyat }}</p>
      <p>{{ yiyecek.tur }}</p>
    </div>
  </div>
</template>