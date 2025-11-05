<template>
  <div id="app">
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
import { ref, onMounted, onUnmounted, computed } from 'vue'

export default {
  name: 'App',
  setup() {
    // Cursor follower state
    const cursorPosition = ref({ x: 0, y: 0 })
    const enableCursorFollower = ref(true)

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

    onMounted(() => {
      // Add mouse move listener
      window.addEventListener('mousemove', handleMouseMove)
    })

    onUnmounted(() => {
      // Cleanup
      window.removeEventListener('mousemove', handleMouseMove)
    })

    return {
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
}

/* Dark Theme (Default) */
#app {
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
}
</style>