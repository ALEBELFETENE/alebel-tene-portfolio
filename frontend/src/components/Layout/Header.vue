<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <div class="container">
      <!-- Logo -->
      <div class="logo">
        <router-link to="/" class="logo-link">
          <div class="logo-icon">
            <span class="logo-initials">AF</span>
            <div class="logo-glow"></div>
          </div>
          <span class="logo-text">Portfolio</span>
        </router-link>
      </div>

      <!-- Desktop Navigation -->
      <nav class="nav">
        <router-link 
          v-for="item in navItems" 
          :key="item.path"
          :to="item.path" 
          class="nav-link"
          :class="{ 'nav-link--admin': item.admin }"
        >
          <component :is="item.icon" class="nav-icon" />
          <span class="nav-text">{{ item.name }}</span>
          <div class="nav-indicator"></div>
        </router-link>
      </nav>

      <!-- Mobile Menu Toggle -->
      <button class="mobile-menu-toggle" @click="toggleMobileMenu" :aria-label="mobileMenuLabel">
        <span class="mobile-menu-line"></span>
        <span class="mobile-menu-line"></span>
        <span class="mobile-menu-line"></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ 'mobile-menu--open': mobileMenuOpen }">
      <nav class="mobile-nav">
        <router-link 
          v-for="item in navItems" 
          :key="item.path"
          :to="item.path" 
          class="mobile-nav-link"
          :class="{ 'mobile-nav-link--admin': item.admin }"
          @click="closeMobileMenu"
        >
          <component :is="item.icon" class="mobile-nav-icon" />
          <span class="mobile-nav-text">{{ item.name }}</span>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

// SVG Icons
const HomeIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  `
}

const UserIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  `
}

const SkillsIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  `
}

const ProjectsIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  `
}

const ContactIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  `
}

const BlogIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  `
}

const AdminIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  `
}

export default {
  name: 'LayoutHeader',
  components: {
    HomeIcon,
    UserIcon,
    SkillsIcon,
    ProjectsIcon,
    ContactIcon,
    BlogIcon,
    AdminIcon
  },
  setup() {
    const authStore = useAuthStore()
    const mobileMenuOpen = ref(false)
    const isScrolled = ref(false)

    const navItems = computed(() => {
      const items = [
        { name: 'Home', path: '/', icon: 'HomeIcon' },
        { name: 'About', path: '/about', icon: 'UserIcon' },
        { name: 'Skills', path: '/skills', icon: 'SkillsIcon' },
        { name: 'Projects', path: '/projects', icon: 'ProjectsIcon' },
        { name: 'Contact', path: '/contact', icon: 'ContactIcon' },
        { name: 'Blog', path: '/blog', icon: 'BlogIcon' }
      ]
      
      if (authStore.isAuthenticated) {
        items.push({ name: 'Admin', path: '/admin', icon: 'AdminIcon', admin: true })
      }
      
      return items
    })

    const mobileMenuLabel = computed(() => {
      return mobileMenuOpen.value ? 'Close menu' : 'Open menu'
    })

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }

    const closeMobileMenu = () => {
      mobileMenuOpen.value = false
    }

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      navItems,
      mobileMenuLabel,
      mobileMenuOpen,
      isScrolled,
      toggleMobileMenu,
      closeMobileMenu
    }
  }
}
</script>

<style scoped>
/* Header Base Styles */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(15, 23, 42, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.header--scrolled {
  background: rgba(15, 23, 42, 0.98);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}

/* Logo Styles */
.logo-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;
}

.logo-link:hover {
  transform: translateY(-1px);
}

.logo-icon {
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3);
  overflow: hidden;
}

.logo-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
  border-radius: inherit;
}

.logo-initials {
  color: white;
  font-weight: 700;
  font-size: 1rem;
  position: relative;
  z-index: 1;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: #f8fafc;
  letter-spacing: -0.5px;
}

/* Desktop Navigation */
.nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  text-decoration: none;
  color: #cbd5e1;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid transparent;
}

.nav-link:hover {
  color: #f8fafc;
  background: rgba(99, 102, 241, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  color: white;
  background: #6366f1;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
}

.nav-link--admin {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  box-shadow: 0 8px 32px rgba(245, 158, 11, 0.3);
}

.nav-link--admin:hover {
  background: linear-gradient(135deg, #e6900a 0%, #c46905 100%);
  transform: translateY(-1px);
}

.nav-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.nav-text {
  font-size: 0.875rem;
  font-weight: 500;
}

.nav-indicator {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background: #6366f1;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-link.router-link-active .nav-indicator {
  opacity: 1;
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  gap: 6px;
  padding: 0;
}

.mobile-menu-line {
  display: block;
  width: 24px;
  height: 2px;
  background-color: #f8fafc;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.mobile-menu-toggle:hover .mobile-menu-line {
  background-color: #6366f1;
}

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background: rgba(15, 23, 42, 0.98);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transform: translateY(-100%);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 999;
  visibility: hidden;
}

.mobile-menu--open {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  padding: 1.5rem 2rem;
  gap: 0.5rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  text-decoration: none;
  color: #cbd5e1;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid transparent;
}

.mobile-nav-link:hover {
  color: #f8fafc;
  background: rgba(99, 102, 241, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.mobile-nav-link.router-link-active {
  color: white;
  background: #6366f1;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
}

.mobile-nav-link--admin {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
}

.mobile-nav-link--admin:hover {
  background: linear-gradient(135deg, #e6900a 0%, #c46905 100%);
}

.mobile-nav-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.mobile-nav-text {
  font-size: 1rem;
  font-weight: 500;
}

/* Mobile Menu Animation */
.mobile-menu-toggle .mobile-menu-line:nth-child(1) {
  transform: rotate(0deg);
}

.mobile-menu-toggle .mobile-menu-line:nth-child(2) {
  opacity: 1;
}

.mobile-menu-toggle .mobile-menu-line:nth-child(3) {
  transform: rotate(0deg);
}

.mobile-menu--open + .container .mobile-menu-toggle .mobile-menu-line:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.mobile-menu--open + .container .mobile-menu-toggle .mobile-menu-line:nth-child(2) {
  opacity: 0;
}

.mobile-menu--open + .container .mobile-menu-toggle .mobile-menu-line:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .nav {
    gap: 0.25rem;
  }
  
  .nav-link {
    padding: 0.75rem 1rem;
  }
  
  .nav-text {
    font-size: 0.8rem;
  }
}

@media (max-width: 768px) {
  .nav {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: flex;
  }
  
  .container {
    padding: 0 1.5rem;
  }
  
  .logo-text {
    display: none;
  }
}

@media (max-width: 480px) {
  .container {
    height: 70px;
    padding: 0 1rem;
  }
  
  .logo-icon {
    width: 40px;
    height: 40px;
  }
  
  .logo-initials {
    font-size: 0.875rem;
  }
  
  .mobile-menu {
    top: 70px;
  }
  
  .mobile-nav {
    padding: 1rem 1.5rem;
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .header,
  .logo-link,
  .nav-link,
  .mobile-menu,
  .mobile-nav-link {
    transition: none;
  }
}
</style>