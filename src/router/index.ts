import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/views/home/HomeView.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/home/components/SubHomeView.vue'),
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('@/views/home/components/AboutView.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginView.vue'),
    },
  ],
});

export default router;
