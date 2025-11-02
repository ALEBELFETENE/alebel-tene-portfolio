<template>
  <LayoutHeader />
  <section class="projects-section" id="projects" ref="projectsSection">
    <!-- Clean Background -->
    <div class="projects-background">
      <div class="gradient-overlay"></div>
    </div>

    <div class="container">
      <!-- Clean Section Header -->
      <div class="section-header" ref="sectionHeader">
        <div class="section-badge animate-fade-in">
          <span class="badge-icon">🚀</span>
          <span class="badge-text">Portfolio Showcase</span>
        </div>
        <h2 class="section-title animate-fade-in-up" style="animation-delay: 0.2s">
          Featured <span class="text-gradient">Projects</span>
        </h2>
        <p class="section-subtitle animate-fade-in-up" style="animation-delay: 0.4s">
          Crafting digital excellence through innovative solutions and cutting-edge technologies
        </p>
      </div>

      <!-- Clean Project Filters -->
      <div class="project-filters animate-fade-in-up" style="animation-delay: 0.6s" ref="projectFilters">
        <button
          v-for="filter in filters"
          :key="filter"
          class="filter-btn"
          :class="{ active: activeFilter === filter }"
          @click="setActiveFilter(filter)"
        >
          <span class="filter-text">{{ filter }}</span>
          <span class="filter-count" v-if="filter !== 'All'">
            {{ getFilterCount(filter) }}
          </span>
        </button>
      </div>

      <!-- Clean Projects Grid -->
      <div class="projects-grid" ref="projectsGrid">
        <div
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          class="project-card-wrapper"
          :style="`animation-delay: ${0.8 + index * 0.1}s`"
        >
          <div class="project-card">
            <!-- Project Image -->
            <div class="project-image-container">
              <div class="image-wrapper">
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="project-image"
                  @error="handleImageError"
                />
                <div class="image-overlay"></div>
              </div>
              
              <!-- Project Badge -->
              <div class="project-badge" :class="project.category.toLowerCase()">
                <div class="badge-dot"></div>
                {{ project.category }}
              </div>
            </div>

            <!-- Project Content -->
            <div class="project-content">
              <div class="project-header">
                <h3 class="project-title">{{ project.title }}</h3>
                <div class="project-actions">
                  <button class="action-btn favorite-btn" @click="toggleFavorite(project.id)">
                    <HeartIcon class="action-icon" :class="{ filled: project.favorite }" />
                  </button>
                </div>
              </div>
              
              <p class="project-description">{{ project.description }}</p>

              <!-- Tech Stack -->
              <div class="project-tech">
                <div
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="tech-tag"
                >
                  <span class="tech-dot"></span>
                  {{ tech }}
                </div>
              </div>

              <!-- Project Stats -->
              <div class="project-stats">
                <div class="stat">
                  <div class="stat-icon-wrapper">
                    <CalendarIcon class="stat-icon" />
                  </div>
                  <div class="stat-content">
                    <div class="stat-label">Duration</div>
                    <div class="stat-number">{{ project.duration }}</div>
                  </div>
                </div>
                <div class="stat">
                  <div class="stat-icon-wrapper">
                    <CodeIcon class="stat-icon" />
                  </div>
                  <div class="stat-content">
                    <div class="stat-label">Lines of Code</div>
                    <div class="stat-number">{{ project.linesOfCode }}</div>
                  </div>
                </div>
              </div>

              <!-- Project Links -->
              <div class="project-links">
                <a
                  v-if="project.demoUrl"
                  :href="project.demoUrl"
                  target="_blank"
                  class="project-link demo-link"
                >
                  <ExternalLinkIcon class="link-icon" />
                  <span>Live Demo</span>
                </a>
                <a
                  v-if="project.githubUrl"
                  :href="project.githubUrl"
                  target="_blank"
                  class="project-link github-link"
                >
                  <GithubIcon class="link-icon" />
                  <span>Source Code</span>
                </a>
                <button
                  class="project-link details-link"
                  @click="$emit('view-details', project)"
                >
                  <EyeIcon class="link-icon" />
                  <span>Case Study</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- View More Section -->
      <div class="view-more-section animate-fade-in-up" style="animation-delay: 1.2s" v-if="showViewMore">
        <div class="view-more-content">
          <div class="view-more-text">
            <h3 class="view-more-title">Ready to see more?</h3>
            <p class="view-more-subtitle">Explore my complete portfolio with additional projects and case studies</p>
          </div>
          <UiButton 
            variant="gradient" 
            size="large"
            class="view-more-btn"
            @click="$emit('view-all')"
          >
            <span class="btn-content">
              Explore Full Portfolio
              <ArrowRightIcon class="btn-icon" />
            </span>
          </UiButton>
        </div>
      </div>
    </div>
  </section>
  <LayoutFooter />
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import UiButton from '@/components/ui/Button.vue'
import LayoutHeader from '@/components/Layout/Header.vue'
import LayoutFooter from '@/components/Layout/Footer.vue'

// Clean SVG Icons
const ExternalLinkIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  `
}

const GithubIcon = {
  template: `
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  `
}

const EyeIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  `
}

const CalendarIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  `
}

const CodeIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  `
}

const HeartIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  `
}

const ArrowRightIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  `
}

export default {
  name: 'PortfolioProjects',
  components: {
    LayoutHeader,
    LayoutFooter,
    UiButton,
    ExternalLinkIcon,
    GithubIcon,
    EyeIcon,
    CalendarIcon,
    CodeIcon,
    HeartIcon,
    ArrowRightIcon
  },
  props: {
    projects: {
      type: Array,
      default: () => [
        {
          id: 1,
          title: 'Enterprise E-Commerce Platform',
          description: 'A comprehensive full-stack e-commerce solution featuring advanced user authentication, secure payment processing, real-time inventory management, and an intuitive admin dashboard.',
          image: '/api/placeholder/400/250',
          technologies: ['Vue.js 3', 'Node.js', 'MongoDB', 'Stripe API', 'Express.js', 'Redis'],
          category: 'Fullstack',
          duration: '3 months',
          linesOfCode: '15K+',
          features: '20+',
          progress: 100,
          demoUrl: 'https://demo.example.com',
          githubUrl: 'https://github.com/example/ecommerce',
          favorite: false
        },
        {
          id: 2,
          title: 'Collaborative Task Management Suite',
          description: 'Enterprise-grade task management application with real-time collaboration, advanced drag-and-drop functionality, team workspaces, and comprehensive analytics dashboard.',
          image: '/api/placeholder/400/250',
          technologies: ['React 18', 'Socket.io', 'PostgreSQL', 'Express', 'Redis', 'Docker'],
          category: 'Frontend',
          duration: '2 months',
          linesOfCode: '12K+',
          features: '15+',
          progress: 100,
          demoUrl: 'https://demo.example.com',
          githubUrl: 'https://github.com/example/taskapp',
          favorite: true
        },
        {
          id: 3,
          title: 'Advanced Weather Analytics Platform',
          description: 'Responsive weather dashboard with real-time data visualization, predictive analytics, interactive maps, and customizable alert systems for enterprise clients.',
          image: '/api/placeholder/400/250',
          technologies: ['Vue.js', 'D3.js', 'Weather API', 'Tailwind CSS', 'Mapbox GL', 'Chart.js'],
          category: 'Frontend',
          duration: '1 month',
          linesOfCode: '8K+',
          features: '10+',
          progress: 100,
          demoUrl: 'https://demo.example.com',
          githubUrl: 'https://github.com/example/weather',
          favorite: false
        },
        {
          id: 4,
          title: 'Microservices API Gateway',
          description: 'High-performance API gateway for microservices architecture featuring advanced rate limiting, JWT authentication, request routing, and comprehensive monitoring.',
          image: '/api/placeholder/400/250',
          technologies: ['Node.js', 'Redis', 'Docker', 'Kubernetes', 'JWT', 'Prometheus'],
          category: 'Backend',
          duration: '4 months',
          linesOfCode: '20K+',
          features: '25+',
          progress: 100,
          demoUrl: 'https://demo.example.com',
          githubUrl: 'https://github.com/example/apigateway',
          favorite: false
        }
      ]
    }
  },
  emits: ['view-details', 'view-all'],
  setup(props) {
    const projectsSection = ref(null)
    const sectionHeader = ref(null)
    const projectFilters = ref(null)
    const projectsGrid = ref(null)
    
    const activeFilter = ref('All')
    const showViewMore = ref(true)

    const filters = ['All', 'Fullstack', 'Frontend', 'Backend', 'Mobile']

    const filteredProjects = computed(() => {
      if (activeFilter.value === 'All') {
        return props.projects
      }
      return props.projects.filter(project => 
        project.category.toLowerCase() === activeFilter.value.toLowerCase()
      )
    })

    const setActiveFilter = (filter) => {
      activeFilter.value = filter
    }

    const getFilterCount = (filter) => {
      if (filter === 'All') return props.projects.length
      return props.projects.filter(project => 
        project.category.toLowerCase() === filter.toLowerCase()
      ).length
    }

    const toggleFavorite = (projectId) => {
      const project = props.projects.find(p => p.id === projectId)
      if (project) {
        project.favorite = !project.favorite
      }
    }

    const handleImageError = (event) => {
      event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjMUYyODNBIi8+CjxwYXRoIGQ9Ik0xNTAgMTAwSDI1MFYxNTBIMTUwVjEwMFoiIGZpbGw9IiMzMzQxNTUiLz4KPHN2Zz4K'
    }

    onMounted(() => {
      // Add intersection observers for animations
    })

    return {
      projectsSection,
      sectionHeader,
      projectFilters,
      projectsGrid,
      activeFilter,
      showViewMore,
      filters,
      filteredProjects,
      setActiveFilter,
      getFilterCount,
      toggleFavorite,
      handleImageError
    }
  }
}
</script>

<style scoped>
/* Professional Color Variables */
:root {
  --primary: #6366f1;
  --primary-light: #818cf8;
  --primary-dark: #4f46e5;
  --secondary: #10b981;
  --secondary-light: #34d399;
  --accent: #f59e0b;
  --accent-light: #fbbf24;
  --background: #0f172a;
  --surface: #1e293b;
  --surface-light: #334155;
  --surface-dark: #0f172a;
  --text-primary: #f8fafc;
  --text-secondary: #e2e8f0;
  --text-muted: #94a3b8;
  --border: #334155;
  --border-light: #475569;
  --success: #10b981;
  --info: #3b82f6;
  --warning: #f59e0b;
  --danger: #ef4444;
  --gradient-primary: linear-gradient(135deg, #6366f1, #8b5cf6);
  --gradient-secondary: linear-gradient(135deg, #10b981, #3b82f6);
}

.projects-section {
  position: relative;
  padding: 120px 0;
  overflow: hidden;
  background: var(--background);
}

/* Clean Background */
.projects-background {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, rgba(99, 102, 241, 0.05) 0%, transparent 70%);
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Clean Section Header */
.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  padding: 1rem 2rem;
  border-radius: 50px;
  margin-bottom: 2rem;
  backdrop-filter: blur(20px);
}

.badge-icon {
  font-size: 1.25rem;
}

.badge-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--primary-light);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.section-title {
  font-size: 3.75rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  line-height: 1.1;
}

.text-gradient {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 1.375rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 400;
}

/* Clean Project Filters */
.project-filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
}

.filter-btn {
  position: relative;
  padding: 1rem 2rem;
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.filter-btn:hover {
  background: rgba(30, 41, 59, 0.9);
  color: var(--primary-light);
  border-color: var(--primary-light);
}

.filter-btn.active {
  background: var(--gradient-primary);
  color: var(--text-primary);
  border-color: transparent;
}

.filter-count {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Clean Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 2.5rem;
  margin-bottom: 5rem;
}

.project-card-wrapper {
  animation: fadeInUp 0.8s ease forwards;
  opacity: 0;
}

.project-card {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
}

/* Clean Project Image */
.project-image-container {
  position: relative;
  overflow: hidden;
  height: 240px;
  flex-shrink: 0;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(15, 23, 42, 0.3) 100%);
}

/* Clean Project Badge */
.project-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(20px);
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.project-badge.fullstack { 
  background: var(--gradient-primary);
}
.project-badge.frontend { 
  background: var(--gradient-secondary);
}
.project-badge.backend { 
  background: linear-gradient(135deg, var(--accent), var(--warning));
}
.project-badge.mobile { 
  background: linear-gradient(135deg, var(--info), var(--primary));
}

/* Clean Project Content */
.project-content {
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.project-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
  margin: 0;
  flex: 1;
}

.project-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-muted);
}

.action-btn:hover {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

.action-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.action-icon.filled {
  fill: var(--danger);
  color: var(--danger);
}

.project-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
}

/* Clean Tech Stack */
.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary-light);
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.tech-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--primary-light);
}

/* Clean Project Stats */
.project-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid var(--border);
}

.stat-icon-wrapper {
  width: 2.5rem;
  height: 2.5rem;
  background: var(--gradient-primary);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon {
  width: 1rem;
  height: 1rem;
  color: white;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 500;
}

/* Clean Project Links */
.project-links {
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
}

.project-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 8px;
  text-decoration: none;
  color: var(--surface);
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  cursor: pointer;
  flex: 1;
  justify-content: center;
}

.project-link:hover {
  transform: translateY(-1px);
}

.demo-link { background: var(--primary); color: white; }
.github-link { background: var(--surface); color: white; border: 1px solid var(--border); }
.details-link { background: var(--secondary); color: white; }

.github-link:hover { background: var(--surface-light); }
.demo-link:hover { background: var(--primary-dark); }
.details-link:hover { background: var(--secondary-light); }

.link-icon {
  width: 1rem;
  height: 1rem;
}

/* Clean View More Section */
.view-more-section {
  text-align: center;
  padding: 4rem 0;
}

.view-more-content {
  max-width: 600px;
  margin: 0 auto;
}

.view-more-text {
  margin-bottom: 3rem;
}

.view-more-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.view-more-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.view-more-btn {
  background: var(--gradient-primary);
  border: none;
  color: white;
  padding: 1.25rem 3rem;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.view-more-btn:hover {
  transform: translateY(-2px);
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.3s ease;
}

.view-more-btn:hover .btn-icon {
  transform: translateX(4px);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeInUp 0.8s ease forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease forwards;
  opacity: 0;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  }
}

@media (max-width: 1024px) {
  .section-title {
    font-size: 3.25rem;
  }
  
  .projects-grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .projects-section {
    padding: 80px 0;
  }

  .section-title {
    font-size: 2.75rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .project-filters {
    gap: 0.75rem;
  }

  .filter-btn {
    padding: 0.875rem 1.5rem;
    font-size: 0.875rem;
  }

  .project-links {
    flex-direction: column;
  }

  .project-stats {
    grid-template-columns: 1fr;
  }

  .view-more-title {
    font-size: 2rem;
  }

  .view-more-subtitle {
    font-size: 1.125rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1.5rem;
  }

  .section-title {
    font-size: 2.25rem;
  }

  .section-badge {
    padding: 0.75rem 1.5rem;
  }

  .project-content {
    padding: 1.5rem;
  }

  .project-image-container {
    height: 200px;
  }

  .project-filters {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 1rem;
  }

  .filter-btn {
    flex-shrink: 0;
  }

  .view-more-btn {
    width: 100%;
    padding: 1.25rem 2rem;
  }
}
</style>