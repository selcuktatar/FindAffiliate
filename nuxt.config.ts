// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    port: 3000
  },
  modules: [
    '@nuxt/ui',
    "@nuxtjs/tailwindcss",
    "nuxt-disqus",
    "@nuxtjs/device",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@nuxthub/core",
  ],
  vite: {
    server: {
      fs: {
        strict: false
      }
    }
  },
  hub: {
    database: true,
    kv: true
  },
  extends: ['nuxt-umami'],
  disqus: {
    shortname: process.env.DISQUS_SHORTNAME,
  },
  colorMode: {
    preference: 'light'
  },
  runtimeConfig: {
    public: {
      gtagId: process.env.GTAG_ID,
      loopsFormKey: process.env.LOOPS_FORM_KEY,
    }
  },
  devtools: { enabled: true },
})