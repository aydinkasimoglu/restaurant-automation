<template>
    <div>
        <header>
            <img src="/logo.png" alt="logo" />

            <nav role="navigation">
                <NuxtLink to="/menu" class="nav-item">MENÜ</NuxtLink>
                <NuxtLink to="/siparisler" class="nav-item"
                    >SİPARİŞLER</NuxtLink
                >
                <NuxtLink to="/masalar" class="nav-item">MASALAR</NuxtLink>
                <NuxtLink to="/stoklar" class="nav-item">STOKLAR</NuxtLink>
                <NuxtLink to="/calisanlar" class="nav-item"
                    >ÇALIŞANLAR</NuxtLink
                >
            </nav>
        </header>

        <div id="container">
            <slot />
        </div>
    </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap");

body {
    display: flex;
    flex-direction: column;
    background-color: #f9f5e7;
}

header {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    position: relative;
    margin-top: 2rem;
}

img {
    width: 180px;
    height: auto;
}

nav {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: clamp(2rem, 2vw, auto);
    background-color: #f8ead8;
    border-radius: 5px;
    width: fit-content;
    height: fit-content;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.nav-item {
    cursor: pointer;
    user-select: none;
    font-family: "Roboto Condensed", sans-serif;
    font-weight: bold;
    text-decoration: none;
    color: black;
    padding: 1rem 2rem;
}

#container {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
