import Main from '@/pages/Main'
import PostPage from '@/pages/PostPage'
import About from '@/pages/About'
import PostIdPage from '@/pages/PostIdPage'
import PostPageWithStore from '@/pages/PostPageWithStore'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: Main,
  },
  {
    path: '/posts',
    component: PostPage,
  },
  {
    path: '/store',
    component: PostPageWithStore,
  },
  {
    path: '/posts/:id',
    component: PostIdPage,
  },
  {
    path: '/about',
    component: About,
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
})

export default router
