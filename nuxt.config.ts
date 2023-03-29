// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    ethProvider: process.env.ETH_PROVIDER,
    public: {
      contractAddress: process.env.CONTRACT_ADDRESS_THE_DOGGIES,
    },
  },
});
