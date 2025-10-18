import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePortfolioStore = defineStore('portfolio', () => {
  const projects = ref([])
  const skills = ref([])
  const contactMessages = ref([])
  const loading = ref(false)

  const featuredProjects = computed(() => 
    projects.value.filter(project => project.featured).slice(0, 3)
  )

  const skillsByCategory = computed(() => {
    const categories = {}
    skills.value.forEach(skill => {
      if (!categories[skill.category]) {
        categories[skill.category] = []
      }
      categories[skill.category].push(skill)
    })
    return categories
  })

  async function fetchProjects() {
    loading.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data
      projects.value = [
        {
          id: 1,
          title: 'E-Commerce Platform',
          description: 'A full-stack e-commerce solution built with Vue.js and Node.js.',
          image: '/api/placeholder/400/250',
          technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe'],
          demoUrl: 'https://demo.example.com',
          githubUrl: 'https://github.com/example/ecommerce',
          featured: true,
          status: 'completed',
          category: 'Web Application'
        },
        {
          id: 2,
          title: 'Task Management App',
          description: 'A collaborative task management application with real-time updates.',
          image: '/api/placeholder/400/250',
          technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
          demoUrl: 'https://demo.example.com',
          githubUrl: 'https://github.com/example/taskapp',
          featured: true,
          status: 'completed',
          category: 'Web Application'
        }
      ]
    } catch (error) {
      console.error('Error fetching projects:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function fetchSkills() {
    loading.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data
      skills.value = [
        {
          name: 'Vue.js',
          level: 90,
          category: 'Frontend',
          icon: '🟢'
        },
        {
          name: 'React',
          level: 85,
          category: 'Frontend',
          icon: '🔵'
        },
        {
          name: 'Node.js',
          level: 88,
          category: 'Backend',
          icon: '🟢'
        },
        {
          name: 'Express.js',
          level: 85,
          category: 'Backend',
          icon: '⚡'
        }
      ]
    } catch (error) {
      console.error('Error fetching skills:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function submitContactForm(formData) {
    loading.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const message = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
        read: false
      }
      
      contactMessages.value.unshift(message)
      return message
    } catch (error) {
      console.error('Error submitting contact form:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function addProject(projectData) {
    const newProject = {
      id: Date.now(),
      ...projectData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    projects.value.unshift(newProject)
    return newProject
  }

  async function updateProject(projectId, projectData) {
    const index = projects.value.findIndex(p => p.id === projectId)
    if (index !== -1) {
      projects.value[index] = {
        ...projects.value[index],
        ...projectData,
        updatedAt: new Date().toISOString()
      }
      return projects.value[index]
    }
    throw new Error('Project not found')
  }

  async function deleteProject(projectId) {
    const index = projects.value.findIndex(p => p.id === projectId)
    if (index !== -1) {
      projects.value.splice(index, 1)
      return true
    }
    throw new Error('Project not found')
  }

  // Initialize with some data
  fetchProjects()
  fetchSkills()

  return {
    projects,
    skills,
    contactMessages,
    loading,
    featuredProjects,
    skillsByCategory,
    fetchProjects,
    fetchSkills,
    submitContactForm,
    addProject,
    updateProject,
    deleteProject
  }
})