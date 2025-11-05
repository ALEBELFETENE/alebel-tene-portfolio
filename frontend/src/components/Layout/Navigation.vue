<template>
  <nav class="sidebar">
    <div class="sidebar-header">
      <h3>Navigation</h3>
    </div>
    <ul class="sidebar-nav">
      <li v-for="item in navItems" :key="item.to">
        <router-link 
          :to="item.to" 
          class="sidebar-link"
          :class="{ 'sidebar-link-active': $route.path === item.to }"
        >
          <span class="sidebar-icon">{{ item.icon }}</span>
          <span class="sidebar-text">{{ item.text }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'LayoutNavigation',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    navItems() {
      return this.items.length ? this.items : this.defaultNavItems
    }
  },
  data() {
    return {
      defaultNavItems: [
        { to: '/', text: 'Home', icon: '🏠' },
        { to: '/projects', text: 'Projects', icon: '💼' },
        { to: '/blog', text: 'Blog', icon: '📝' },
        { to: '/admin', text: 'Admin', icon: '⚙️' }
      ]
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: var(--sidebar-bg, #f8fafc);
  border-right: 1px solid var(--sidebar-border, #e2e8f0);
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid var(--sidebar-border, #e2e8f0);
}

.sidebar-header h3 {
  margin: 0;
  color: var(--sidebar-heading, #374151);
}

.sidebar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-link {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  text-decoration: none;
  color: var(--sidebar-link, #6b7280);
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.sidebar-link:hover {
  background-color: var(--sidebar-hover, #f1f5f9);
  color: var(--sidebar-link-hover, #374151);
}

.sidebar-link-active {
  background-color: var(--sidebar-active, #dbeafe);
  color: var(--sidebar-link-active, #3b82f6);
  border-left-color: #3b82f6;
}

.sidebar-icon {
  margin-right: 12px;
  font-size: 18px;
}

.sidebar-text {
  font-weight: 500;
}
</style>