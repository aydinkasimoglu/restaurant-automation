<script lang="ts" setup>

const { data: yiyecekler, pending, error: menuError } = await useFetch('/api/menu')
const { data: masalar, error: masaError } = await useFetch('/api/masalar')

if (menuError.value !== null) {
  console.error(`Yeni sipariş için yiyecekler yüklenirken hata oluştu: ${menuError.value.message}`)
}

if (masaError.value !== null) {
  console.error(`Yeni sipariş için masalar yüklenirken hata oluştu: ${masaError.value.message}`)
}

let siparisAd: string
let siparisAdet: string
let masaId: string

const submit = async () => {
  if (parseInt(siparisAdet) <= 0) {
    alert("Sipariş adedi sıfırdan büyük olmalıdır")
    return
  }

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
  navigateTo('/siparisler')
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

form > button {
  margin: 0.5rem 2px;
  padding: 3px 20px;
  font-family: "Roboto Condensed", sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;
  background-color: var(--tertiary-color);
  color: var(--light-font-color);
  border-radius: 0.2rem;
  border: none;
  transition: background-color 0.3s, color 0.3s;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
</style>
