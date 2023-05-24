import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from '../utils/axios';

// eslint-disable-next-line import/prefer-default-export
export const useLibrariesStore = defineStore('librariesRegistry', () => {
  const libraries = ref([]);
  const page = ref(1);
  const librariesLength = ref(1);

  async function getLibraries() {
    const { data } = await axios.get(`/getLibraries?page=${page.value}`);
    libraries.value = data.data;
    librariesLength.value = Math.floor(data.total / 10) + 1;
  }

  async function deleteLibrary(id) {
    await axios.delete(`/deleteLibrary/${id}`);
  }

  return {
    libraries, page, librariesLength, getLibraries, deleteLibrary,
  };
});
