<template>
  <div class="project-detail">
    <LayoutHeader />
    <main class="main-content">
      <div class="container" v-if="project">
        <div class="project-header">
          <UiButton variant="secondary" @click="$router.back()" class="back-btn">
            ← Back to Projects
          </UiButton>
          <h1 class="project-title">{{ project.title }}</h1>
          <p class="project-subtitle">{{ project.subtitle }}</p>
        </div>

        <div class="project-content">
          <div class="project-main">
            <img 
              :src="project.image" 
              :alt="project.title"
              class="project-hero-image"
              @error="handleImageError"
            />
            
            <div class="project-description">
              <h2>About the Project</h2>
              <p>{{ project.fullDescription }}</p>
            </div>

            <div class="project-features">
              <h2>Key Features</h2>
              <ul>
                <li v-for="feature in project.features" :key="feature">
                  {{ feature }}
                </li>
              </ul>
            </div>

            <div class="project-technologies">
              <h2>Technologies Used</h2>
              <div class="tech-tags">
                <span 
                  v-for="tech in project.technologies" 
                  :key="tech"
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>

          <div class="project-sidebar">
            <UiCard class="project-info-card">
              <template #header>
                <h3>Project Information</h3>
              </template>
              
              <div class="info-item">
                <strong>Category:</strong>
                <span>{{ project.category }}</span>
              </div>
              
              <div class="info-item">
                <strong>Timeline:</strong>
                <span>{{ project.timeline }}</span>
              </div>
              
              <div class="info-item">
                <strong>Status:</strong>
                <span :class="['status', project.status]">{{ project.status }}</span>
              </div>

              <div class="project-links">
                <a 
                  v-if="project.demoUrl"
                  :href="project.demoUrl"
                  target="_blank"
                  class="project-link demo"
                >
                  <UiButton>Live Demo</UiButton>
                </a>
                <a 
                  v-if="project.githubUrl"
                  :href="project.githubUrl"
                  target="_blank"
                  class="project-link github"
                >
                  <UiButton variant="secondary">View Code</UiButton>
                </a>
              </div>
            </UiCard>

            <UiCard class="project-gallery" v-if="project.gallery && project.gallery.length">
              <template #header>
                <h3>Project Gallery</h3>
              </template>
              <div class="gallery-grid">
                <img 
                  v-for="(image, index) in project.gallery" 
                  :key="index"
                  :src="image"
                  :alt="`${project.title} screenshot ${index + 1}`"
                  class="gallery-image"
                  @click="openGallery(index)"
                />
              </div>
            </UiCard>
          </div>
        </div>
      </div>

      <div v-else class="container">
        <div class="loading">
          <p>Loading project...</p>
        </div>
      </div>
    </main>
    <LayoutFooter />

    <UiModal 
      v-if="showGallery"
      :show="showGallery"
      title="Project Gallery"
      size="xlarge"
      @update:show="showGallery = false"
    >
      <div class="gallery-modal">
        <img 
          :src="currentGalleryImage" 
          :alt="`${project.title} screenshot`"
          class="modal-image"
        />
        <div class="gallery-controls">
          <UiButton @click="prevImage" :disabled="currentImageIndex === 0">
            Previous
          </UiButton>
          <span class="gallery-counter">
            {{ currentImageIndex + 1 }} / {{ project.gallery.length }}
          </span>
          <UiButton @click="nextImage" :disabled="currentImageIndex === project.gallery.length - 1">
            Next
          </UiButton>
        </div>
      </div>
    </UiModal>
  </div>
</template>

<script>
import LayoutHeader from '@/components/layout/Header.vue'
import LayoutFooter from '@/components/layout/Footer.vue'
import UiCard from '@/components/ui/Card.vue'
import UiButton from '@/components/ui/Button.vue'
import UiModal from '@/components/ui/Modal.vue'

export default {
  name: 'ProjectDetailView',
  components: {
    LayoutHeader,
    LayoutFooter,
    UiCard,
    UiButton,
    UiModal
  },
  data() {
    return {
      project: null,
      showGallery: false,
      currentImageIndex: 0
    }
  },
  computed: {
    currentGalleryImage() {
      return this.project?.gallery?.[this.currentImageIndex]
    }
  },
  async mounted() {
    await this.fetchProject()
  },
  methods: {
    async fetchProject() {
      const projectId = this.$route.params.id
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data - in real app, fetch from API
      this.project = {
        id: projectId,
        title: 'E-Commerce Platform',
        subtitle: 'A full-stack e-commerce solution',
        image: '/api/placeholder/800/400',
        category: 'Web Application',
        timeline: '3 months',
        status: 'completed',
        fullDescription: 'This is a comprehensive e-commerce platform built with modern web technologies. It includes user authentication, product catalog, shopping cart, payment processing, and admin dashboard. The application is fully responsive and optimized for performance.',
        features: [
          'User authentication and authorization',
          'Product catalog with search and filtering',
          'Shopping cart and wishlist functionality',
          'Secure payment processing with Stripe',
          'Admin dashboard for inventory management',
          'Order tracking and management',
          'Email notifications',
          'Responsive design for all devices'
        ],
        technologies: ['Vue.js', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'JWT', 'Redis'],
        demoUrl: 'https://demo.example.com',
        githubUrl: 'https://github.com/example/ecommerce',
        gallery: [
          '/api/placeholder/600/400',
          '/api/placeholder/600/400',
          '/api/placeholder/600/400'
        ]
      }
    },
    handleImageError(event) {
      event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMDAgMTUwSDUwMFYyNTBIMzAwVjE1MFoiIGZpbGw9IiNEOEU5RkIiLz4KPHN2Zz4K'
    },
    openGallery(index) {
      this.currentImageIndex = index
      this.showGallery = true
    },
    prevImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--
      }
    },
    nextImage() {
      if (this.currentImageIndex < this.project.gallery.length - 1) {
        this.currentImageIndex++
      }
    }
  }
}
</script>

<style scoped>
.project-detail {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 40px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.back-btn {
  margin-bottom: 20px;
}

.project-header {
  text-align: center;
  margin-bottom: 60px;
}

.project-title {
  font-size: 3rem;
  margin-bottom: 16px;
  color: var(--project-title, #374151);
}

.project-subtitle {
  font-size: 1.25rem;
  color: var(--project-subtitle, #6b7280);
  max-width: 600px;
  margin: 0 auto;
}

.project-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 60px;
  align-items: start;
}

.project-main {
  space-y: 40px;
}

.project-hero-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.project-description h2,
.project-features h2,
.project-technologies h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--section-heading, #374151);
}

.project-description p {
  line-height: 1.7;
  color: var(--project-text, #6b7280);
  font-size: 1.1rem;
}

.project-features ul {
  list-style: none;
  padding: 0;
}

.project-features li {
  padding: 12px 0;
  border-bottom: 1px solid var(--feature-border, #e5e7eb);
  color: var(--feature-text, #6b7280);
  position: relative;
  padding-left: 24px;
}

.project-features li:before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tech-tag {
  background-color: var(--tech-tag-bg, #dbeafe);
  color: var(--tech-tag, #1e40af);
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
}

.project-sidebar {
  space-y: 30px;
}

.info-item {
  display: flex;
  justify-content: between;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--info-border, #e5e7eb);
}

.info-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: capitalize;
}

.status.completed {
  background-color: #d1fae5;
  color: #065f46;
}

.status.in-progress {
  background-color: #fef3c7;
  color: #92400e;
}

.status.planned {
  background-color: #e0e7ff;
  color: #3730a3;
}

.project-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
}

.project-link {
  text-decoration: none;
}

.gallery-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.gallery-image {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.gallery-image:hover {
  transform: scale(1.05);
}

.gallery-modal {
  text-align: center;
}

.modal-image {
  max-width: 100%;
  max-height: 60vh;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 20px;
}

.gallery-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.gallery-counter {
  font-weight: 500;
  color: var(--gallery-counter, #6b7280);
}

.loading {
  text-align: center;
  padding: 60px 0;
  font-size: 1.2rem;
  color: var(--loading-text, #6b7280);
}

@media (max-width: 768px) {
  .project-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .project-title {
    font-size: 2rem;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .gallery-controls {
    flex-direction: column;
    gap: 12px;
  }
}
</style>