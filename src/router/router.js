import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from "@/views/Tabs";
import RouterTypes from "@/types/router-types";

const routes =  [
  {
    path: '/login',
    name: RouterTypes.LOGIN,
    component: () => import('@/components/Login.vue'),
  },
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1.vue'),
        meta: {
          auth: true
        }
      }
    ],
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeResolve((to, from, next) => {
  const auth = to.matched.some(record => record.meta.auth);
  if (auth) {
    next({ path: RouterTypes.LOGIN, query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
