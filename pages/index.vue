<script setup lang="ts">
import { FetchError } from "ofetch";
import { TGetDoggyResponse } from "~/utils/types";

const tokenId = ref("");

let doggy: Ref<Pick<TGetDoggyResponse, string> | null> = ref(null);
let loading: Ref<boolean> = ref(false);
let error: Ref<FetchError | null> = ref(null);

const searchTokenId = async () => {
  if (!tokenId.value || tokenId.value === "") return;

  loading.value = true;

  const { data, error: err } = await useFetch<TGetDoggyResponse>(
    `/api/doggy/${tokenId.value}/`,
  );
  doggy.value = data.value;
  error.value = err.value;

  loading.value = false;
};

const getRandomDoggie = async () => {
  loading.value = true;

  const { data, error: err } = await useFetch<TGetDoggyResponse>("/api/doggy/");
  doggy.value = data.value;
  error.value = err.value;

  loading.value = false;
};
</script>

<template>
  <div>
    <!-- Start of search form -->
    <h1>The doggies explorer</h1>

    <form @submit.prevent="searchTokenId">
      <label for="tokenId">Token ID</label>
      <input type="text" id="tokenId" required v-model="tokenId" />
      <button type="submit">Search</button>
    </form>
    <button @click="getRandomDoggie">I'm feeling lucky</button>
    <!-- End of search form -->

    <!-- Start of doggy section -->
    <div v-if="loading">loading</div>

    <div v-else-if="error">
      <div v-if="error.data.statusCode == 500">
        Oops! Something went wrong :(
      </div>
      <div v-if="error.data.statusCode == 404">
        Token with ID {{ error.data.data.tokenId }} doesn't exist
      </div>
    </div>

    <div v-else-if="doggy">
      <h2>{{ doggy.name }}</h2>
      <h3>{{ doggy.owner }}</h3>

      <div>{{ doggy.description }}</div>
      <img :src="doggy.imageUrl as string" :alt="doggy.name as string" />
      <p>{{ doggy.attributes }}</p>
    </div>
    <!-- End of doggy section-->
  </div>
</template>

<style>
img {
  width: 200px;
  height: 200px;
}
</style>
