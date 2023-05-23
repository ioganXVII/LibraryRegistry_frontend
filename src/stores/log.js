import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from '../utils/axios';

// eslint-disable-next-line import/prefer-default-export
export const useLogsStore = defineStore('logsRegistry', () => {
  const logs = ref([]);

  async function getLogs() {
    const { data } = await axios.get('/getLogs');
    logs.value = data;
  }

  return { logs, getLogs };
});
