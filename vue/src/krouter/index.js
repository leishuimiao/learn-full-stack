import Vue from 'vue';
import Home from '@/views/Home.vue';
import KRouter from './k-router';

Vue.use(KRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
  {
    path: '/tab',
    name: 'Tab',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Tab.vue'),
    children: [
      {
        path: '/tab/content/:id',
        name: 'TabContent',
        component: () => import(/* webpackChunkName: "about" */ '@/views/TabContent.vue'),
      },
    ],
  },
];

const router = new KRouter({
  routes,
});

export default router;
