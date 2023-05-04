<script lang="ts" setup>

const { data: yiyecekler, pending, error } = await useFetch('/api/menu')
const { data: masalar, error: menuError } = await useFetch('/api/masalar')

if (error.value !== null) {
  console.error(`Yeni sipariş için yiyecekler yüklenirken hata oluştu: ${error.value.message}`)
}

let siparisAd: string
let siparisAdet: string
let masaId: string

const submit = async () => {
  // /api/yeniSiparis adresine POST isteği gönder
  const { data, error } = await useFetch('/api/yeniSiparis', {
    method: 'POST',
    body: {
      siparisAd,
      siparisAdet,
      masaId
    }
  })

  if (error.value !== null) {
    console.error(`Yeni sipariş oluşturulurken hata oluştu: ${error.value.message}`)
    return
  }

  alert(`${data.value} sipariş eklendi`)
  location.href = '/siparisler'
}

</script>

<template>
  <div v-if="error">
    Bir hata oluştu
  </div>
  <div v-else-if="pending">
    Yükleniyor...
  </div>
  <form @submit.prevent="submit" v-else>
    <label for="masaId">Masa Numarası</label>
    <select v-model="masaId" name="masaId" title="Masa Numarası" required>
      <option value="" disabled selected>Masa Numarası</option>
      <option v-for="masa in masalar" :key="masa.id" :value="masa.id">{{ masa.id }}</option>
    </select>

    <label for="siparisAd">Yiyecek Adı</label>
    <select v-model="siparisAd" name="siparisAd" title="Yiyecek Adı" required>
      <option value="" disabled selected>Yiyecek Adı</option>
      <option v-for="yiyecek in yiyecekler" :key="yiyecek.ad" :value="yiyecek.ad">{{ yiyecek.ad }}</option>
    </select>

    <label for="siparisAdet">Adet</label>
    <input v-model="siparisAdet" type="number" id="siparisAdet" name="siparisAdet" placeholder="Adet" required>

    <button type="submit">Sipariş Oluştur</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1em;
  background-color: #F8EAD8;
  border-radius: 0.5rem;
}
</style>
