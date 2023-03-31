<script setup lang="ts">
import { Attribute, TGetDoggyResponse } from "../utils/types";

const props = defineProps<{ data: TGetDoggyResponse; loading: boolean }>();

// console.log(props.loading);
</script>

<template>
  <div class="container">
    <!-- skeleton placeholder for loading -->
    <div v-if="loading" class="pane-container">
      <div class="pane-overview" loading>
        <div class="pane-overview__text" loading />
        <div class="pane-overview__thumbnail" loading />
      </div>
      <div class="table-container" loading />
    </div>

    <!-- page content -->
    <div v-else class="pane-container">
      <div class="pane-overview">
        <div class="pane-overview__text">
          <h2 class="pane-overview__name">{{ data.name }}</h2>
          <h3 class="pane-overview__owner">
            <a :href="'https://etherscan.io/address/' + data.owner">{{
              data.owner
            }}</a>
          </h3>

          <div
            class="pane-overview__description"
            v-html="$mdRenderer.render(data.description as string)"
          />
        </div>
        <div class="pane-overview__thumbnail">
          <img :src="data.imageUrl as string" :alt="data.name as string" />
        </div>
      </div>

      <div class="table-container">
        <table>
          <caption>
            Traits
          </caption>
          <th />
          <tr
            v-for="attribute in (data.attributes as Attribute[])"
            :key="attribute.traitType"
          >
            <td class="table__type">{{ attribute.traitType }}</td>
            <td class="table__value" :empty="attribute.value ? false : true">
              {{ attribute.value ? attribute.value : "none" }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  width: 100%;
}

.pane-overview {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.pane-overview__name {
  font-weight: 700;
  font-size: 32px;
  margin: 0;
}

.pane-overview__text {
  overflow-wrap: break-word;

  [loading] & {
    width: 100%;
    max-width: 80%;
    height: 200px;
  }
}

.pane-overview__owner {
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  margin: 0;

  a {
    text-decoration: none;
  }
}

.pane-overview__thumbnail {
  max-width: 200px;
  max-height: 200px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }

  &[loading] {
    min-width: 20%;
    width: 200px;
    height: 200px;
  }
}

.pane-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;
}

.table-container {
  width: 100%;
  max-width: 600px;

  padding: 20px 16px 16px 16px;
  border-radius: 24px;
  box-shadow: 0px 4px 16px 4px rgba(0, 0, 0, 0.05);

  &[loading] {
    height: 800px;
    background: linear-gradient(-45deg, #c0c0c0 25%, #ebebeb 35%, #c0c0c0 45%);
    background-size: 400% 400%;
    animation: loading-gradient 4s ease infinite;
  }
}

table {
  width: 100%;
  background: transparent;
  border-collapse: collapse;

  caption {
    font-size: 20px;
    line-height: 32px;
    font-weight: 700;
    margin-bottom: 12px;
  }

  tr {
    border-top: 1px solid #efefef;
  }

  td {
    padding: 6px 12px;
    height: 28px;
  }

  .table__type {
    font-weight: 700;
  }

  [empty="true"].table__value {
    color: #999;
  }
}

[loading] .pane-overview__text,
[loading] .pane-overview__thumbnail {
  background: linear-gradient(-45deg, #c0c0c0, #ebebeb, #c0c0c0);
  background-size: 400% 400%;
  animation: loading-gradient 2s ease-in-out infinite;

  border-radius: 12px;
}

@keyframes loading-gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
