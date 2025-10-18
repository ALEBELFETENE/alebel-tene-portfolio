import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(localStorage.getItem('theme') || 'light')

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  function setTheme(newTheme) {
    theme.value = newTheme
  }

  // Watch for theme changes and update localStorage and document class
  watch(theme, (newTheme) => {
    localStorage.setItem('theme', newTheme)
    document.documentElement.className = newTheme
  }, { immediate: true })

  return {
    theme,
    toggleTheme,
    setTheme
  }
})