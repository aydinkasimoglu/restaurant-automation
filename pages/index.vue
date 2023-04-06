<script lang="ts" setup>
  let dbCreated = useCookie<boolean>('dbCreated', { default: () => false })

  if (!dbCreated.value) {
    const { data } = await useFetch('/api/loadDB', { server: false })
    dbCreated.value = data.value as boolean
  }
</script>

<template>
	<div>
		<h1>LOP'a Hoş Geldiniz!</h1>
    <p>Menüye göz atabilir, siparişleri listeleyebilir, masaları kontrol edebilir ve daha fazlasını yapabilirsiniz!</p>
	</div>
</template>

<style scoped>
  div {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    font-family: "Roboto Condensed", sans-serif;
  }
</style>
