import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Public views
import Home from '@/views/public/Home.vue'
import Projects from '@/components/portfolio/Projects.vue'
import Blog from '@/components/portfolio/Blog.vue'
import Skills from '@/components/portfolio/Skills.vue'
import About from '@/components/portfolio/About.vue'
import Contact from '@/components/portfolio/Contact.vue'


// Auth views


const routes = [
  // Public routes
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { title: 'Home' }
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects,
    props: true,
    meta: { title: 'Projects' }
  },
  {
    path: '/blog',
    name: 'blog',
    component: Blog,
    meta: { title: 'Blog' }
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: { title: 'About' }
  },
  {
    path: '/skills',
    name: 'skills',
    component: Skills,
    meta: { title: 'Skills' }
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact,
    meta: { title: 'Contact' }
  },

  // Auth routes
 
  

  // Admin routes
 
  
  // Redirect unknown routes to home
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Set page title
  if (to.meta.title) {
    document.title = `${to.meta.title} - Portfolio`
  }

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
    return
  }

  // Check if route requires guest (redirect authenticated users away from login)
 

  next()
})

export default router