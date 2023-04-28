<script lang="ts" setup>
  const { data: siparisler, pending, error } = await useFetch('/api/siparisler')

  if (error.value !== null) {
    console.error(`Menü yüklerken hata oluştu: ${error.value.message}`)
  }
</script>

<template>
  <div style="display: flex; flex-direction: column; align-items: flex-end;">
    <NuxtLink to="/siparisler/yeni" id="yeni-siparis">Yeni Sipariş</NuxtLink>

    <div v-if="error">
      Bir hata oluştu
    </div>
    <div v-else-if="pending">
      Yükleniyor...
    </div>
    <div v-else-if="siparisler?.length == 0" id="siparisler">
      Sipariş bulunmamakta
    </div>
    <div v-else id="siparisler">
      <div v-for="siparis of siparisler" class="siparis">
        <img :src="siparis.fotograf" alt="Yemeğin fotoğrafı"/>
        <div class="siparis-bilgi">
          <div>#{{ siparis.siparis_no }}</div>
          <div>{{ siparis.adet }} Adet</div>
          <div>{{ siparis.ad }} - {{ siparis.tur }}</div>
          <div>{{ new Date(siparis.tarih).toLocaleString("tr-TR") }}</div>
        </div>
        <div>{{ siparis.fiyat }}₺</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

#siparisler {
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  max-height: 40rem;
  gap: 1rem;
  overflow-y: auto;
  padding: 1em;
}

.siparis {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 40rem;
  place-items: center;
  background-color: #F8EAD8;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  font-family: "Roboto Condensed", sans-serif;
}

.siparis-bilgi {
  width: 100%;
  margin-left: 2.5rem;
}

#yeni-siparis {
  position: relative;
  bottom: 25px;
  display: inline-block;
  border: none;
  border-radius: 0.2rem;
  padding: 0.5em 1em;
  text-align: center;
  text-transform: uppercase;
  background-color: #EDDBC7;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  text-decoration: none;
  color: black;
  font-family: "Roboto Condensed", sans-serif;
  font-weight: 500;
  transition: box-shadow 0.2s;
}

#yeni-siparis:hover {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px 1px;
}

img {
  width: 150px;
  height: 150px;
  border-radius: 0.5rem;
}

</style>