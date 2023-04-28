<script lang="ts" setup>
const { data: yiyecekler, pending, error } = await useFetch('/api/menu')

if (error) {
  console.log(`Menü yüklerken hata oluştu: ${error.value?.message}`)
}
</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-6ClHcIwE2QYRyjtiBmziXp+9vDFl+WjKPaTfJqg0z8TywU6IIdn42GIVj2ySBU8Oe27bEvkP4J/4jZhcW8Nvsg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <div v-if="error">
    Bir hata oluştu
  </div>
  <div v-else-if="pending">
    Yükleniyor...
  </div>
  <div class="menu-container" v-else>
    <div class="features-section">
      <form class="search-box">
        <input type="text" placeholder="Arama yap...">
        <button type="submit">Ara</button>
      </form>
      <button>Ürün Ekle</button>
      <button>Ürün Sil</button>
      <button>Ürün Düzenle</button>
    </div>
    <div class="foods-section">
      <div class="food-box" v-for="yiyecek of yiyecekler" :key="yiyecek.ad">
        <div class="foto">
          <img :src="yiyecek.fotograf">
        </div>
        <div class="info">
          <p class="type">{{ yiyecek.tur }}</p>
          <p class="name">{{ yiyecek.ad }}</p>
          <p class="price">{{ yiyecek.fiyat }}₺</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  font-family: "Roboto Condensed", sans-serif;
  --font-color: #24221c;
  --button-color: #f7e9d9;
}

body {
  display: flex;
  justify-content: center;
}

.menu-container {
  overflow-y: auto;
  scrollbar-width: none;
  width: 71rem;
  color: var(--font-color);
  background-color: var(--menu-background);
}

.features-section {
  /*background-color: red;*/
  display: flex;
  justify-content: flex-end;
  margin: 0px 15px;
}
.search-box {
  display: flex;
  align-items: center;
}
.search-box input[type="text"] {
  border: none;
  border-radius: 3px;
  padding: 6px 8px;
  font-size: 16px;
  width: calc(100% - 80px);
}
.search-box button[type="submit"] {
  background-color: #fff;
  border: none;
  border-radius: 3px;
  color: #606060;
  font-size: 16px;
  padding: 6px 12px;
}
.features-section button {
  cursor: pointer;
  margin: 0.5rem 2px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  background-color: var(--button-color);
  color: var(--menu-background);
  border-radius: 5px;
  border: none;
}

.foods-section {
  /*background-color: blue;*/
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.food-box {
  width: calc(25% - 30px);
  height: 18rem;
  background-color: antiquewhite;
  border-radius: 10px;
  margin: 15px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.food-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}
.foto {
  justify-content: center;
  align-items: center;
  display: flex;
  height: 75%;
}
.foto img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.info{
  padding: 6px 16px 16px;
}
.info .type{
  font-size: 0.8rem;
  font-weight: 500;
}
.info .name{
  font-size: 1.1rem;
  font-weight: 700;
}
.info .price{
  font-size: 1.1rem;
  font-weight: 700;
}
</style>
