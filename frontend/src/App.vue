<template>
  <div id="app" :class="[themeClass, 'theme-transition']">
    <!-- Theme Toggle Button -->
    <button 
      @click="toggleTheme"
      class="theme-toggle"
      :aria-label="`Switch to ${themeStore.theme === 'light' ? 'dark' : 'light'} mode`"
    >
      <div class="toggle-track">
        <div class="toggle-thumb">
          <svg v-if="themeStore.theme === 'light'" class="sun-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else class="moon-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </div>
      </div>
    </button>

    <!-- Animated Background Elements -->
    <div class="background-elements">
      <div class="floating-orb orb-1"></div>
      <div class="floating-orb orb-2"></div>
      <div class="floating-orb orb-3"></div>
      <div class="grid-pattern"></div>
    </div>

    <!-- Main Content -->
    <router-view />

    <!-- Cursor Follower (optional) -->
    <div v-if="enableCursorFollower" class="cursor-follower" :style="cursorStyle"></div>
  </div>
</template>

<script>
import { useThemeStore } from '@/stores/theme'
import { ref, onMounted, onUnmounted, computed } from 'vue'

export default {
  name: 'App',
  setup() {
    const themeStore = useThemeStore()
    
    // Cursor follower state
    const cursorPosition = ref({ x: 0, y: 0 })
    const enableCursorFollower = ref(true)

    const themeClass = computed(() => themeStore.theme)

    const toggleTheme = () => {
      themeStore.toggleTheme()
    }

    // Mouse move handler for cursor follower
    const handleMouseMove = (e) => {
      cursorPosition.value = {
        x: e.clientX,
        y: e.clientY
      }
    }

    const cursorStyle = computed(() => ({
      left: `${cursorPosition.value.x}px`,
      top: `${cursorPosition.value.y}px`,
      opacity: enableCursorFollower.value ? 1 : 0
    }))

    // System theme detection
    const detectSystemTheme = () => {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        themeStore.setTheme('dark')
      }
    }

    // Listen for system theme changes
    const mediaQueryListener = (e) => {
      themeStore.setTheme(e.matches ? 'dark' : 'light')
    }

    onMounted(() => {
      // Add mouse move listener
      window.addEventListener('mousemove', handleMouseMove)
      
      // Detect system theme
      detectSystemTheme()
      
      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addListener(mediaQueryListener)
      
      // Store the listener for cleanup
      themeStore.mediaQueryListener = mediaQueryListener
    })

    onUnmounted(() => {
      // Cleanup
      window.removeEventListener('mousemove', handleMouseMove)
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      if (themeStore.mediaQueryListener) {
        mediaQuery.removeListener(themeStore.mediaQueryListener)
      }
    })

    return {
      themeStore,
      themeClass,
      toggleTheme,
      cursorStyle,
      enableCursorFollower
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
  position: relative;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.theme-transition {
  transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1), 
              color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Theme Styles */
.light {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #c2bf1f;
  --text-secondary: #4a5568;
  --accent-primary: #3b82f6;
  --accent-secondary: #10b981;
  --border-color: #e2e8f0;
  --glass-bg: rgba(255, 255, 255, 0.8);
  --glass-border: rgba(255, 255, 255, 0.2);
  --shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  color: var(--text-primary);
}

.dark {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --accent-primary: #60a5fa;
  --accent-secondary: #34d399;
  --border-color: #334155;
  --glass-bg: rgba(15, 23, 42, 0.8);
  --glass-border: rgba(255, 255, 255, 0.1);
  --shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
  
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  color: var(--text-primary);
}

/* Theme Toggle Button */
.theme-toggle {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1000;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 50px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow);
}

.theme-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.3);
}

.toggle-track {
  position: relative;
  width: 3rem;
  height: 1.5rem;
  border-radius: 50px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
}

.toggle-thumb {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  background: white;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.light .toggle-thumb {
  left: 0.125rem;
}

.dark .toggle-thumb {
  left: calc(100% - 1.375rem);
}

.sun-icon, .moon-icon {
  width: 0.75rem;
  height: 0.75rem;
  color: var(--text-primary);
}

/* Background Elements */
.background-elements {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
}

.floating-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: var(--accent-primary);
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 200px;
  height: 200px;
  background: var(--accent-secondary);
  top: 60%;
  right: 10%;
  animation-delay: 2s;
}

.orb-3 {
  width: 150px;
  height: 150px;
  background: #8b5cf6;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(var(--border-color) 1px, transparent 1px),
    linear-gradient(90deg, var(--border-color) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.03;
}

/* Cursor Follower */
.cursor-follower {
  position: fixed;
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, var(--accent-primary) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease;
  mix-blend-mode: difference;
}

/* Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--accent-primary);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent-secondary);
}

/* Selection Styling */
::selection {
  background: var(--accent-primary);
  color: white;
}

/* Focus Outline */
button:focus-visible,
a:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .theme-toggle {
    top: 1rem;
    right: 1rem;
    transform: scale(0.9);
  }
  
  .floating-orb {
    display: none; /* Hide on mobile for performance */
  }
  
  .cursor-follower {
    display: none; /* Hide on mobile */
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .theme-transition {
    transition: none;
  }
}
</style>