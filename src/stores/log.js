import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from '../utils/axios';

// eslint-disable-next-line import/prefer-default-export
export const useLogsStore = defineStore('logsRegistry', () => {
  const logs = ref([]);
  const page = ref(1);
  const logLength = ref(1);

  async function getLogs() {
    const { data } = await axios.get(`/getLogs?page=${page.value}`);
    logs.value = data;
    logLength.value = data[0].total / 10 + 1;
  }

  return {
    logs, page, logLength, getLogs,
  };
});
