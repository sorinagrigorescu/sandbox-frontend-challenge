<script setup lang="ts">
import { FetchError } from "ofetch";
import { Attribute, TGetDoggyResponse } from "../utils/types";

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
  <div class="content-container">
    <!-- Start of search form -->
    <div class="page-header">
      <div class="page-header__title">The Doggies Explorer</div>

      <div class="page-header__search-form">
        <FormKit
          type="form"
          @submit="searchTokenId"
          :incomplete-message="false"
          submit-label="Search"
          class=""
        >
          <FormKit
            type="text"
            name="tokenId"
            id="token-id"
            label="Token ID"
            validation="required|number"
            v-model="tokenId"
            :validation-messages="{
              required: 'Please fill in a token ID',
              number: 'This is not a valid token ID',
            }"
            prefix-icon="search"
          />
        </FormKit>
        <button @click="getRandomDoggie" class="button_text">
          I'm feelin' lucky
          <nuxt-icon name="noto-four-leaf-clover" filled></nuxt-icon>
        </button>
      </div>
    </div>

    <!-- End of search form -->

    <!-- Start of doggy section -->
    <div v-if="loading">loading</div>

    <div v-else-if="error">
      <div v-if="error.data.statusCode == 404">
        Token with ID {{ error.data.data.tokenId }} doesn't exist
      </div>
      <div v-else>Oops! Something went wrong :(</div>
    </div>

    <div v-else-if="doggy" class="pane-container">
      <doggy-pane :data="(doggy as TGetDoggyResponse)"></doggy-pane>
    </div>
    <!-- End of doggy section-->
  </div>
</template>

<style lang="scss">
$blue: #0275ff;
$color-accent-focus: $blue;
$color-border: #94929c;

.content-container {
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pane-container {
  width: 100%;
}

* {
  font-family: "Montserrat";
}

.formkit-outer * {
  box-sizing: border-box;
}

/* this removes default html input appearance */
[type="text"].formkit-input {
  appearance: none;
  border: none;

  &:focus {
    outline: none;
  }
}

/* fixed position of button, regardless if error message is displayed or not */
[data-family="text"].formkit-outer {
  height: 80px;
}

/* text input */
[type="text"].formkit-input {
  font-family: "Montserrat";
  font-size: 16px;

  background-color: transparent;

  width: 100%;
}

.formkit-inner {
  position: relative;
  box-shadow: 0 0 0 1px $color-border;
  border-radius: 8px;
  display: flex;
  align-items: center;
}
.formkit-inner:focus-within {
  box-shadow: 0 0 0 2px $color-accent-focus;
  border: $color-accent-focus;
}

.formkit-label {
  font-family: "Montserrat";
  font-size: 14px;
}

/* text input search icon */
.formkit-outer .formkit-icon {
  width: 2.5em;
  display: flex;
  align-self: stretch;
  user-select: none;
  padding: 8px;
}

/* error message */
.formkit-messages {
  padding: 0;
  margin: 4px;
}

.formkit-message {
  font-family: "Montserrat";
  font-size: 12px;
  list-style-type: none;
  color: red;
}

@mixin button {
  border-radius: 24px;
  font-family: "Montserrat";
  font-weight: 700;
  font-size: 14px;

  border: 0;
  padding: 8px 16px;

  transition: all 0.25s;

  margin-bottom: 4px;
}

/* buttons */
$button-submit-color-background: red;
$button-submit-color: white;

$button-submit-color-background-hover: blue;
$button-submit-color-hover: black;

[data-type="submit"] .formkit-input {
  @include button;

  width: 140px;
  height: 42px;
  font-weight: 400;
  text-transform: uppercase;
  background: $button-submit-color-background;
  color: $button-submit-color;
}

[data-type="submit"] .formkit-input:focus {
  background: $button-submit-color-background;
}

[data-type="submit"] .formkit-input:focus-visible {
  background: $button-submit-color-background;
}

[data-loading] [data-type="submit"] .formkit-input {
  background: $button-submit-color-background;
}

[data-type="submit"] .formkit-input:hover {
  background: $button-submit-color-background-hover;
}

.button_text {
  @include button;

  &,
  &:focus {
    background: transparent;
  }

  &:hover {
    background: #eee;
  }
}

.page-header {
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 32px;
}

.page-header__title {
  font-family: "Montserrat";
  font-size: 36px;
  text-align: center;
  padding-bottom: 8px;
  font-weight: 700;
}

.page-header__search-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.formkit-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.formkit-outer {
  width: 100%;
}
</style>
