import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useLogsStore = defineStore('logsRegistry', () => {
  const logs = ref([]);

  async function getLogs() {
    const { data } = await axios.get('http://localhost:3000/api/getLogs');
    logs.value = data;
  }

  
  return { logs, getLogs };
})
