// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@pinia/nuxt",
    "dayjs-nuxt",
    "@sidebase/nuxt-pdf",
  ],
  pinia: {
    storesDirs: ["./store/**"],
  },
});
