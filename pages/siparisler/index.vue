<script lang="ts" setup>
  const { data: siparisler, pending, error: siparisError } = await useFetch('/api/siparisler')
  const { data: yiyecekler, error: menuError } = await useFetch('/api/menu')
  const { data: masalar, error: masaError } = await useFetch('/api/masalar')

  if (siparisError.value !== null) {
    console.error(`Menü yüklerken hata oluştu: ${siparisError.value.message}`)
  }

  if (menuError.value !== null) {
    console.error(`Menü yüklerken hata oluştu: ${menuError.value.message}`)
  }

  let sil: (id: number) => Promise<void>
  let duzenleAc: (siparisId: number, masaId: number, siparisAdet: number, siparisAd: string) => void
  let duzenleKapat: () => void
  let duzenle: (id: number) => Promise<void>

  const id = useState('id', () => 0)

  onMounted(() => {
    const edit = document.getElementById("siparis-edit")
    const masaIdInput = document.getElementById("masa-id")
    const siparisAdetInput = document.getElementById("siparis-adet")
    const siparisAdInput = document.getElementById("siparis-ad")
    const save = document.getElementById("siparis-kaydet")
    const close = document.getElementById("edit-kapat")

    if (save) {
      save.addEventListener('click', () => duzenle(id.value))
    }

    if (close) {
      close.addEventListener('click', () => duzenleKapat())
    }

    sil = async (id: number) => {
      console.log(id)
      if (confirm("Gerçekten silmek istiyor musun?")) {
        const { data, error } = await useFetch(`/api/silSiparis/${id}`, {
          method: 'DELETE'
        })

        if (error.value !== null) {
          console.error(`Sipariş silinirken hata oluştu: ${error.value.message}`)
        } else {
          alert(`${id} id'li sipariş silindi`)
          location.reload()
        }
      }
    }

    duzenleAc = (siparisId: number, masaId: number, siparisAdet: number, siparisAd: string) => {
      if (masaIdInput === null || siparisAdetInput === null || siparisAdInput === null || edit === null) {
        console.error('Sipariş düzenleme alanları bulunamadı')
        return
      }
      (masaIdInput as HTMLInputElement).value = masaId.toString();
      (siparisAdetInput as HTMLInputElement).value = siparisAdet.toString();
      (siparisAdInput as HTMLSelectElement).value = siparisAd
      id.value = siparisId

      edit.classList.remove('edit-kapali')
      edit.classList.add('edit-acik')
    }

    duzenleKapat = () => {
      if (edit === null) {
        console.error('Sipariş düzenleme alanları bulunamadı')
        return
      }
      edit.classList.remove('edit-acik')
      edit.classList.add('edit-kapali')
    }

    duzenle = async (id: number) => {
      const { data, error } = await useFetch(`/api/duzenleSiparis/${id}`, {
        method: 'PUT',
        body: {
          siparisId: id,
          masaId: (masaIdInput as HTMLInputElement).value,
          siparisAdet: (siparisAdetInput as HTMLInputElement).value,
          siparisAd: (siparisAdInput as HTMLSelectElement).value
        }
      })

      if (error.value !== null) {
        console.error(`Sipariş düzenlenirken hata oluştu: ${error.value.message}`)
      } else {
        alert(`${id} id'li sipariş düzenlendi`)
        location.reload()
      }
    }
  })
</script>

<template>
  <div style="display: flex; flex-direction: column; align-items: flex-end;">
    <div id="siparis-edit" class="edit-kapali">
      <button type="button" id="edit-kapat" title="Düzenleme Alanını Kapat"><i class="fa-solid fa-times"></i></button>

      <label for="masa-id">Masa Numarası</label>
      <select v-model="masaId" name="masaId" id="masa-id" title="Masa Numarası" required>
        <option value="" disabled selected>Masa Numarası</option>
        <option v-for="masa in masalar" :key="masa.id" :value="masa.id">{{ masa.id }}</option>
      </select>

      <label for="siparis-adet">Sipariş Adedi</label>
      <input type="number" id="siparis-adet" placeholder="Sipariş Adedi" />

      <label for="siparis-ad">Sipariş Adı</label>
      <select id="siparis-ad" name="siparisAd" title="Yiyecek Adı" required>
        <option disabled>Yiyecek Adı</option>
        <option v-for="yiyecek in yiyecekler" :key="yiyecek.ad">{{ yiyecek.ad }}</option>
      </select>

      <button type="button" id="siparis-kaydet">Kaydet</button>
    </div>

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
          <div>#{{ siparis.masa_id }}</div>
          <div>{{ siparis.adet }} Adet</div>
          <div>{{ siparis.ad }} - {{ siparis.tur }}</div>
          <div>{{ new Date(siparis.tarih).toLocaleString("tr-TR") }}</div>
        </div>
        <div>{{ siparis.fiyat }}₺</div>
        <button type="button" class="siparis-sil" title="Siparişi Sil" @click="sil(siparis.siparis_id)"><i class="fa-solid fa-trash"></i></button>
        <button type="button" class="siparis-duzenle" title="Siparişi Düzenle" @click="duzenleAc(siparis.siparis_id, siparis.masa_id, siparis.adet, siparis.ad)"><i class="fa-solid fa-pen"></i></button>
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
  /*hide scrollbar for firefox*/
  scrollbar-width: none;
}
#siparisler::-webkit-scrollbar {
  /*hide scrollbar for edge*/
  display: none;
}
.siparis {
  display: grid;
  grid-template-columns: 1fr 2fr 0.4fr 0.4fr 0.4fr;
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

.siparis-sil, .siparis-duzenle, #edit-kapat {
  border: none;
  background-color: #EDDBC7;
  padding: 0.5em;
  border-radius: 0.5rem;
  cursor: pointer;
}

.siparis-sil:hover, .siparis-duzenle:hover, #edit-kapat:hover {
  background-color: #DCCBB8;
}

.edit-acik {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 0.5rem;
  background-color: #EDDBC7;
  position: absolute;
  z-index: 1;
}

.edit-acik > *:not(:first-child) {
  width: 100%;
}

.edit-kapali {
  display: none;
  position: absolute;
}

</style>
