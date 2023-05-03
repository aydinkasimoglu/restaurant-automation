<script lang="ts" setup>

const { data: yiyecekler, pending, error } = await useFetch('/api/menu')

if (error.value !== null) {
  console.error(`Yeni sipariş için yiyecekler yüklenirken hata oluştu: ${error.value.message}`)
}

let siparisAd: string
let siparisAdet: string
let siparisNo: string

const submit = async () => {
  // /api/yeniSiparis adresine POST isteği gönder
  const { data, error } = await useFetch('/api/yeniSiparis', {
    method: 'POST',
    body: {
      siparisAd,
      siparisAdet,
      siparisNo
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
    <label for="siparisAd">Yiyecek Adı</label>
    <select v-model="siparisAd" name="siparisAd" title="Yiyecek Adı" required>
      <option value="" disabled selected>Yiyecek Adı</option>
      <option v-for="yiyecek in yiyecekler" :key="yiyecek.ad" :value="yiyecek.ad">{{ yiyecek.ad }}</option>
    </select>

    <label for="siparisAdet">Adet</label>
    <input v-model="siparisAdet" type="number" id="siparisAdet" name="siparisAdet" placeholder="Adet" required>

    <label for="siparisNo">Sipariş Numarası</label>
    <input v-model="siparisNo" type="number" id="siparisNo" name="siparisNo" placeholder="Sipariş Numarası" required>

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