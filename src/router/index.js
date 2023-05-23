import { createRouter, createWebHistory } from 'vue-router';
import LibraryRegistry from '../modules/libraryRegistry/pages/LibraryRegistry.vue';
import CreateLibraryPage from '../modules/createLibrary/pages/CreateLibraryPage.vue';
import LogPage from '../modules/logRegistry/pages/LogPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'registry',
      component: LibraryRegistry,
    },
    {
      path: '/create',
      name: 'create',
      component: CreateLibraryPage,
    },
    {
      path: '/edit/:name',
      name: 'edit',
      component: CreateLibraryPage,
    },
    {
      path: '/log',
      name: 'log',
      component: LogPage,
    },
  ],
});

export default router;
