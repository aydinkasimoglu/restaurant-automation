// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    user: process.env.sqlUser,
    password: process.env.sqlPassword
  },
  app: {
    head: {
      title: 'LOP',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'tr'
      },
    },
  }
})
