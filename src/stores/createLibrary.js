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
    let { data } = await axios.get('/getLibraries?getAll=true');
    data = data.data;
    if (isEdit) {
      data = data.filter((item) => item.name !== libName);
    }
    libraries.value = data;
  }

  function clearState() {
    dialog.value = false;
    name.value = '';
    version.value = '';
    versions.value = [];
    dependencies.value = [];
    libraries.value = [];
    formValid.value = {
      name: true,
      version: true,
    };
  }

  async function getLibrary(libName) {
    const { data } = await axios.get(`/getLibrary/${libName}`);
    name.value = data.name;
    versions.value = data.versions;
  }

  async function createLibrary() {
    await axios.post('/createLibrary', {
      name: unref(name), versions: unref(versions),
    }).catch((err) => {
      if (err.response.data.errCode === 'DUPLICATED') {
        formValid.value.name = false;
      }
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
