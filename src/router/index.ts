import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/test',
    },
    {
      path: '/test',
      component: () => import('@/views/test/testPage.vue'),
      children: [
        {
          path: '/home',
          component: () => import('@/views/test/components/SubHomeView.vue'),
        },
        {
          path: '/about',
          component: () => import('@/views/test/components/AboutView.vue'),
        },
      ],
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('@/views/todo/todo.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginView.vue'),
    },
  ],
});

export default router;
