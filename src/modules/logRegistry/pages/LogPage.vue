<template>
  <v-container>
    <template
      v-if="logs.length > 0"
    >
      <v-list>
        <v-list-item
          v-for="item in logs"
          :key="item.action"
          :title="item.action"
          :subtitle="getDate(item.create_time)"
        />
      </v-list>
      <v-pagination
        v-model="page"
        :length="logLength"
        @update:modelValue="changePage"
      />
    </template>
    <div
      v-else
      class="d-flex justify-center"
    >
      Log list is empty
    </div>
  </v-container>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLogsStore } from '../../../stores/log';

const store = useLogsStore();
const router = useRouter();
const route = useRoute();

const { logs, page, logLength } = storeToRefs(store);

const { getLogs } = store;

onMounted(async () => {
  const pageVal = parseInt(route.query.page, 10) > 0
    ? parseInt(route.query.page, 10) : false;
  if (!pageVal) {
    router.push(`${route.path}?page=1`);
  } else {
    page.value = pageVal;
  }
  await getLogs();
});

async function changePage() {
  router.push(`${route.path}?page=${page.value}`);
  await getLogs();
}

function getDate(date) {
  const newDate = new Date(date).toLocaleString();
  return newDate;
}

onUnmounted(() => {
  page.value = 1;
  logLength.value = 1;
});
</script>
