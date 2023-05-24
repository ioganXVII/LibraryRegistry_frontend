<template>
  <section>
    <v-text-field
      v-model="name"
      label="Library name"
      :rules="[checkName]"
      counter="255"
      :error="!formValid.name"
      :error-messages="(!formValid.name && 'Name duplicated') || checkName()"
      :counter-value="getNameLength"
      clearable
      variant="outlined"
      :disabled="isEdit"
      @click:clear="clearName"
      @update:modelValue="changeFormValid"
    />
    <div class="d-flex flex-column mt-4">
      <versionsSection />
    </div>
    <v-btn
      class="mr-2"
      :disabled="checkCreate"
      @click="create"
    >
      {{ getCreateBtnText }}
    </v-btn>
    <v-btn
      to="/"
    >
      Back
    </v-btn>
  </section>
</template>

<script setup>
import { onBeforeRouteLeave, useRouter, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { onMounted, computed } from 'vue';
import { useCreateLibraryStore } from '../../../stores/createLibrary';

import versionsSection from '../components/versionsSection.vue';

const store = useCreateLibraryStore();
const router = useRouter();
const route = useRoute();
const isEdit = computed(() => route.name === 'edit');

const { name, versions, formValid } = storeToRefs(store);

const {
  getLibraries, getLibrary, createLibrary, editLibrary, clearState,
} = store;

onMounted(async () => {
  await getLibraries(isEdit.value, route.params.name || '');
  if (isEdit.value && route.params.name.length > 0) {
    await getLibrary(route.params.name);
  }
});
onBeforeRouteLeave((to, from, next) => {
  clearState();
  next();
});

const getCreateBtnText = computed(() => (isEdit.value ? 'Edit library' : 'Create Library'));

const checkCreate = computed(() => (name.value.length >= 255 || name.value.length <= 0)
  && versions.value.length <= 0);

const getNameLength = computed(() => name.value.length);

function checkName() {
  return getNameLength.value <= 255 || 'Too large name';
}

async function create() {
  if (isEdit.value) {
    await editLibrary();
  } else {
    await createLibrary();
  }

  if (formValid.value.name) {
    router.push('/');
  }
}

function changeFormValid() {
  formValid.value.name = true;
}

function clearName() {
  formValid.value.name = true;
  name.value = '';
}
</script>
