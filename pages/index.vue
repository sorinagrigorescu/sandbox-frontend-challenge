<script setup lang="ts">
import { FetchError } from "ofetch";

const tokenId = ref("");

let doggie: Ref<Object | null> = ref(null);
let loading: Ref<boolean> = ref(false);
let error: Ref<FetchError | null> = ref(null);

const searchTokenId = async () => {
  if (!tokenId.value || tokenId.value === "") return;

  loading.value = true;

  const { data, error: err } = await useFetch(`/api/doggie/${tokenId.value}/`);
  doggie.value = data.value;
  error.value = err.value;

  loading.value = false;
};

const getRandomDoggie = async () => {
  loading.value = true;

  const { data, error: err } = await useFetch("/api/doggie/");
  doggie.value = data.value;
  error.value = err.value;

  loading.value = false;
};
</script>

<template>
  <div>
    <h1>The doggies explorer</h1>

    <form @submit.prevent="searchTokenId">
      <label for="tokenId">Token ID</label>
      <input type="text" id="tokenId" required v-model="tokenId" />
      <button type="submit">Search</button>
    </form>
    <button @click="getRandomDoggie">I'm feeling lucky</button>

    <div v-if="loading">loading</div>

    <div v-else-if="error">
      <div v-if="error.data.statusCode == 500">
        Oops! Something went wrong :(
      </div>
      <div v-if="error.data.statusCode == 404">
        Token with ID {{ error.data.data.tokenId }} doesn't exist
      </div>
    </div>

    <div v-else-if="doggie">
      <h2>{{ doggie.name }}</h2>
      <h3>{{ doggie.owner }}</h3>

      <div>{{ doggie.description }}</div>
      <img :src="doggie.image_url" :alt="doggie.name" />
      <p>{{ doggie.attributes }}</p>
    </div>
  </div>
</template>

<style>
img {
  width: 200px;
  height: 200px;
}
</style>
