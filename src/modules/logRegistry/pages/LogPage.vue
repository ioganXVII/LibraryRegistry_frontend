<template>
  <v-list>
    <v-list-item
      v-for="item in logs"
      :key="item.action"
      :title="item.action"
      :subtitle="getDate(item.create_time)"
    />
  </v-list>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useLogsStore } from '../../../stores/log';

const store = useLogsStore();

const { logs } = storeToRefs(store);

const { getLogs } = store;

onMounted(async () => getLogs());

function getDate(date) {
  const newDate = new Date(date).toLocaleString();
  return newDate;
}
</script>
