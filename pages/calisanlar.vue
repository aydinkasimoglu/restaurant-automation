<script lang="ts" setup>
const { data: calisanlar, pending: calisanPending, error: calisanError } = await useFetch('/api/calisanlar')
const { data: erkekCalisanlar, pending: erkekPending, error: erkekError } = await useFetch('/api/calisanlar/erkek')
const { data: kadinCalisanlar, pending: kadinPending, error: kadinError } = await useFetch('/api/calisanlar/kadin')

if (calisanError.value !== null) {
  console.error(`Çalışanlar yüklenirken hata oluştu: ${calisanError.value.message}`)
}

if (erkekError.value !== null) {
  console.error(`Erkek çalışanlar yüklenirken hata oluştu: ${erkekError.value.message}`)
}

if (kadinError.value !== null) {
  console.error(`Kadın çalışanlar yüklenirken hata oluştu: ${kadinError.value.message}`)
}

const tumChecked = useState('tumChecked', () => true)
const erkekChecked = useState('erkekChecked', () => false)
const kadinChecked = useState('kadinChecked', () => false)

onMounted(() => {
  const tum = document.getElementById('tum') as HTMLInputElement
  const erkek = document.getElementById('erkek') as HTMLInputElement
  const kadin = document.getElementById('kadin') as HTMLInputElement

  tumChecked.value = tum.checked
  erkekChecked.value = erkek.checked
  kadinChecked.value = kadin.checked

  tum.addEventListener('click', () => {
    tumChecked.value = tum.checked
    erkek.checked = false
    kadin.checked = false
    erkekChecked.value = erkek.checked
    kadinChecked.value = kadin.checked
  })

  erkek.addEventListener('click', () => {
    erkekChecked.value = erkek.checked
    tum.checked = false
    kadin.checked = false
    tumChecked.value = tum.checked
    kadinChecked.value = kadin.checked
  })

  kadin.addEventListener('click', () => {
    kadinChecked.value = kadin.checked
    tum.checked = false
    erkek.checked = false
    tumChecked.value = tum.checked
    erkekChecked.value = erkek.checked
  })
})

</script>

<template>
  <div v-if="calisanError || erkekError || kadinError">
    Bir hata oluştu
  </div>
  <div v-else-if="calisanPending || erkekPending || kadinPending">
    Yükleniyor...
  </div>
  <div v-else>
    <form id="checks">
      <div>
        <input type="radio" id="tum" name="tum" value="tum" checked>
        <label for="tum">Tümü</label>
      </div>
      <div>
        <input type="radio" id="erkek" name="erkek" value="erkek"  />
        <label for="erkek">Erkek</label>
      </div>
      <div>
        <input type="radio" id="kadin" name="kadin" value="kadin" />
        <label for="kadin">Kadın</label>
      </div>
    </form>
    <div id="calisanlar">
      <div v-if="tumChecked" v-for="calisan of calisanlar" class="calisan">
        <div style="display:flex; flex-direction: column;">
          <div class="calisan-ad">{{ calisan.ad }}</div>
          <div class="calisan-soyad">{{ calisan.soyad }}</div>
        </div>
        <div class="calisan-cinsiyet">{{ calisan.cinsiyet }}</div>
        <div class="calisan-telefon">{{ calisan.telefon_no }}</div>
        <div class="calisan-pozisyon">{{ calisan.pozisyon }}</div>
        <div class="calisan-maas">{{ calisan.maas }}₺</div>
      </div>
      <div v-else-if="erkekChecked" v-for="calisan of erkekCalisanlar" class="calisan">
        <div style="display:flex; flex-direction: column;">
          <div class="calisan-ad">{{ calisan.ad }}</div>
          <div class="calisan-soyad">{{ calisan.soyad }}</div>
        </div>
        <div class="calisan-cinsiyet">{{ calisan.cinsiyet }}</div>
        <div class="calisan-telefon">{{ calisan.telefon_no }}</div>
        <div class="calisan-pozisyon">{{ calisan.pozisyon }}</div>
        <div class="calisan-maas">{{ calisan.maas }}₺</div>
      </div>
      <div v-else-if="kadinChecked" v-for="calisan of kadinCalisanlar" class="calisan">
        <div style="display:flex; flex-direction: column;">
          <div class="calisan-ad">{{ calisan.ad }}</div>
          <div class="calisan-soyad">{{ calisan.soyad }}</div>
        </div>
        <div class="calisan-cinsiyet">{{ calisan.cinsiyet }}</div>
        <div class="calisan-telefon">{{ calisan.telefon_no }}</div>
        <div class="calisan-pozisyon">{{ calisan.pozisyon }}</div>
        <div class="calisan-maas">{{ calisan.maas }}₺</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #calisanlar {
    display: grid;
    grid-template-rows: auto;
    place-items: center;
    padding: 1em;
    height: 40rem;
    overflow-y: auto;
  }

  .calisan {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 1em;
    place-items: center;
    display: grid;
    padding: 0.8rem;
    max-width: 50rem;
    border-radius: 0.125rem;
    background-color: var(--primary-color);
    box-shadow: rgba(0, 0, 0, 0.26) 0px 4px 8px;
    margin-bottom: 1rem;
  }

  #checks {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    gap: 1rem;
  }
</style>