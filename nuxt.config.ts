// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/google-fonts", "@formkit/nuxt", "nuxt-icons"],
  runtimeConfig: {
    ethProvider: process.env.ETH_PROVIDER,
    public: {
      contractAddress: process.env.CONTRACT_ADDRESS_THE_DOGGIES,
    },
  },
  googleFonts: {
    families: {
      Montserrat: {
        wght: [400, 700],
      },
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/main.scss";',
        },
      },
    },
  },
});
