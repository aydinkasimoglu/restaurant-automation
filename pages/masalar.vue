<script lang="ts" setup>
const { data: masalar, pending, error: siparisError } = await useFetch('/api/masalar')
</script>
<template>
	<div v-if="error">
		Bir hata oluştu
	</div>
	<div v-else-if="pending">
		Yükleniyor...
	</div>
	<div class="masalar-container" v-else>
		<div class="masalar-section" :class="{ 'is-loading': isLoading }">
	    <div class="masa-box" v-for="masa of masalar" :key="masa.id" :class="{ 'green': masa.dolu === 1, 'red': masa.dolu === 0 }">
				<div class="info">
					<p class="tableId">Masa {{ masa.id }}</p>
					<p class="isFree">Doluluk {{ masa.dolu }}</p>
					<p class="totalPrice">Ücret: {{ masa.toplam_fiyat }}₺</p>
				</div>
	    </div>
		</div>
	</div>
</template>
<style scoped>
.masalar-container {
  /*adds scrollbar to block overflow*/
  height: calc(100vh - 10rem);
  width: 100%;
  overflow-y: auto;
  /*hide scrollbar for firefox*/
  scrollbar-width: none;
}
.masalar-container::-webkit-scrollbar {
  /*hide scrollbar for edge*/
  display: none;
}
.masalar-section {
  /*background-color: blue;*/
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-top: 2rem;
}
.masalar-section.is-loading {
  opacity: 0.5; /* Reduce the opacity during loading */
  pointer-events: none; /* Disable pointer events during loading */
}

.masalar-section.is-loading .masa-box {
  transform: translateY(+30px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
}

.masa-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(25% - 30px);
  height: 13rem;
  background-color: antiquewhite;
  border-radius: 3rem;
  margin: 15px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}
.masa-box.green {
  background-color: green;
}

.masa-box.red {
  background-color: red;
}
.masa-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
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
