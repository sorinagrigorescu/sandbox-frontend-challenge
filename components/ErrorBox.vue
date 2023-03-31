<script setup lang="ts">
import { FetchError } from "ofetch";

const props = defineProps<{ error: FetchError }>();
</script>

<template>
  <!--Token not found message-->
  <div v-if="props.error.data.statusCode == 404" class="error">
    <img src="../assets/img/snoop-serious.png" alt="Snoop Dogg with RBF" />
    <div class="error_text">
      <div class="error__title">
        Dayum! We have no such doggy.
        <nuxt-icon name="noto-crying face" filled></nuxt-icon>
      </div>
      <div class="error__description">
        Try again with an existing token ID. Or maybe you’re feelin’ lucky?
      </div>
    </div>
  </div>
  <!--Default error message-->
  <div v-else class="error">
    <img src="../assets/img/snoop-cry.png" alt="Snoop Dogg crying" />
    <div class="error__text">
      <div class="error__title">
        It’s not you,<br />
        it’s me.
        <nuxt-icon name="noto-broken-heart" filled></nuxt-icon>
      </div>
      <div class="error__description">
        Something went wrong on our side, but we’ll be up later. Fo’ shizzle.
      </div>
    </div>
  </div>
</template>

<style scoped>
.error {
  display: flex;
  max-width: 530px;
  gap: 64px;

  padding: 24px;
  border-radius: 24px;
  box-shadow: 0px 4px 16px 4px rgba(0, 0, 0, 0.05);
}

.error__text {
  display: flex;
  flex-direction: column;
  align-content: space-around;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

img {
  max-width: 200px;
  max-height: 200px;
}

.error__title {
  font-size: 32px;
  line-height: 130%;
  font-weight: 700;
  padding-bottom: 32px;
}

/* quick fix for small screens */
@media (max-width: 600px) {
  .error {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 8px;
  }

  .error__title {
    padding-bottom: 8px;
  }

  .error__text {
    padding: 8px;
  }
}
</style>
