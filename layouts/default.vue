<template>
  <div>
    <header>
      <img src="/logo.png" alt="logo"/>

      <nav role="navigation">
        <NuxtLink to="/menu" class="nav-item">MENÜ</NuxtLink>
        <NuxtLink to="/siparisler" class="nav-item">SİPARİŞLER</NuxtLink>
        <NuxtLink to="/masalar" class="nav-item">MASALAR</NuxtLink>
        <NuxtLink to="/stoklar" class="nav-item">STOKLAR</NuxtLink>
        <NuxtLink to="/calisanlar" class="nav-item">ÇALIŞANLAR</NuxtLink>
      </nav>
    </header>

    <slot />
  </div>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');

  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #F9F5E7;
    padding: 2.5rem;
  }

  header {
    display: flex;
    flex-direction: row;
    border: 1px solid black;
    justify-content: space-between;
    align-items: center;
    
  }

  img {
    scale: 0.4;
  }

  nav {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 5.5rem;
    padding: 1rem 2rem;
    background-color: #F8EAD8;
    border-radius: 5px;
    width: fit-content;
    height: fit-content;
  }

  .nav-item {
    cursor: pointer;
    user-select: none;
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: bold;
    text-decoration: none;
    color: black;
  }
</style>