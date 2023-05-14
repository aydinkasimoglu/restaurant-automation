<script lang="ts" setup>
const categories = ['İçecekler', 'Tatlılar', 'Hamburgerler', 'Çorbalar', 'Salatalar', 'Et Yemekleri']

let yiyecekAd: string
let yiyecekFiyat: string
let yiyecekTur: string
let yiyecekFotograf: string

const submit = async () => {
  if (parseInt(yiyecekFiyat) <= 0) {
    alert("Yiyecek fiyatı sıfırdan büyük olmalıdır")
    return
  }

  const { data, error } = await useFetch('/api/yeniYiyecek', {
    method: 'POST',
    body: {
      yiyecekAd,
      yiyecekFiyat,
      yiyecekTur,
      yiyecekFotograf
    }
  })

  if (error.value !== null) {
    console.error(`Yeni yiyecek oluşturulurken hata oluştu: ${error.value.message}`)
    return
  }

  alert(`${data.value} yiyecek eklendi`)
  navigateTo('/menu')
}
</script>

<template>
	<form @submit.prevent="submit" id="yiyecek-duzenle" class="edit-kapali">
	  <label for="yiyecek-fotograf">Yiyecek Fotoğraf URL'si</label>
	  <input type="text" v-model="yiyecekFotograf" id="yiyecek-fotograf" name="yiyecek-fotograf" placeholder="Yiyecek Fotoğrafı" required />

	  <label for="yiyecek-ad">Yiyecek Adı</label>
	  <input type="text" v-model="yiyecekAd" id="yiyecek-ad" name="yiyecek-ad" placeholder="Yiyecek Adı" required />

	  <label for="yiyecek-fiyat">Yiyecek Fiyatı</label>
	  <input type="number" v-model="yiyecekFiyat" id="yiyecek-fiyat" name="yiyecek-fiyat" placeholder="Yiyecek Fiyatı" required />

	  <label for="yiyecek-tur">Yiyecek Türü</label>
	  <select id="yiyecek-tur" v-model="yiyecekTur" name="yiyecek-tur" title="Yiyecek Adı" required>
	    <option selected disabled>Yiyecek Türü</option>
	    <option v-for="category of categories" key="yiyecek.tur">{{ category }}</option>
	  </select>

	  <button type="submit" id="yiyecek-kaydet">Kaydet</button>
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
