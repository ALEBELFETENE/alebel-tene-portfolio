const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    }

    // Add auth token if available
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Projects API
  async getProjects() {
    return this.request('/projects')
  }

  async getProject(id) {
    return this.request(`/projects/${id}`)
  }

  async createProject(projectData) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData)
    })
  }

  async updateProject(id, projectData) {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData)
    })
  }

  async deleteProject(id) {
    return this.request(`/projects/${id}`, {
      method: 'DELETE'
    })
  }

  // Skills API
  async getSkills() {
    return this.request('/skills')
  }

  async createSkill(skillData) {
    return this.request('/skills', {
      method: 'POST',
      body: JSON.stringify(skillData)
    })
  }

  async updateSkill(id, skillData) {
    return this.request(`/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(skillData)
    })
  }

  async deleteSkill(id) {
    return this.request(`/skills/${id}`, {
      method: 'DELETE'
    })
  }

  // Contact API
  async submitContactForm(formData) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
  }

  // Auth API
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
  }

  async getProfile() {
    return this.request('/auth/profile')
  }
}

// Create and export a singleton instance
export const api = new ApiClient()

// Utility functions for common operations
export const apiUtils = {
  async uploadImage(file) {
    const formData = new FormData()
    formData.append('image', file)

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      }
    })

    if (!response.ok) {
      throw new Error('Image upload failed')
    }

    return response.json()
  },

  async batchDelete(ids, endpoint) {
    return api.request(`${endpoint}/batch`, {
      method: 'DELETE',
      body: JSON.stringify({ ids })
    })
  },

  formatError(error) {
    if (error.message.includes('NetworkError')) {
      return 'Network error: Please check your internet connection'
    }
    
    if (error.message.includes('401')) {
      return 'Authentication failed. Please login again.'
    }
    
    if (error.message.includes('403')) {
      return 'You do not have permission to perform this action.'
    }
    
    if (error.message.includes('404')) {
      return 'Resource not found.'
    }
    
    if (error.message.includes('500')) {
      return 'Server error. Please try again later.'
    }
    
    return error.message || 'An unexpected error occurred'
  }
}