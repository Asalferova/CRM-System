// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      dbId: process.env.DB_ID,
      collectionDeals: process.env.COLLECTION_DEALS,
      collectionCustomers: process.env.COLLECTION_CUSTOMERS,
      collectionComments: process.env.COLLECTION_COMMENTS,
      storageId: process.env.STORAGE_ID,
    },
  },
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
