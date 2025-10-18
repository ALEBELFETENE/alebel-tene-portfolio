<template>
  <div class="home">
    <LayoutHeader />
    <main class="main-content">
      <PortfolioHero 
        @contact="scrollToContact"
        @projects="scrollToProjects"
      />
    
      <PortfolioSkills />
      <PortfolioProjects 
        :projects="projects"
        @view-details="viewProjectDetails"
      />
      <PortfolioContact 
        @message-sent="handleMessageSent"
      />
    </main>
    <LayoutFooter />
  </div>
</template>

<script>
import LayoutHeader from '@/components/Layout/Header.vue'
import LayoutFooter from '@/components/Layout/Footer.vue'
import PortfolioHero from '@/components/portfolio/Hero.vue'



export default {
  name: 'HomeView',
  components: {
    LayoutHeader,
    LayoutFooter,
    PortfolioHero,
  
   
  
  
  },
  data() {
    return {
      projects: [
        {
          id: 1,
          title: 'E-Commerce Platform',
          description: 'A full-stack e-commerce solution built with Vue.js and Node.js.',
          image: '/api/placeholder/400/250',
          technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe'],
          demoUrl: 'https://demo.example.com',
          githubUrl: 'https://github.com/example/ecommerce'
        },
        {
          id: 2,
          title: 'Task Management App',
          description: 'A collaborative task management application with real-time updates.',
          image: '/api/placeholder/400/250',
          technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
          demoUrl: 'https://demo.example.com',
          githubUrl: 'https://github.com/example/taskapp'
        }
      ]
    }
  },
  methods: {
    scrollToContact() {
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
      }
    },
    scrollToProjects() {
      const projectsSection = document.getElementById('projects')
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' })
      }
    },
    viewProjectDetails(project) {
      this.$router.push(`/projects/${project.id}`)
    },
    handleMessageSent(formData) {
      console.log('Message sent:', formData)
      // Handle the form data (send to API, etc.)
    }
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>