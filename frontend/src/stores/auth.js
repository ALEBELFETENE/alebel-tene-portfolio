import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('auth_token'))

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  function login(credentials) {
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
          const userData = {
            id: 1,
            name: 'Admin User',
            email: credentials.email,
            role: 'admin'
          }
          
          user.value = userData
          token.value = 'mock_jwt_token'
          localStorage.setItem('auth_token', token.value)
          localStorage.setItem('user', JSON.stringify(userData))
          
          resolve(userData)
        } else {
          reject(new Error('Invalid credentials'))
        }
      }, 1000)
    })
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
  }

  function checkAuth() {
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = JSON.parse(storedUser)
    }
  }

  // Initialize auth state
  checkAuth()

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
})