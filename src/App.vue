<template>
  <v-app>
    <v-app-bar>
      <template v-slot:prepend>
        <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="item in links"
                :key="item.caption"
              >
                <RouterLink
                  class="header__link"
                  :to="item.link"
                >
                  {{ item.caption }}
                </RouterLink>
              </v-list-item>
            </v-list>
          </v-menu>
      </template>
      <template #append>
        <v-btn
          variant="tonal"
          @click="create"
        >
          Add Library
        </v-btn>
      </template>
    </v-app-bar>
    <v-main
      class="page__wrapper"
    >
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const links = [
  {
    caption: 'Registry',
    link: '/',
  },
  {
    caption: 'Log',
    link: '/log',
  }
];

function create() {
  router.push({ name: 'create' });
}
</script>

<style lang="sass" scoped>
.header
  &__link
    text-decoration: none
    color: #ffffff
.page
  &__wrapper
    margin-left: 80px
    margin-right: 80px
    margin-top: 20px
</style>