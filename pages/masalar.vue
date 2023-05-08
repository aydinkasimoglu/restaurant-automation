<script lang="ts" setup>
const { data: masalar, pending, error: masalarError } = await useFetch('/api/masalar')
const { data: siparisler, error: siparislerError } = await useFetch('/api/siparisler')

if (masalarError.value !== null) {
  console.error(`Masalar yüklenirken hata oluştu: ${masalarError.value.message}`)
}

if (siparislerError.value !== null) {
  console.error(`Siparişler yüklenirken hata oluştu: ${siparislerError.value.message}`)
}

let siparisleriGoster: (masaId: number) => void

onMounted(() => {
  siparisleriGoster = (masaId: number) => {
    const masaSiparisleri = siparisler.value?.filter((siparis) => siparis.masa_id === masaId)

    const masaSiparislerDiv = document.getElementById(`masa-${masaId}-siparisler`)
    if (masaSiparislerDiv && masaSiparislerDiv.classList.contains('siparisler-kapali')) {
      masaSiparislerDiv.innerHTML = ''
      masaSiparisleri?.forEach((siparis) => {
        const siparisDiv = document.createElement('div')
        siparisDiv.innerHTML = `
          <div>${siparis.adet} x ${siparis.ad}</div>
        `
        masaSiparislerDiv.appendChild(siparisDiv)
      })

      masaSiparislerDiv.classList.remove('siparisler-kapali')
      masaSiparislerDiv.classList.add('siparisler-acik')

      document.getElementById(`masa-${masaId}-goster`)!.textContent = 'Siparişleri Gizle'
    }
    else if (masaSiparislerDiv && masaSiparislerDiv.classList.contains('siparisler-acik')) {
      masaSiparislerDiv.classList.remove('siparisler-acik')
      masaSiparislerDiv.classList.add('siparisler-kapali')

      document.getElementById(`masa-${masaId}-goster`)!.textContent = 'Siparişleri Göster'
    }
  }
})

const siparisleriTemizle = async (masaId: number) => {
  if (confirm('Siparişleri temizlemek istediğinize emin misiniz?')) {
    const { data, error } = await useFetch(`/api/temizleMasa/${masaId}`, {
      method: 'DELETE',
    })

    if (error.value === null) {
      alert('Siparişler temizlendi')
      location.reload()
    } else {
      console.error(`Siparişler temizlenirken hata oluştu: ${error.value.message}`)
    }
  }
}

</script>

<template>
	<div v-if="masalarError">
		Bir hata oluştu
	</div>
	<div v-else-if="pending">
		Yükleniyor...
	</div>
	<div v-else id="masalar">
		<div v-for="masa of masalar" :key="masa.id" :style="`border: 3px solid ${masa.dolu ? 'green' : 'red'}; background-color: var(--primary-color)`" class="masa">
      <div class="masa-id">Masa {{ masa.id }}</div>
      <div class="masa-dolu">{{ masa.dolu == 0 ? 'Boş' : 'Dolu' }}</div>
      <div class="masa-siparis-sayisi"> {{ siparisler?.filter((siparis) => siparis.masa_id === masa.id).length }} Sipariş </div>
      <div class="masa-ucret">Toplam ücret: {{ masa.toplam_fiyat }}₺</div>
      <div :id="`masa-${masa.id}-siparisler`" class="masa-siparisler siparisler-kapali"></div>
      <button type="button" :id="`masa-${masa.id}-goster`" class="siparisGoster" v-if="masa.dolu == 1" @click="siparisleriGoster(masa.id)">Siparişleri Göster</button>
      <button type="button" v-if="masa.dolu == 1" @click="siparisleriTemizle(masa.id)">Siparişleri Temizle</button>
    </div>
	</div>
</template>

<style scoped>
#masalar {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
}

.masa {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  gap: 0.5rem;
}

.masa-id {
  font-weight: bold;
}

.masa-siparisler {
  overflow-y: auto;
  max-height: 5rem;
  border: 1px solid black;
}

.siparisler-kapali {
  display: none;
}

.siparisler-acik {
  display: block;
}

.masa > button {
  border: none;
  border-radius: 0.2rem;
  padding: 0.5em 1em;
  text-align: center;
  text-transform: uppercase;
  background-color: var(--tertiary-color);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  color: var(--light-font-color);
  font-weight: 500;
  transition: box-shadow 0.2s;
  cursor: pointer;
}

.masa > button:hover {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
