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
  font-family: "Roboto Condensed", sans-serif;
}

:root {
  --dark-font-color: #24221C;
  --light-font-color: #FFF5F5;
  --primary-color: #F8EAD8;
  --secondary-color: #EDDBC7;
  --tertiary-color: #A7727D;
  --background-color: #F9F5E7;
}

body {
  display: flex;
  justify-content: center;
  overflow: hidden;
  background-color: var(--background-color);
  height: 100vh;
}

header {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
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
  background-color: var(--primary-color);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.nav-item {
  cursor: pointer;
  user-select: none;
  font-family: "Roboto Condensed", sans-serif;
  font-weight: bold;
  text-decoration: none;
  color: var(--dark-font-color);
  padding: 1rem clamp(1rem, 2vw, 2rem);
}

#container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  height: calc(100vh - 9rem);
  width: 71rem;
}
</style>
