<template>
  <v-container>
    <v-card
      v-for="(item, index) in libraries"
      :key="index"
      class="mb-2 pa-2"
    >
      <v-card-title>{{ item.name }}</v-card-title>
      <v-card-text>
        <div
          class="registry__item"
        >
          <v-card
            v-for="(version, versionIndex) in item.versions"
            :key="versionIndex"
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
                  v-for="(dependencie, dependencieIndex) in version.dependencies"
                  :key="dependencieIndex"
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
  </v-container>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useLibrariesStore } from '../../../stores/libraries';

const store = useLibrariesStore();
const router = useRouter();

const { libraries } = storeToRefs(store);

const { getLibraries, deleteLibrary } = store;

async function deleteLib(id) {
  await deleteLibrary(id);
  await getLibraries();
}

onMounted(async () => {
  await getLibraries();
})


function editLib(item) {
  router.push({ name: 'edit', params: { name: item.name } });
}
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