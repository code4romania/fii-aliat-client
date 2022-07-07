import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Listing from '../views/Listing.vue';
import Add from '../views/Add.vue';
import Page from '../views/Page.vue';

const routes = [
  {
    path: '/',
    name: 'Fii aliat',
    component: Home,
  },
  {
    path: '/mesaje',
    name: 'Mesaje',
    component: Listing,
  },
  {
    path: '/mesaje/:storyId?',
    name: 'Mesaj',
    component: Listing,
  },
  {
    path: '/trimite-un-mesaj',
    name: 'Trimite un mesaj',
    component: Add,
  },
  {
    path: '/despre',
    name: 'Despre',
    component: Page,
    meta: {
      slug: 'about',
      featured: true,
    },
  },
  {
    path: '/termeni-si-conditii',
    name: 'Termeni și condiții',
    component: Page,
    meta: {
      slug: 'termeni-si-conditii',
    },
  },
  {
    path: '/politica-de-confidentialitate',
    name: 'Politica de confidențialitate',
    component: Page,
    meta: {
      slug: 'politica-de-confidentialitate',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
