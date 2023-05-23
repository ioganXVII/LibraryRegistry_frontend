import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const useLibrariesStore = defineStore('librariesRegistry', () => {
  const libraries = ref([]);

  async function getLibraries() {
    const { data } = await axios.get('http://localhost:3000/api/getLibraries');
    libraries.value = data;
  }

  async function deleteLibrary(id) {
    await axios.delete(`http://localhost:3000/api/deleteLibrary/${id}`);
  }

  return { libraries, getLibraries, deleteLibrary };
});
