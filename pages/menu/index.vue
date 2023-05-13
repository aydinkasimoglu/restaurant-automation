<script lang="ts" setup>
const { data: yiyecekler, pending, error } = await useFetch('/api/menu')

if (error.value !== null) {
  console.log(`Menü yüklenirken hata oluştu: ${error.value.message}`)
}

const searchValue = useState('searchValue', () => '')
const allYiyecekler = useState('allYiyecekler', () => [] as unknown as (typeof yiyecekler))
const categories = ['İçecekler', 'Tatlılar', 'Hamburgerler', 'Çorbalar', 'Salatalar', 'Et Yemekleri']

let sil: (id: number) => Promise<void>
let duzenleAc: (yiyecekAd: string, yiyecekFiyat: number, yiyecekTur: string, yiyecekFotograf: string, yiyecekId: number) => void
let duzenleKapat: () => void
let duzenle: (id: number) => Promise<void>
allYiyecekler.value = yiyecekler.value

const id = useState('yiyecekId', () => 0)

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

onMounted(() => {
  const edit = document.getElementById("yiyecek-duzenle")
  const yiyecekAdInput = document.getElementById("yiyecek-ad")
  const yiyecekFiyatInput = document.getElementById("yiyecek-fiyat")
  const yiyecekTurInput = document.getElementById("yiyecek-tur")
  const yiyecekFotografInput = document.getElementById("yiyecek-fotograf")
  const close = document.getElementById("edit-kapat")

  if (close) {
    close.addEventListener('click', () => duzenleKapat())
  }

  sil = async (id: number) => {
    console.log(id)
    if (confirm("Gerçekten silmek istiyor musun?")) {
      const { data, error } = await useFetch(`/api/silYiyecek/${id}`, {
        method: 'DELETE'
      })
      if (error.value !== null) {
        console.error(`Yiyecek silinirken hata oluştu: ${error.value.message}`)
      } else {
        alert(`${id} id'li yiyecek silindi`)
        location.reload()
      }
    }
  }

  duzenleAc = (yiyecekAd: string, yiyecekFiyat: number, yiyecekTur: string, yiyecekFotograf: string, yiyecekId: number) => {
    if (yiyecekAdInput === null || yiyecekFiyatInput === null || yiyecekTurInput === null || yiyecekFotografInput === null || edit === null) {
      console.error('Yiyecek düzenleme alanları bulunamadı')
      return
    }
    (yiyecekAdInput as HTMLInputElement).value = yiyecekAd;
    (yiyecekFiyatInput as HTMLInputElement).value = yiyecekFiyat.toString();
    (yiyecekTurInput as HTMLSelectElement).value = yiyecekTur;
    (yiyecekFotografInput as HTMLSelectElement).value = yiyecekFotograf
    id.value = yiyecekId
    edit.classList.remove('edit-kapali')
    edit.classList.add('edit-acik')
  }

  duzenleKapat = () => {
    if (edit === null) {
      console.error('Yiyecek düzenleme alanları bulunamadı')
      return
    }
    edit.classList.remove('edit-acik')
    edit.classList.add('edit-kapali')
  }

  duzenle = async (id: number) => {
    if (parseInt((yiyecekFiyatInput as HTMLInputElement).value) <= 0) {
      alert('Fiyat sıfırdan büyük olmalı')
      return
    }
    else {
      const { data, error } = await useFetch(`/api/duzenleYiyecek/${id}`, {
        method: 'PUT',
        body: {
          yiyecekId: id,
          yiyecekAd: (yiyecekAdInput as HTMLInputElement).value,
          yiyecekFiyat: (yiyecekFiyatInput as HTMLInputElement).value,
          yiyecekTur: (yiyecekTurInput as HTMLSelectElement).value,
          yiyecekFotograf: (yiyecekFotografInput as HTMLSelectElement).value
        }
      })

      if (error.value !== null) {
        console.error(`Yiyecek düzenlenirken hata oluştu: ${error.value.message}`)
      } else {
        alert(`${id} id'li yiyecek düzenlendi`)
        location.reload()
      }
    }
  }
})
</script>

<template>
  <div v-if="error">
    Bir hata oluştu
  </div>
  <div v-else-if="pending">
    Yükleniyor...
  </div>
  <div id="menu-container" v-else>
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
    <div id="features-section">
      <!-- Category buttons -->
      <button @click="filterByCategory('')">Tümü</button>
      <button @click="filterByCategory('İçecekler')">İçecekler</button>
      <button @click="filterByCategory('Tatlılar')">Tatlılar</button>
      <button @click="filterByCategory('Hamburgerler')">Hamburgerler</button>
      <button @click="filterByCategory('Çorbalar')">Çorbalar</button>
      <button @click="filterByCategory('Salatalar')">Salatalar</button>
      <button @click="filterByCategory('Et Yemekleri')">Et Yemekleri</button>
      <NuxtLink to="/menu/yeni" id="yeni-yiyecek">Yeni</NuxtLink>
      <!-- Search box -->
      <div id="search-box">
        <input type="text" placeholder="Arama yap..." v-model="searchValue">
        <span id="search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
      </div>
    </div>
    <!-- Foods section -->
    <div id="foods-section">
      <div class="food-box" v-for="yiyecek of filteredYiyecekler" :key="yiyecek.ad">
        <div class="foto">
          <img :src="yiyecek.fotograf">
        </div>
        <div class="info">
          <p class="type">{{ yiyecek.tur }}</p>
          <p class="name">{{ yiyecek.ad }}</p>
          <p class="price">{{ yiyecek.fiyat }}₺</p>
          <div class="edit">
            <i class="fa-solid fa-pen-to-square" title="Yiyeceği düzenle"
              @click="duzenleAc(yiyecek.ad, yiyecek.fiyat, yiyecek.tur, yiyecek.fotograf, yiyecek.id)">
            </i>
            <i class="fa-solid fa-trash" title="Siparişi Sil"
              @click="sil(yiyecek.id)">
            </i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
#menu-container {
  height: calc(100vh - 10rem);
  width: 100%;
  overflow-y: auto;
  /*hide scrollbar for firefox*/
  scrollbar-width: none;
}

#menu-container::-webkit-scrollbar {
  /*hide scrollbar for edge*/
  display: none;
}

#features-section {
  display: flex;
  justify-content: center;
  margin: 0px 15px;
}

#features-section>button {
  cursor: pointer;
  margin: 0.5rem 2px;
  padding: 3px 20px;
  font-size: 1rem;
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

#features-section>button:hover {
  box-shadow: rgba(0, 0, 0, 0.26) 0px 1px 4px 1px;
}
#yeni-yiyecek {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0.5rem 2px;
  padding: 3px 20px;
  font-size: 1rem;
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
#search-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  margin-left: 10px;
  position: relative;
}

#search-box>input[type=text] {
  margin-left: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 0.5rem;
  font-size: 16px;
  outline: none;
  width: 100%;
  text-indent: 1.5rem;
  user-select: none;
}

#search-icon {
  position: absolute;
  left: 1rem;
}

#search-icon>i {
  font-size: 16px;
  color: black;
}

#foods-section {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.food-box {
  width: calc(25% - 30px);
  height: 20rem;
  background-color: antiquewhite;
  border-radius: 0.5rem;
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

.foto>img {
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
.info .edit{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: small;
  width: 45px;
  height: 40px;
  margin-top: -2rem;
  margin-left: 8.5rem;
  background-color: rgb(230, 204, 173);
  color: rgb(0, 0, 0);
  border-radius: 0.2rem;
  border-radius: 3rem;
}
.edit i{
  margin: 0px 3px;
}

#edit-kapat {
  border: none;
  background-color: #EDDBC7;
  padding: 0.5em;
  border-radius: 0.5rem;
  cursor: pointer;
}

#edit-kapat:hover {
  background-color: #DCCBB8;
}

.edit-acik {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 1rem;
  padding: 1.5em;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 0.5rem;
  background-color: #EDDBC7;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.edit-acik>*:not(:first-child) {
  width: 100%;
}

.edit-kapali {
  display: none;
  position: absolute;
}
</style>
