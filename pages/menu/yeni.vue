<script lang="ts" setup>

</script>

<template>
	<form @submit.prevent="duzenle(id)" id="yiyecek-duzenle" class="edit-kapali">
	      <button type="button" id="edit-kapat" title="Düzenleme Alanını Kapat"><i class="fa-solid fa-times"></i></button>

	      <label for="yiyecek-fotograf">Yiyecek Fotoğraf URL'si</label>
	      <input type="text" id="yiyecek-fotograf" name="yiyecek-fotograf" placeholder="Yiyecek Fotoğrafı" required />

	      <label for="yiyecek-ad">Yiyecek Adı</label>
	      <input type="text" id="yiyecek-ad" name="yiyecek-ad" placeholder="Yiyecek Adı" required />

	      <label for="yiyecek-fiyat">Yiyecek Fiyatı</label>
	      <input type="number" id="yiyecek-fiyat" name="yiyecek-fiyat" placeholder="Yiyecek Fiyatı" required />

	      <label for="yiyecek-tur">Yiyecek Türü</label>
	      <select id="yiyecek-tur" name="yiyecek-tur" title="Yiyecek Adı" required>
	        <option disabled>Yiyecek Adı</option>
	        <option v-for="category of categories" key="yiyecek.tur">{{ category }}</option>
	      </select>

	      <button type="submit" id="yiyecek-kaydet">Kaydet</button>
	    </form>
</template>

<style scoped>

</style>
