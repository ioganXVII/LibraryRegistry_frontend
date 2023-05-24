<template>
  <v-container>
    <v-card
      v-for="item in libraries"
      :key="item.name"
      class="mb-2 pa-2"
    >
      <v-card-title>{{ item.name }}</v-card-title>
      <v-card-text>
        <div
          class="registry__item"
        >
          <v-card
            v-for="version in item.versions"
            :key="`version-${version.version}`"
            class="registry__version mr-2"
            variant="tonal"
          >
            <v-card-text>
              <div>
                {{ version.version }}
              </div>
              <div
                v-if="version.dependencies.length > 0"
              >
                <div>
                  Dependencies:
                </div>
                <v-chip
                  v-for="dependencie in version.dependencies"
                  :key="dependencie.name"
                  label
                  class="mr-2"
                >
                  {{ `${dependencie.name} - ${dependencie.version}` }}
                </v-chip>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click="editLib(item)"
        >
          Edit library
        </v-btn>
        <v-btn
          @click="deleteLib(item.id)"
        >
          Delete library
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-pagination
      v-model="page"
      :length="librariesLength"
      @update:modelValue="changePage"
    />
  </v-container>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLibrariesStore } from '../../../stores/libraries';

const store = useLibrariesStore();
const router = useRouter();
const route = useRoute();

const { libraries, page, librariesLength } = storeToRefs(store);

const { getLibraries, deleteLibrary } = store;

async function deleteLib(id) {
  await deleteLibrary(id);
  await getLibraries();
}

async function changePage() {
  router.push(`${route.path}?page=${page.value}`);
  await getLibraries();
}

onMounted(async () => {
  const pageVal = parseInt(route.query.page, 10) > 0
    ? parseInt(route.query.page, 10) : false;
  if (!pageVal) {
    router.push(`${route.path}?page=1`);
  } else {
    page.value = pageVal;
  }
  await getLibraries();
});

function editLib(item) {
  router.push({ name: 'edit', params: { name: item.name } });
}

onUnmounted(() => {
  page.value = 1;
  librariesLength.value = 1;
});
</script>

<style lang="sass" scoped>
.registry
  &__version
    min-width: 250px
    min-height: 100px
  &__item
    display: flex
    flex-wrap: wrap
    row-gap: 8px
</style>
