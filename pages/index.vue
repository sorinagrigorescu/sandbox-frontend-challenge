<script setup lang="ts">
import { FetchError } from "ofetch";
import { Attribute, TGetDoggyResponse } from "~/utils/types";

useHead({
  title: "The Doggies",
});

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
    <button @click="getRandomDoggie">I'm feelin' lucky</button>
    <!-- End of search form -->

    <!-- Start of doggy section -->
    <div v-if="loading">loading</div>

    <div v-else-if="error">
      <div v-if="error.data.statusCode == 404">
        Token with ID {{ error.data.data.tokenId }} doesn't exist
      </div>
      <div v-else>Oops! Something went wrong :(</div>
    </div>

    <div v-else-if="doggy">
      <h2>{{ doggy.name }}</h2>
      <h3>
        <a :href="'https://etherscan.io/address/' + doggy.owner">{{
          doggy.owner
        }}</a>
      </h3>

      <div v-html="$mdRenderer.render(doggy.description as string)" />
      <img :src="doggy.imageUrl as string" :alt="doggy.name as string" />

      <table>
        <th />
        <tr
          v-for="attribute in (doggy.attributes as Attribute[])"
          :key="attribute.traitType"
        >
          <td>{{ attribute.traitType }}</td>
          <td>{{ attribute.value }}</td>
        </tr>
      </table>
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
