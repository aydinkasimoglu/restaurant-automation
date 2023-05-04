<script lang="ts" setup>
const { data: yiyecekler, pending, error } = await useFetch('/api/menu')

if (error.value !== null) {
  console.log(`Menü yüklenirken hata oluştu: ${error.value.message}`)
}

const searchValue = useState('searchValue', () => '')
const allYiyecekler = useState('allYiyecekler', () => [] as unknown as (typeof yiyecekler))
const categories = ['İçecekler', 'Tatlılar', 'Hamburgerler', 'Çorbalar', 'Salatalar', 'Et Yemekleri']
allYiyecekler.value = yiyecekler.value

const filteredYiyecekler = computed(() => {
  const searchTerm = searchValue.value.toLowerCase().trim()

  if (!searchTerm) {
    return yiyecekler.value
  }
  
  if (yiyecekler.value) {
    return yiyecekler.value.filter(yiyecek =>
      yiyecek.ad.toLowerCase().includes(searchTerm)
    )
  }
})

const filterByCategory = (category: string) => {
  // Seçilen kategori geçerliyse ve allYiyecekler'in değeri varsa, verileri kategoriye göre filtrele
  if (categories.includes(category) && allYiyecekler.value) {
    const filteredYiyecekler = allYiyecekler.value.filter((yiyecek) => yiyecek.tur === category)
    yiyecekler.value = filteredYiyecekler
  } else {
    yiyecekler.value = allYiyecekler.value
  }
}
</script>

<template>
  <div v-if="error">
    Bir hata oluştu
  </div>
  <div v-else-if="pending">
    Yükleniyor...
  </div>
  <div class="menu-container" v-else>
    <div class="features-section">
      <!-- Category buttons -->
      <button @click="filterByCategory('')">Tümü</button>
      <button @click="filterByCategory('İçecekler')">İçecekler</button>
      <button @click="filterByCategory('Tatlılar')">Tatlılar</button>
      <button @click="filterByCategory('Hamburgerler')">Hamburgerler</button>
      <button @click="filterByCategory('Çorbalar')">Çorbalar</button>
      <button @click="filterByCategory('Salatalar')">Salatalar</button>
      <button @click="filterByCategory('Et Yemekleri')">Et Yemekleri</button>
      <!-- Search box -->
      <form class="search-box">
        <input type="text" placeholder="Arama yap..." v-model="searchValue">
        <span class="search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
      </form>
    </div>
    <!-- Foods section -->
      <div class="foods-section">
      <div class="food-box" v-for="yiyecek of filteredYiyecekler" :key="yiyecek.ad">
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
<style scoped>
.menu-container {
  /*adds scrollbar to block overflow*/
  height: calc(100vh - 10rem);
  width: 100%;
  overflow-y: auto;
  /*hide scrollbar for firefox*/
  scrollbar-width: none;
}
.menu-container::-webkit-scrollbar {
  /*hide scrollbar for edge*/
  display: none;
}

.features-section {
  /*background-color: red;*/
  display: flex;
  justify-content: center;
  margin: 0px 15px;
}
.features-section button {
  cursor: pointer;
  margin: 0.5rem 2px;
  padding: 3px 20px;
  font-size: 1rem;
  font-weight: bold;
  background-color: var(--button-color);
  color: var(--menu-background);
  border-radius: 20px;
  border: none;
  transition: background-color 0.3s, color 0.3s;
}
.features-section button:hover {
  background-color: #aaa;
}
.search-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  margin-left: 10px;
  position: relative;
}
.search-box input[type=text] {
  margin-left: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  outline: none;
  width: 100%;
}
.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.search-icon i {
  font-size: 16px;
  color: black; /* Adjust the color as needed */
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
  height: 80%;
}

.foto img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info {
  padding: 6px 16px 16px;
  font-size: 1.1rem;
  font-weight: 700;
}

.info .type {
  display: block;
  font-size: 0.8rem;
  font-weight: 500;
}

.info .name,
.info .price {
  display: inline-block;
}

.info .price {
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 40px;
  align-items: center;
  margin: -0.75rem;
  padding: 0.40rem;
  background-color: rgb(230, 204, 173);
  border-radius: 3rem;
  float: right;
}
</style>
