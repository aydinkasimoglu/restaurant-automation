<script lang="ts" setup>
  onMounted(async () => {
    if (!document.cookie.split(";").some((item) => item.trim().startsWith("dbCreated="))) {
      await nextTick()
      const { data } = await useFetch('/api/loadDB')
      if (data.value !== null) {
        document.cookie = "dbCreated=true; max-age=31536000"
      }
    }
  })
</script>

<template>
  <header>
    <NuxtLink to="/"><img src="/logo.png" alt="logo" /></NuxtLink>

    <nav role="navigation">
      <NuxtLink to="/menu" class="nav-item">MENÜ</NuxtLink>
      <NuxtLink to="/siparisler" class="nav-item">SİPARİŞLER</NuxtLink>
      <NuxtLink to="/masalar" class="nav-item">MASALAR</NuxtLink>
      <NuxtLink to="/stoklar" class="nav-item">STOKLAR</NuxtLink>
      <NuxtLink to="/calisanlar" class="nav-item">ÇALIŞANLAR</NuxtLink>
    </nav>
  </header>

  <div id="container">
    <NuxtPage/>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap");

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
  overflow: hidden;
  background-color: #f9f5e7;
  height: 100vh;
}

header {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  max-width: 70rem;
  position: relative;
  margin-top: 2rem;
}

img {
  width: 45%;
}

nav {
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #f8ead8;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.nav-item {
  cursor: pointer;
  user-select: none;
  font-family: "Roboto Condensed", sans-serif;
  font-weight: bold;
  text-decoration: none;
  color: black;
  padding: 1rem clamp(1rem, 2vw, 2rem);
}

#container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  height: calc(100vh - 9rem);
  scrollbar-width: none;
  width: 71rem;
  color: var(--font-color);
  background-color: var(--menu-background);
}
</style>
