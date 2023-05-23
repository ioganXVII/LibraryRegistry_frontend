import { ref, unref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

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
    let { data } = await axios.get('http://localhost:3000/api/getLibraries');
    if(isEdit) {
      data = data.filter((item) => item.name !== libName);
    }
    libraries.value = data;
  };
  
  function clearState() {
    name.value = '';
    version.value = '';
    versions.value = [];
    dependencies.value = [];
  }

  async function getLibrary(libName) {
    const { data } = await axios.get(`http://localhost:3000/api/getLibrary/${libName}`);
    name.value = data.name;
    versions.value = data.versions;
  }

  async function createLibrary() {
    await axios.post('http://localhost:3000/api/createLibrary', {
      name: unref(name), versions: unref(versions)
    });
  }

  async function editLibrary() {
    await axios.post('http://localhost:3000/api/editLibrary', {
      name: unref(name), versions: unref(versions)
    });
  }

  return { dialog, libraries, name, version, versions, dependencies, formValid, clearState, getLibrary, createLibrary, getLibraries, editLibrary }
})
