import { ref, unref } from 'vue';
import { defineStore } from 'pinia';
import axios from '../utils/axios';

// eslint-disable-next-line import/prefer-default-export
export const useCreateLibraryStore = defineStore('createLibrary', () => {
  const dialog = ref(false);
  const name = ref('');
  const version = ref('');
  const versions = ref([]);
  const dependencies = ref([]);
  const libraries = ref([]);
  const formValid = ref({
    name: ref(true),
    version: ref(true),
  });

  async function getLibraries(isEdit, libName) {
    let { data } = await axios.get('/getLibraries');
    if (isEdit) {
      data = data.filter((item) => item.name !== libName);
    }
    libraries.value = data;
  }

  function clearState() {
    name.value = '';
    version.value = '';
    versions.value = [];
    dependencies.value = [];
  }

  async function getLibrary(libName) {
    const { data } = await axios.get(`/getLibrary/${libName}`);
    name.value = data.name;
    versions.value = data.versions;
  }

  async function createLibrary() {
    await axios.post('/createLibrary', {
      name: unref(name), versions: unref(versions),
    });
  }

  async function editLibrary() {
    await axios.post('/editLibrary', {
      name: unref(name), versions: unref(versions),
    });
  }

  return {
    dialog,
    libraries,
    name,
    version,
    versions,
    dependencies,
    formValid,
    clearState,
    getLibrary,
    createLibrary,
    getLibraries,
    editLibrary,
  };
});
