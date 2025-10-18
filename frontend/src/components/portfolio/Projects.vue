<template>
  <LayoutHeader />
  <section class="projects-section" id="projects" ref="projectsSection">
    <!-- Animated Background -->
    <div class="projects-background">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>
      <div class="code-grid"></div>
    </div>

    <div class="container">
      <!-- Section Header -->
      <div class="section-header" ref="sectionHeader">
        <div class="section-badge animate-fade-in">
          <span class="badge-icon">💼</span>
          <span class="badge-text">Portfolio</span>
        </div>
        <h2 class="section-title animate-fade-in-up" style="animation-delay: 0.2s">
          Featured <span class="text-gradient">Projects</span>
        </h2>
        <p class="section-subtitle animate-fade-in-up" style="animation-delay: 0.4s">
          A showcase of my recent work and creative solutions
        </p>
      </div>

      <!-- Project Filters -->
      <div class="project-filters animate-fade-in-up" style="animation-delay: 0.6s" ref="projectFilters">
        <button
          v-for="filter in filters"
          :key="filter"
          class="filter-btn"
          :class="{ active: activeFilter === filter }"
          @click="setActiveFilter(filter)"
        >
          {{ filter }}
        </button>
      </div>

      <!-- Projects Grid -->
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
            <!-- Project Image -->
            <div class="project-image-container">
              <img
                :src="project.image"
                :alt="project.title"
                class="project-image"
                @error="handleImageError"
              />
              <div class="image-overlay">
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
                    <span>Code</span>
                  </a>
                  <button
                    class="project-link details-link"
                    @click.stop="$emit('view-details', project)"
                  >
                    <EyeIcon class="link-icon" />
                    <span>Details</span>
                  </button>
                </div>
              </div>
              <div class="project-badge" :class="project.category.toLowerCase()">
                {{ project.category }}
              </div>
            </div>

            <!-- Project Content -->
            <div class="project-content">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>

              <!-- Tech Stack -->
              <div class="project-tech">
                <div
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="tech-tag"
                >
                  {{ tech }}
                </div>
              </div>

              <!-- Project Stats -->
              <div class="project-stats">
                <div class="stat">
                  <CalendarIcon class="stat-icon" />
                  <span>{{ project.duration }}</span>
                </div>
                <div class="stat">
                  <CodeIcon class="stat-icon" />
                  <span>{{ project.linesOfCode }}</span>
                </div>
                <div class="stat">
                  <StarIcon class="stat-icon" />
                  <span>{{ project.features }}</span>
                </div>
              </div>
            </div>

            <!-- Project Glow -->
            <div class="project-glow" :class="`glow-${index % 3}`"></div>
          </div>
        </div>
      </div>

      <!-- View More -->
      <div class="view-more animate-fade-in-up" style="animation-delay: 1.2s" v-if="showViewMore">
        <UiButton 
          variant="secondary" 
          size="large"
          class="view-more-btn group"
          @click="$emit('view-all')"
        >
          <span class="btn-content">
            View All Projects
            <ArrowRightIcon class="btn-icon" />
          </span>
        </UiButton>
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

// SVG Icons
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

const StarIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
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
    StarIcon,
    ArrowRightIcon
  },
  props: {
    projects: {
      type: Array,
      default: () => [
        {
          id: 1,
          title: 'E-Commerce Platform',
          description: 'A full-stack e-commerce solution built with Vue.js and Node.js featuring user authentication, payment processing, and admin dashboard.',
          image: '/api/placeholder/400/250',
          technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe', 'Express'],
          category: 'Fullstack',
          duration: '3 months',
          linesOfCode: '15K+',
          features: '20+',
          demoUrl: 'https://demo.example.com',
          githubUrl: 'https://github.com/example/ecommerce'
        },
        {
          id: 2,
          title: 'Task Management App',
          description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
          image: '/api/placeholder/400/250',
          technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL', 'Redis'],
          category: 'Frontend',
          duration: '2 months',
          linesOfCode: '12K+',
          features: '15+',
          demoUrl: 'https://demo.example.com',
          githubUrl: 'https://github.com/example/taskapp'
        },
        {
          id: 3,
          title: 'Weather Dashboard',
          description: 'A responsive weather dashboard that displays current conditions and forecasts with beautiful data visualizations and interactive maps.',
          image: '/api/placeholder/400/250',
          technologies: ['Vue.js', 'Chart.js', 'Weather API', 'Tailwind CSS', 'Mapbox'],
          category: 'Frontend',
          duration: '1 month',
          linesOfCode: '8K+',
          features: '10+',
          demoUrl: 'https://demo.example.com',
          githubUrl: 'https://github.com/example/weather'
        },
        {
          id: 4,
          title: 'API Gateway Service',
          description: 'A microservices API gateway with rate limiting, authentication, and request routing for distributed systems architecture.',
          image: '/api/placeholder/400/250',
          technologies: ['Node.js', 'Redis', 'Docker', 'Kubernetes', 'JWT'],
          category: 'Backend',
          duration: '4 months',
          linesOfCode: '20K+',
          features: '25+',
          demoUrl: 'https://demo.example.com',
          githubUrl: 'https://github.com/example/apigateway'
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

    const handleImageError = (event) => {
      event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTAwSDI1MFYxNTBIMTUwVjEwMFoiIGZpbGw9IiNEOEU5RkIiLz4KPHN2Zz4K'
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
      handleImageError
    }
  }
}
</script>

<style scoped>
/* Color Variables */
:root {
  --primary: #4f46e5;
  --primary-light: #6366f1;
  --primary-dark: #4338ca;
  --secondary: #10b981;
  --secondary-light: #34d399;
  --accent: #f59e0b;
  --accent-light: #fbbf24;
  --background: #0f172a;
  --surface: #1e293b;
  --surface-light: #334155;
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --text-muted: #94a3b8;
  --border: #334155;
  --border-light: #475569;
  --success: #10b981;
  --info: #3b82f6;
  --warning: #f59e0b;
  --danger: #ef4444;
}

.projects-section {
  position: relative;
  padding: 120px 0;
  overflow: hidden;
  background: var(--background);
}

/* Background */
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
  filter: blur(60px);
  opacity: 0.1;
  animation: float 8s ease-in-out infinite;
}

.shape-1 {
  width: 200px;
  height: 200px;
  background: var(--primary);
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  background: var(--secondary);
  top: 60%;
  right: 10%;
  animation-delay: 2s;
}

.shape-3 {
  width: 180px;
  height: 180px;
  background: var(--accent);
  bottom: 20%;
  left: 15%;
  animation-delay: 4s;
}

.shape-4 {
  width: 120px;
  height: 120px;
  background: var(--info);
  top: 30%;
  right: 20%;
  animation-delay: 6s;
}

.code-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(79, 70, 229, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(79, 70, 229, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(79, 70, 229, 0.1);
  border: 1px solid rgba(79, 70, 229, 0.2);
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
}

.badge-icon {
  font-size: 1.2rem;
}

.badge-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.section-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.text-gradient {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

/* Project Filters */
.project-filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  background: var(--surface);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border);
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  color: var(--text-secondary);
}

.filter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
  color: var(--primary-light);
  border-color: var(--primary-light);
}

.filter-btn.active {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: var(--text-primary);
  box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.4);
  border-color: transparent;
}

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.project-card-wrapper {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.project-card {
  position: relative;
  background: var(--surface);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.3);
  border-color: var(--primary-light);
}

/* Project Image */
.project-image-container {
  position: relative;
  overflow: hidden;
  height: 250px;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent, rgba(15, 23, 42, 0.9));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
}

.project-card:hover .image-overlay {
  opacity: 1;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 8px;
  text-decoration: none;
  color: var(--surface);
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.project-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.demo-link:hover { background: var(--primary); color: white; }
.github-link:hover { background: var(--surface); color: white; }
.details-link:hover { background: var(--secondary); color: white; }

.link-icon {
  width: 1rem;
  height: 1rem;
}

/* Project Badge */
.project-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  color: white;
}

.project-badge.fullstack { background: var(--primary); }
.project-badge.frontend { background: var(--secondary); }
.project-badge.backend { background: var(--accent); }
.project-badge.mobile { background: var(--info); }

/* Project Content */
.project-content {
  padding: 2rem;
}

.project-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.project-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

/* Tech Stack */
.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  background: rgba(79, 70, 229, 0.1);
  color: var(--primary-light);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid rgba(79, 70, 229, 0.2);
}

/* Project Stats */
.project-stats {
  display: flex;
  gap: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-muted);
}

.stat-icon {
  width: 1rem;
  height: 1rem;
  color: var(--text-muted);
}

/* Project Glow */
.project-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  filter: blur(20px);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.project-card:hover .project-glow {
  opacity: 0.3;
}

.glow-0 { background: linear-gradient(135deg, var(--primary), var(--primary-dark)); }
.glow-1 { background: linear-gradient(135deg, var(--secondary), var(--primary)); }
.glow-2 { background: linear-gradient(135deg, var(--accent), var(--primary)); }

/* View More */
.view-more {
  text-align: center;
}

.view-more-btn {
  background: var(--surface);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border);
  color: var(--primary);
  padding: 1rem 2rem;
}

.view-more-btn:hover {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  transform: translateY(-2px);
  border-color: transparent;
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.3s ease;
}

.view-more-btn:hover .btn-icon {
  transform: translateX(5px);
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

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-fade-in {
  animation: fadeInUp 0.6s ease-out forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }

  .section-title {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .projects-section {
    padding: 80px 0;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .project-filters {
    gap: 0.5rem;
  }

  .filter-btn {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  .project-links {
    flex-direction: column;
    gap: 0.5rem;
  }

  .project-stats {
    flex-direction: column;
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .project-content {
    padding: 1.5rem;
  }

  .project-image-container {
    height: 200px;
  }
}
</style>