<script setup>
const { data: calisanlar, pending, error } = await useFetch('/api/calisanlar')
</script>

<template>
  <div v-if="error">
    Bir hata oluştu
  </div>
  <div v-else-if="pending">
    Yükleniyor...
  </div>
  <div v-else id="calisanlar">
    <div v-for="calisan of calisanlar" class="calisan">
      <div style="display:flex; flex-direction: column;">
        <div class="calisan-ad">{{ calisan.ad }}</div>
        <div class="calisan-soyad">{{ calisan.soyad }}</div>
      </div>
      <div class="calisan-cinsiyet">{{ calisan.cinsiyet }}</div>
      <div class="calisan-telefon">{{ calisan.telefon_no }}</div>
      <div class="calisan-pozisyon">{{ calisan.pozisyon }}</div>
      <div class="calisan-maas">{{ calisan.maas }}₺</div>
    </div>
  </div>
</template>

<style scoped>
  #calisanlar {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1em;
    overflow-y: auto;
    /*hide scrollbar for firefox*/
    scrollbar-width: none;
  }

  #calisanlar::-webkit-scrollbar {
    /*hide scrollbar for edge*/
    display: none;
  }

  .calisan {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 1em;
    place-items: center;
    display: grid;
    padding: 0.5rem;
    max-width: 50rem;
    border-radius: 0.5rem;
    background-color: var(--primary-color);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    margin-bottom: 1rem;
  }
</style>