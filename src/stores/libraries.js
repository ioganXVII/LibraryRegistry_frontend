import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from '../utils/axios';

// eslint-disable-next-line import/prefer-default-export
export const useLibrariesStore = defineStore('librariesRegistry', () => {
  const libraries = ref([]);

  async function getLibraries() {
    const { data } = await axios.get('/getLibraries');
    libraries.value = data;
  }

  async function deleteLibrary(id) {
    await axios.delete(`/deleteLibrary/${id}`);
  }

  return { libraries, getLibraries, deleteLibrary };
});
