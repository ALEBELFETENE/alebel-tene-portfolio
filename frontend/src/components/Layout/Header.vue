<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <router-link to="/" class="logo-link">
          <div class="logo-icon">AF</div>
          <span class="logo-text">Portfolio</span>
        </router-link>
      </div>
      <nav class="nav">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
        <router-link to="/skills" class="nav-link">Skills</router-link>
        <router-link to="/projects" class="nav-link">Projects</router-link>
        <router-link to="/contact" class="nav-link">Contact</router-link>
        <router-link to="/blog" class="nav-link">Blog</router-link>
        <router-link v-if="isAuthenticated" to="/admin" class="nav-link admin-link">Admin</router-link>
        <button class="theme-toggle" @click="toggleTheme" :aria-label="themeToggleLabel">
          <span class="theme-icon">{{ themeIcon }}</span>
        </button>
      </nav>
      <button class="mobile-menu-toggle" @click="toggleMobileMenu" :aria-label="mobileMenuLabel">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ 'mobile-menu--open': mobileMenuOpen }">
      <nav class="mobile-nav">
        <router-link to="/" class="mobile-nav-link" @click="closeMobileMenu">Home</router-link>
        <router-link to="/about" class="mobile-nav-link" @click="closeMobileMenu">About</router-link>
        <router-link to="/skills" class="mobile-nav-link" @click="closeMobileMenu">Skills</router-link>
        <router-link to="/projects" class="mobile-nav-link" @click="closeMobileMenu">Projects</router-link>
        <router-link to="/contact" class="mobile-nav-link" @click="closeMobileMenu">Contact</router-link>
        <router-link to="/blog" class="mobile-nav-link" @click="closeMobileMenu">Blog</router-link>
        <router-link v-if="isAuthenticated" to="/admin" class="mobile-nav-link admin-link" @click="closeMobileMenu">Admin</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
import { computed, ref } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'LayoutHeader',
  setup() {
    const themeStore = useThemeStore()
    const authStore = useAuthStore()
    const mobileMenuOpen = ref(false)

    const themeIcon = computed(() => {
      return themeStore.theme === 'dark' ? '☀️' : '🌙'
    })

    const themeToggleLabel = computed(() => {
      return `Switch to ${themeStore.theme === 'dark' ? 'light' : 'dark'} mode`
    })

    const isAuthenticated = computed(() => {
      return authStore.isAuthenticated
    })

    const mobileMenuLabel = computed(() => {
      return mobileMenuOpen.value ? 'Close menu' : 'Open menu'
    })

    const toggleTheme = () => {
      themeStore.toggleTheme()
    }

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }

    const closeMobileMenu = () => {
      mobileMenuOpen.value = false
    }

    return {
      themeIcon,
      themeToggleLabel,
      isAuthenticated,
      mobileMenuLabel,
      mobileMenuOpen,
      toggleTheme,
      toggleMobileMenu,
      closeMobileMenu
    }
  }
}
</script>

<style scoped>
:root {
  --header-bg: rgba(15, 23, 42, 0.8);
  --header-bg-light: rgba(255, 255, 255, 0.8);
  --header-border: rgba(255, 255, 255, 0.1);
  --header-border-light: rgba(0, 0, 0, 0.1);
  --nav-hover-bg: rgba(59, 130, 246, 0.1);
  --nav-active-bg: #3b82f6;
  --theme-toggle-border: rgba(255, 255, 255, 0.2);
  --theme-toggle-border-light: rgba(0, 0, 0, 0.1);
  --theme-toggle-hover: rgba(59, 130, 246, 0.1);
  --theme-toggle-hover-light: rgba(0, 0, 0, 0.05);
  --text-color: #f8fafc;
  --text-color-light: #1e293b;
  --logo-bg: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  --logo-bg-light: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  --mobile-menu-bg: rgba(15, 23, 42, 0.95);
  --mobile-menu-bg-light: rgba(255, 255, 255, 0.95);
}

.header {
  background: var(--header-bg);
  border-bottom: 1px solid var(--header-border);
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

[data-theme="light"] .header {
  background: var(--header-bg-light);
  border-bottom: 1px solid var(--header-border-light);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}

/* Logo Styles */
.logo-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: transform 0.2s ease;
}

.logo-link:hover {
  transform: translateY(-2px);
}

.logo-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--logo-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
}

[data-theme="light"] .logo-icon {
  background: var(--logo-bg-light);
}

.logo-icon:hover {
  transform: scale(1.05);
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
}

[data-theme="light"] .logo-text {
  color: var(--text-color-light);
}

/* Navigation Styles */
.nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-link {
  text-decoration: none;
  color: var(--text-color);
  padding: 10px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

[data-theme="light"] .nav-link {
  color: var(--text-color-light);
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
  transition: left 0.5s;
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover {
  background-color: var(--nav-hover-bg);
  transform: translateY(-2px);
}

.nav-link.router-link-active {
  background-color: var(--nav-active-bg);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.admin-link {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  font-weight: 600;
}

.admin-link.router-link-active {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.admin-link:hover {
  background: linear-gradient(135deg, #e6900a 0%, #c46905 100%);
  transform: translateY(-2px);
}

/* Theme Toggle */
.theme-toggle {
  background: rgba(59, 130, 246, 0.05);
  border: 1px solid var(--theme-toggle-border);
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
}

[data-theme="light"] .theme-toggle {
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid var(--theme-toggle-border-light);
}

.theme-toggle:hover {
  background-color: var(--theme-toggle-hover);
  transform: scale(1.05);
}

[data-theme="light"] .theme-toggle:hover {
  background-color: var(--theme-toggle-hover-light);
}

.theme-icon {
  display: block;
  transition: transform 0.3s ease;
}

.theme-toggle:hover .theme-icon {
  transform: rotate(15deg);
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
}

.mobile-menu-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background-color: var(--text-color);
  transition: all 0.3s ease;
  border-radius: 2px;
}

[data-theme="light"] .mobile-menu-toggle span {
  background-color: var(--text-color-light);
}

.mobile-menu-toggle:hover span {
  background-color: var(--nav-active-bg);
}

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  height: calc(100vh - 80px);
  background: var(--mobile-menu-bg);
  backdrop-filter: blur(20px);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: 24px;
}

[data-theme="light"] .mobile-menu {
  background: var(--mobile-menu-bg-light);
}

.mobile-menu--open {
  transform: translateX(0);
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-nav-link {
  text-decoration: none;
  color: var(--text-color);
  padding: 16px 20px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 18px;
  transition: all 0.2s ease;
  text-align: center;
}

[data-theme="light"] .mobile-nav-link {
  color: var(--text-color-light);
}

.mobile-nav-link:hover {
  background-color: var(--nav-hover-bg);
}

.mobile-nav-link.router-link-active {
  background-color: var(--nav-active-bg);
  color: white;
}

.mobile-nav-link.admin-link {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
}

.mobile-nav-link.admin-link.router-link-active {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: flex;
  }
  
  .container {
    padding: 0 16px;
  }
  
  .logo-text {
    display: none;
  }
}

@media (max-width: 480px) {
  .container {
    height: 70px;
  }
  
  .logo-icon {
    width: 36px;
    height: 36px;
    font-size: 14px;
  }
  
  .mobile-menu {
    top: 70px;
    height: calc(100vh - 70px);
  }
}

/* Animation for mobile menu toggle */
.mobile-menu-toggle span:nth-child(1) {
  transform: rotate(0deg);
}

.mobile-menu-toggle span:nth-child(2) {
  opacity: 1;
}

.mobile-menu-toggle span:nth-child(3) {
  transform: rotate(0deg);
}

.mobile-menu--open + .mobile-menu-toggle span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.mobile-menu--open + .mobile-menu-toggle span:nth-child(2) {
  opacity: 0;
}

.mobile-menu--open + .mobile-menu-toggle span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}
</style>