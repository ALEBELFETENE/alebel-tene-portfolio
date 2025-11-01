<template>
  <LayoutHeader />
  <section class="projects-section" id="projects" ref="projectsSection">
    <!-- Enhanced Background -->
    <div class="projects-background">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>
      <div class="gradient-overlay"></div>
      <div class="code-grid"></div>
    </div>

    <div class="container">
      <!-- Enhanced Section Header -->
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

      <!-- Enhanced Project Filters -->
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

      <!-- Enhanced Projects Grid -->
      <div class="projects-grid" ref="projectsGrid">
        <div
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          class="project-card-wrapper"
          :style="`animation-delay: ${0.8 + index * 0.1}s`"
        >
          <div 
            class="project-card group"
            @mouseenter="hoveredProject = project.id"
            @mouseleave="hoveredProject = null"
          >
            <!-- Project Image with Enhanced Overlay -->
            <div class="project-image-container">
              <div class="image-wrapper">
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="project-image"
                  @error="handleImageError"
                />
                <div class="image-gradient"></div>
              </div>
              
              <div class="image-overlay">
                <div class="project-meta">
                  <div class="meta-item">
                    <CalendarIcon class="meta-icon" />
                    <span>{{ project.duration }}</span>
                  </div>
                  <div class="meta-item">
                    <CodeIcon class="meta-icon" />
                    <span>{{ project.linesOfCode }}</span>
                  </div>
                </div>
                
                <div class="project-links">
                  <a
                    v-if="project.demoUrl"
                    :href="project.demoUrl"
                    target="_blank"
                    class="project-link demo-link"
                    @click.stop
                  >
                    <ExternalLinkIcon class="link-icon" />
                    <span>Live Demo</span>
                  </a>
                  <a
                    v-if="project.githubUrl"
                    :href="project.githubUrl"
                    target="_blank"
                    class="project-link github-link"
                    @click.stop
                  >
                    <GithubIcon class="link-icon" />
                    <span>Source Code</span>
                  </a>
                  <button
                    class="project-link details-link"
                    @click.stop="$emit('view-details', project)"
                  >
                    <EyeIcon class="link-icon" />
                    <span>Case Study</span>
                  </button>
                </div>
              </div>

              <!-- Enhanced Project Badge -->
              <div class="project-badge" :class="project.category.toLowerCase()">
                <div class="badge-dot"></div>
                {{ project.category }}
              </div>
            </div>

            <!-- Enhanced Project Content -->
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

              <!-- Enhanced Tech Stack -->
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

              <!-- Enhanced Project Stats -->
              <div class="project-stats">
                <div class="stat">
                  <div class="stat-icon-wrapper">
                    <FeatureIcon class="stat-icon" />
                  </div>
                  <div class="stat-content">
                    <div class="stat-number">{{ project.features }}+</div>
                    <div class="stat-label">Features</div>
                  </div>
                </div>
                <div class="stat">
                  <div class="stat-icon-wrapper">
                    <CodeBracketIcon class="stat-icon" />
                  </div>
                  <div class="stat-content">
                    <div class="stat-number">{{ project.linesOfCode }}</div>
                    <div class="stat-label">Lines of Code</div>
                  </div>
                </div>
              </div>

              <!-- Project Progress (if applicable) -->
              <div class="project-progress" v-if="project.progress">
                <div class="progress-header">
                  <span class="progress-label">Project Completion</span>
                  <span class="progress-percentage">{{ project.progress }}%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" :style="`width: ${project.progress}%`"></div>
                </div>
              </div>
            </div>

            <!-- Enhanced Project Glow -->
            <div class="project-glow" :class="`glow-${index % 3}`"></div>
            
            <!-- Project Hover Effect -->
            <div class="project-hover-effect"></div>
          </div>
        </div>
      </div>

      <!-- Enhanced View More Section -->
      <div class="view-more-section animate-fade-in-up" style="animation-delay: 1.2s" v-if="showViewMore">
        <div class="view-more-content">
          <div class="view-more-text">
            <h3 class="view-more-title">Ready to see more?</h3>
            <p class="view-more-subtitle">Explore my complete portfolio with additional projects and case studies</p>
          </div>
          <UiButton 
            variant="gradient" 
            size="large"
            class="view-more-btn group"
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

// Enhanced SVG Icons
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

const FeatureIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  `
}

const CodeBracketIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
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
    FeatureIcon,
    CodeBracketIcon,
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
    const hoveredProject = ref(null)
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
      hoveredProject,
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

/* Enhanced Background */
.projects-background {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.08;
  animation: float 12s ease-in-out infinite;
}

.shape-1 {
  width: 300px;
  height: 300px;
  background: var(--primary);
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.shape-2 {
  width: 250px;
  height: 250px;
  background: var(--secondary);
  top: 60%;
  right: 10%;
  animation-delay: 3s;
}

.shape-3 {
  width: 280px;
  height: 280px;
  background: var(--accent);
  bottom: 20%;
  left: 15%;
  animation-delay: 6s;
}

.shape-4 {
  width: 200px;
  height: 200px;
  background: var(--info);
  top: 30%;
  right: 20%;
  animation-delay: 9s;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 0%, var(--background) 70%);
}

.code-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: radial-gradient(ellipse at center, black 40%, transparent 70%);
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Enhanced Section Header */
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
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.1);
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
  position: relative;
}

.section-subtitle {
  font-size: 1.375rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 400;
}

/* Enhanced Project Filters */
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.filter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  color: var(--primary-light);
  border-color: var(--primary-light);
  background: rgba(30, 41, 59, 0.9);
}

.filter-btn.active {
  background: var(--gradient-primary);
  color: var(--text-primary);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.3);
  border-color: transparent;
}

.filter-count {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Enhanced Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 2.5rem;
  margin-bottom: 5rem;
}

.project-card-wrapper {
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
}

.project-card {
  position: relative;
  background: var(--surface);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border);
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.3);
  border-color: var(--primary-light);
}

/* Enhanced Project Image */
.project-image-container {
  position: relative;
  overflow: hidden;
  height: 280px;
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
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.image-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(15, 23, 42, 0.8) 100%);
  opacity: 0.7;
}

.project-card:hover .project-image {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent, rgba(15, 23, 42, 0.95));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card:hover .image-overlay {
  opacity: 1;
}

.project-meta {
  display: flex;
  gap: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-primary);
  font-size: 0.875rem;
  font-weight: 500;
}

.meta-icon {
  width: 1rem;
  height: 1rem;
  color: var(--primary-light);
}

.project-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.project-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 12px;
  text-decoration: none;
  color: var(--surface);
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  backdrop-filter: blur(10px);
}

.project-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}

.demo-link:hover { background: var(--primary); color: white; }
.github-link:hover { background: var(--surface); color: white; }
.details-link:hover { background: var(--secondary); color: white; }

.link-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Enhanced Project Badge */
.project-badge {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(20px);
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  animation: pulse 2s infinite;
}

.project-badge.fullstack { 
  background: var(--gradient-primary);
  border: 1px solid rgba(99, 102, 241, 0.3);
}
.project-badge.frontend { 
  background: var(--gradient-secondary);
  border: 1px solid rgba(16, 185, 129, 0.3);
}
.project-badge.backend { 
  background: linear-gradient(135deg, var(--accent), var(--warning));
  border: 1px solid rgba(245, 158, 11, 0.3);
}
.project-badge.mobile { 
  background: linear-gradient(135deg, var(--info), var(--primary));
  border: 1px solid rgba(59, 130, 246, 0.3);
}

/* Enhanced Project Content */
.project-content {
  padding: 2.5rem;
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
  transform: scale(1.1);
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
  line-height: 1.7;
  margin-bottom: 2rem;
  flex: 1;
}

/* Enhanced Tech Stack */
.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.tech-tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary-light);
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid rgba(99, 102, 241, 0.2);
  transition: all 0.3s ease;
}

.tech-tag:hover {
  transform: translateY(-1px);
  background: rgba(99, 102, 241, 0.2);
  box-shadow: 0 5px 15px rgba(99, 102, 241, 0.2);
}

.tech-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--primary-light);
}

/* Enhanced Project Stats */
.project-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

.stat:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
}

.stat-icon-wrapper {
  width: 3rem;
  height: 3rem;
  background: var(--gradient-primary);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: white;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-muted);
  font-weight: 500;
}

/* Project Progress */
.project-progress {
  margin-top: auto;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.progress-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.progress-percentage {
  font-size: 0.875rem;
  color: var(--primary-light);
  font-weight: 600;
}

.progress-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--gradient-primary);
  border-radius: 3px;
  transition: width 1s ease-in-out;
}

/* Enhanced Project Glow */
.project-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  filter: blur(30px);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
}

.project-card:hover .project-glow {
  opacity: 0.4;
}

.glow-0 { background: var(--gradient-primary); }
.glow-1 { background: var(--gradient-secondary); }
.glow-2 { background: linear-gradient(135deg, var(--accent), var(--primary)); }

/* Project Hover Effect */
.project-hover-effect {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 24px;
}

.project-card:hover .project-hover-effect {
  opacity: 1;
}

/* Enhanced View More Section */
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
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.view-more-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 30px 60px rgba(99, 102, 241, 0.4);
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.btn-icon {
  width: 1.5rem;
  height: 1.5rem;
  transition: transform 0.3s ease;
}

.view-more-btn:hover .btn-icon {
  transform: translateX(8px);
}

/* Enhanced Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(120deg);
  }
  66% {
    transform: translateY(10px) rotate(240deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-fade-in {
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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
    gap: 0.75rem;
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
    padding: 2rem;
  }

  .project-image-container {
    height: 240px;
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