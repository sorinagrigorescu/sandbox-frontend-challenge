<script setup lang="ts">
import { Attribute, TGetDoggyResponse } from "../utils/types";

defineProps<{ data: TGetDoggyResponse }>();
</script>

<template>
  <div class="pane-container">
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
      <img
        :src="data.imageUrl as string"
        :alt="data.name as string"
        class="pane-overview__thumbnail"
      />
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
</template>

<style lang="scss">
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
  width: 200px;
  height: 200px;
  border-radius: 8px;
}

.pane-container {
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
</style>
