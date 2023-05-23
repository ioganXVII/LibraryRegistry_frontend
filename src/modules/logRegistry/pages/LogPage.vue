<template>
  <v-list>
    <v-list-item
      v-for="(item, index) in logs"
      :key="index"
      :title="item.action"
      :subtitle="getDate(item.create_time)"
    />
  </v-list>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useLogsStore } from '../../../stores/log';
import { onMounted } from 'vue';

const store = useLogsStore();

const { logs } = storeToRefs(store);

const { getLogs } = store;

onMounted(async () => await getLogs());

function getDate(date) {
  const newDate = new Date(date).toLocaleString();
  return newDate;
};

</script>

<style lang="sass" scoped>
</style>