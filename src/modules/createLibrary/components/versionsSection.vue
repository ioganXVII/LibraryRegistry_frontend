<template>
  <v-card
    class="mb-2"
    style="min-height: 150px;"
  >
    <v-card-title>
      Library versions
    </v-card-title>
    <v-card-text>
      <div
        v-if="versions.length < 1"
      >
        Version list empty
      </div>
      <v-list
        v-else
      >
        <v-list-item
          v-for="(item, index) in versions"
          :key="index"
          :title="item.version"
          :subtitle="item.dependencies.length ? `Dependencies: ${item.dependencies.map((dep) => `${dep.name} - ${dep.version}`).join(', ')}` : ''"
          @click="editVersion(item, index)"
        >
          <template #append>
            <v-btn
              color="grey-lighten-1"
              icon="mdi-delete"
              variant="text"
              @click="removeVersion(index)"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-dialog
        v-model="dialog"
        persistent
        width="1024"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            v-bind="props"
          >
            Add new version
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ getDialogTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field 
                    class="pt-2"
                    v-model="version"
                    label="Library version*"
                    variant="outlined"
                    :disabled="isEdit"
                    :rules="[checkVersion]"
                  />
                </v-col>
                <v-col
                  v-for="(selection, i) in dependencies"
                  :key="selection.name"
                  cols="auto"
                  class="py-1 pe-0"
                >
                  <v-chip
                    :disabled="loading"
                    closable
                    @click:close="deleteDependecie(i)"
                  >
                    {{ `${selection.name} - ${selection.version}` }}
                  </v-chip>
                </v-col>
                <v-col cols="12">
                  <v-list class="mt-4">
                    <v-list-item
                      v-for="item in getInactiveLibraries"
                      :key="item.name"
                      class="versions__item"
                    >
                      <v-list-item-title> {{ `Library name - ${item.name}` }} </v-list-item-title>
                      <v-list
                        class="pa-0"
                      >
                        <v-list-item
                          v-for="(vers, versIndex) in item.versions"
                          :key="versIndex"
                          class="pa-0"
                          @click="addDependecie({ name: item.name, version: vers.version, dependencies: vers.dependencies })"
                        >
                          {{ getVersionString(vers) }}
                        </v-list-item>
                      </v-list>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="closeDialog"
            >
              Close
            </v-btn>
            <v-btn
              color="blue-darken-1"
              variant="text"
              :disabled="checkFormValid"
              @click="saveVersion"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useCreateLibraryStore } from '../../../stores/createLibrary'; 
import { computed, ref } from 'vue';

const store = useCreateLibraryStore();

const { dialog, version, versions, formValid, libraries, dependencies } = storeToRefs(store);
let isEdit = ref(false);
let editIndex = null;


const getDialogTitle = computed(() => isEdit.value ? 'Edit version' : 'Create version');
const checkFormValid = computed(() => version.value && !formValid.value.version);

function checkVersion() {
    if (version.value === null || version.value === "") return true;
    const test = /^\d\.\d$/gm.test(version.value);
    formValid.value.version = test;
    return test || 'Incorrect version';
  }

  const getInactiveLibraries = computed(() => {
    const filtredLibraries = [...libraries.value];
    return filtredLibraries.filter((lib) => !dependencies.value.some((dep) => dep.name === lib.name));
  });

  function closeDialog() {
    dialog.value = false;
    version.value = '';
    dependencies.value = [];
    if (isEdit.value) {
      isEdit.value = false;
    }
  }

  function addDependecie(item) {
    dependencies.value.push(item);
  }

  function deleteDependecie(index) {
    dependencies.value.splice(index, 1);
  }

  function saveVersion() {
    if (editIndex !== null) {
      const editVersion = versions.value[editIndex];
      editVersion.version = version.value;
      editVersion.dependencies = [...dependencies.value];
      dialog.value = false;
    } else {
      versions.value.push({ version: version.value, dependencies: [...dependencies.value] });
      version.value = '';
      dependencies.value = [];
      dialog.value = false;
    }
  }

  function editVersion(editVersion, index) {
    isEdit.value = true;
    editIndex = index;
    version.value = editVersion.version;
    dependencies.value = [...editVersion.dependencies];
    dialog.value = true;
  }

  function removeVersion(index) {
    versions.value.splice(index, 1);
  }

  function getVersionString(vers) {
    let baseString = `Library version: ${vers.version}`;
    if (vers.dependencies.length > 0) {
      baseString += `, Dependencies: ${vers.dependencies.map((dep) => `${dep.name} - ${dep.version}`).join(', ')}`;
    }
    return baseString;
  }
</script>

<style lang="sass" scoped>
.versions
  &__item
    margin-bottom: 16px 
</style>