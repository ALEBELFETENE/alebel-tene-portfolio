<template>
  <div class="blog-page">
    <LayoutHeader />
    <main class="main-content">
      <!-- Enhanced Animated Background -->
      <div class="blog-background">
        <div class="floating-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
          <div class="shape shape-4"></div>
        </div>
        <div class="grid-pattern"></div>
        <div class="noise-overlay"></div>
      </div>

      <div class="container">
        <!-- Enhanced Blog Header -->
        <div class="blog-header">
          <div class="header-content">
            <div class="blog-badge animate-fade-in-up">
              <span class="badge-icon">✨</span>
              <span class="badge-text">Latest Insights</span>
            </div>
            <h1 class="blog-title animate-fade-in-up" style="animation-delay: 0.2s">
              Developer <span class="text-gradient">Blog</span>
            </h1>
            <p class="blog-subtitle animate-fade-in-up" style="animation-delay: 0.3s">
              Exploring the latest in web development, design systems, and cutting-edge technologies
            </p>
            
            <!-- Enhanced Search Bar -->
            <div class="search-container animate-fade-in-up" style="animation-delay: 0.4s">
              <div class="search-input-wrapper">
                <SearchIcon class="search-icon" />
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search articles, tutorials, guides..."
                  class="search-input"
                  @input="handleSearch"
                />
                <div class="search-underline"></div>
              </div>
              <div class="search-stats">
                <span class="stats-text">
                  {{ filteredPosts.length }} of {{ posts.length }} articles
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Blog Content -->
        <div class="blog-content">
          <!-- Main Posts Section -->
          <div class="posts-section">
            <!-- Enhanced View Controls -->
            <div class="view-controls animate-fade-in-up" style="animation-delay: 0.6s">
              <div class="view-toggle">
                <button 
                  class="view-btn" 
                  :class="{ active: viewMode === 'grid' }"
                  @click="viewMode = 'grid'"
                >
                  <GridIcon class="btn-icon" />
                  Grid View
                </button>
                <button 
                  class="view-btn" 
                  :class="{ active: viewMode === 'list' }"
                  @click="viewMode = 'list'"
                >
                  <ListIcon class="btn-icon" />
                  List View
                </button>
              </div>
              
              <div class="sort-controls">
                <select v-model="sortBy" class="sort-select" @change="sortPosts">
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

            <!-- Enhanced Posts Container -->
            <div 
              class="posts-container" 
              :class="[viewMode + '-view', { 'animate-in': inView }]"
              ref="postsContainer"
            >
              <transition-group name="post-stagger" tag="div" class="posts-transition">
                <article
                  v-for="(post, index) in filteredPosts"
                  :key="post.id"
                  class="post-article"
                  :style="`--stagger-delay: ${index * 0.1}s`"
                  @click="navigateToPost(post.slug)"
                >
                  <div class="post-card group">
                    <!-- Post Image with Gradient Overlay -->
                    <div class="post-image-container">
                      <img
                        :src="post.image"
                        :alt="post.title"
                        class="post-image"
                        @error="handleImageError"
                      />
                      <div class="image-gradient"></div>
                      <div class="image-overlay">
                        <div class="read-more">
                          <span>Read Article</span>
                          <ArrowRightIcon class="arrow-icon" />
                        </div>
                      </div>
                      <div class="post-badge" :class="getCategoryClass(post.tags[0])">
                        {{ post.tags[0] }}
                      </div>
                    </div>

                    <!-- Post Content -->
                    <div class="post-content">
                      <div class="post-meta">
                        <div class="meta-left">
                          <CalendarIcon class="meta-icon" />
                          <span class="post-date">{{ formatDate(post.date) }}</span>
                          <div class="meta-separator"></div>
                          <ClockIcon class="meta-icon" />
                          <span class="post-read-time">{{ post.readTime }}</span>
                        </div>
                        <div class="post-views" v-if="post.views">
                          <EyeIcon class="meta-icon" />
                          <span>{{ formatViews(post.views) }}</span>
                        </div>
                      </div>

                      <h3 class="post-title">{{ post.title }}</h3>
                      <p class="post-excerpt">{{ post.excerpt }}</p>

                      <!-- Enhanced Author Info -->
                      <div class="author-info">
                        <div class="author-avatar-container">
                          <img 
                            :src="post.author.avatar" 
                            :alt="post.author.name"
                            class="author-avatar"
                          />
                          <div class="online-indicator"></div>
                        </div>
                        <div class="author-details">
                          <span class="author-name">{{ post.author.name }}</span>
                          <span class="author-role">{{ post.author.role }}</span>
                        </div>
                      </div>

                      <!-- Enhanced Tags -->
                      <div class="post-tags">
                        <span
                          v-for="tag in post.tags.slice(0, 3)"
                          :key="tag"
                          class="post-tag"
                          :class="getCategoryClass(tag)"
                          @click.stop="toggleCategory(tag)"
                        >
                          {{ tag }}
                        </span>
                        <span 
                          v-if="post.tags.length > 3" 
                          class="post-tag more-tag"
                        >
                          +{{ post.tags.length - 3 }}
                        </span>
                      </div>
                    </div>

                    <!-- Enhanced Glow Effects -->
                    <div class="post-glow"></div>
                    <div class="post-hover-glow"></div>
                  </div>
                </article>
              </transition-group>

              <!-- Enhanced Empty State -->
              <div v-if="filteredPosts.length === 0" class="empty-state">
                <div class="empty-icon">
                  <SearchOffIcon />
                </div>
                <h3 class="empty-title">No articles found</h3>
                <p class="empty-description">
                  Try adjusting your search terms or browse different categories
                </p>
                <button 
                  class="empty-action"
                  @click="clearFilters"
                >
                  <RefreshIcon class="btn-icon" />
                  Clear Filters
                </button>
              </div>
            </div>

            <!-- Enhanced Load More -->
            <div v-if="showLoadMore && filteredPosts.length > 0" class="load-more">
              <button 
                class="load-more-btn"
                @click="loadMorePosts"
                :disabled="loadingMore"
              >
                <span class="btn-content">
                  {{ loadingMore ? 'Loading...' : 'Load More Articles' }}
                  <ArrowDownIcon class="btn-icon" />
                </span>
              </button>
            </div>
          </div>

          <!-- Enhanced Sidebar -->
          <div class="blog-sidebar">
            <!-- Categories Widget -->
            <div class="sidebar-widget animate-fade-in-up" style="animation-delay: 0.8s">
              <div class="widget-header">
                <FolderIcon class="widget-icon" />
                <h3>Categories</h3>
              </div>
              <div class="categories-list">
                <button
                  v-for="category in categories"
                  :key="category.name"
                  :class="['category-btn', { active: selectedCategory === category.name }]"
                  @click="toggleCategory(category.name)"
                >
                  <span class="category-icon" :class="getCategoryClass(category.name)">
                    <component :is="category.icon" />
                  </span>
                  <span class="category-name">{{ category.name }}</span>
                  <span class="category-count">{{ category.count }}</span>
                </button>
              </div>
            </div>

            <!-- Popular Posts -->
            <div class="sidebar-widget animate-fade-in-up" style="animation-delay: 1s">
              <div class="widget-header">
                <TrendingUpIcon class="widget-icon" />
                <h3>Trending Now</h3>
              </div>
              <div class="popular-posts">
                <div
                  v-for="(popularPost, index) in popularPosts"
                  :key="popularPost.id"
                  class="popular-post"
                  @click="navigateToPost(popularPost.slug)"
                  :style="`--pop-delay: ${index * 0.1}s`"
                >
                  <div class="popular-post-rank">{{ index + 1 }}</div>
                  <img 
                    :src="popularPost.image" 
                    :alt="popularPost.title"
                    class="popular-post-image"
                  />
                  <div class="popular-post-content">
                    <h4 class="popular-post-title">{{ popularPost.title }}</h4>
                    <div class="popular-post-meta">
                      <span class="popular-post-date">{{ formatDate(popularPost.date) }}</span>
                      <div class="popular-post-views">
                        <EyeIcon class="views-icon" />
                        <span>{{ formatViews(popularPost.views) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Newsletter -->
            <div class="sidebar-widget newsletter-widget animate-fade-in-up" style="animation-delay: 1.2s">
              <div class="widget-header">
                <MailIcon class="widget-icon" />
                <h3>Stay Updated</h3>
              </div>
              <div class="newsletter-content">
                <p class="newsletter-text">
                  Get the latest articles on web development, design, and technology trends.
                </p>
                <div class="newsletter-form">
                  <input
                    v-model="email"
                    type="email"
                    placeholder="Enter your email"
                    class="newsletter-input"
                  />
                  <button class="newsletter-btn" @click="subscribeNewsletter">
                    <SendIcon class="btn-icon" />
                    Subscribe
                  </button>
                </div>
                <p class="newsletter-note">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <LayoutFooter />
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import LayoutHeader from '@/components/Layout/Header.vue'
import LayoutFooter from '@/components/Layout/Footer.vue'

// Enhanced SVG Icons
const SearchIcon = {
  template: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" 
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `
}

const GridIcon = {
  template: `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
      <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
    </svg>
  `
}

const ListIcon = {
  template: `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `
}

const ArrowRightIcon = {
  template: `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `
}

const CalendarIcon = {
  template: `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
      <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" stroke-width="2"/>
    </svg>
  `
}

const ClockIcon = {
  template: `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
      <path d="M12 7V12L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `
}

const EyeIcon = {
  template: `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
    </svg>
  `
}

const ArrowDownIcon = {
  template: `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `
}

const SearchOffIcon = {
  template: `
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
      <path d="M21 21L16.65 16.65M15 15L19 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M8 8L16 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `
}

const FolderIcon = {
  template: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V9C21 7.89543 20.1046 7 19 7H13L11 5H5C3.89543 5 3 5.89543 3 7Z" 
            stroke="currentColor" stroke-width="2"/>
    </svg>
  `
}

const TrendingUpIcon = {
  template: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23 6L13.5 15.5L8.5 10.5L1 18M23 6H15M23 6V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `
}

const MailIcon = {
  template: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" stroke-width="2"/>
      <path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2"/>
    </svg>
  `
}

const RefreshIcon = {
  template: `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23 4V10H17M1 20V14H7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3.51 9C4.01717 7.56678 4.87913 6.2854 6.01547 5.27542C7.1518 4.26543 8.52547 3.55976 10.0083 3.22426C11.4911 2.88875 13.0348 2.93434 14.4952 3.35677C15.9556 3.77921 17.2853 4.56471 18.36 5.64L23 10M1 14L5.64 18.36C6.71475 19.4353 8.04437 20.2208 9.50481 20.6432C10.9652 21.0657 12.5089 21.1113 13.9917 20.7757C15.4745 20.4402 16.8482 19.7346 17.9845 18.7246C19.1209 17.7146 19.9828 16.4332 20.49 15" 
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `
}

const SendIcon = {
  template: `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `
}

// Category Icons
const VueIcon = { template: `<div class="icon-text">Vue</div>` }
const ReactIcon = { template: `<div class="icon-text">React</div>` }
const NodeIcon = { template: `<div class="icon-text">Node</div>` }
const CssIcon = { template: `<div class="icon-text">CSS</div>` }
const JsIcon = { template: `<div class="icon-text">JS</div>` }
const ApiIcon = { template: `<div class="icon-text">API</div>` }

export default {
  name: 'BlogView',
  components: {
    LayoutHeader,
    LayoutFooter,
    SearchIcon,
    GridIcon,
    ListIcon,
    ArrowRightIcon,
    CalendarIcon,
    ClockIcon,
    EyeIcon,
    ArrowDownIcon,
    SearchOffIcon,
    FolderIcon,
    TrendingUpIcon,
    MailIcon,
    RefreshIcon,
    SendIcon,
    VueIcon,
    ReactIcon,
    NodeIcon,
    CssIcon,
    JsIcon,
    ApiIcon
  },
  setup() {
    const router = useRouter()
    const postsContainer = ref(null)
    const inView = ref(false)
    
    const searchQuery = ref('')
    const selectedCategory = ref(null)
    const viewMode = ref('grid')
    const sortBy = ref('newest')
    const email = ref('')
    const loadingMore = ref(false)
    const showLoadMore = ref(true)

    const posts = ref([
      {
        id: 1,
        title: 'Mastering Vue 3 Composition API',
        excerpt: 'Deep dive into Vue 3 Composition API with practical examples and best practices for building scalable applications.',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
        date: '2024-01-15',
        readTime: '8 min read',
        tags: ['Vue.js', 'JavaScript', 'Frontend', 'Composition API'],
        slug: 'vue-3-composition-api',
        views: 1247,
        author: {
          name: 'Alex Johnson',
          role: 'Senior Frontend Engineer',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
        }
      },
      {
        id: 2,
        title: 'Building Scalable APIs with Node.js',
        excerpt: 'Learn how to design and build robust, scalable REST APIs using Node.js and Express with modern development practices.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
        date: '2024-01-12',
        readTime: '12 min read',
        tags: ['Node.js', 'Express', 'Backend', 'API', 'REST'],
        slug: 'nodejs-express-api',
        views: 892,
        author: {
          name: 'Sarah Chen',
          role: 'Backend Architect',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
        }
      },
      {
        id: 3,
        title: 'Modern CSS Architecture 2024',
        excerpt: 'Explore cutting-edge CSS techniques including Container Queries, Cascade Layers, and new responsive design patterns.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
        date: '2024-01-10',
        readTime: '10 min read',
        tags: ['CSS', 'Frontend', 'Design', 'Responsive'],
        slug: 'modern-css-architecture',
        views: 1563,
        author: {
          name: 'Mike Rodriguez',
          role: 'UI/UX Specialist',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
        }
      },
      {
        id: 4,
        title: 'Advanced React Patterns 2024',
        excerpt: 'Master advanced React patterns including compound components, render props, and custom hooks for complex applications.',
        image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&h=250&fit=crop',
        date: '2024-01-08',
        readTime: '14 min read',
        tags: ['React', 'JavaScript', 'Hooks', 'Frontend'],
        slug: 'advanced-react-patterns',
        views: 2105,
        author: {
          name: 'Emily Watson',
          role: 'React Expert',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
        }
      },
      {
        id: 5,
        title: 'Database Design Mastery',
        excerpt: 'Comprehensive guide to database design principles, normalization, and performance optimization for modern applications.',
        image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop',
        date: '2024-01-05',
        readTime: '15 min read',
        tags: ['Database', 'SQL', 'Backend', 'Architecture'],
        slug: 'database-design-mastery',
        views: 743,
        author: {
          name: 'David Kim',
          role: 'Database Architect',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
        }
      },
      {
        id: 6,
        title: 'TypeScript Pro Tips',
        excerpt: 'Advanced TypeScript techniques and patterns that will level up your development workflow and code quality.',
        image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop',
        date: '2024-01-03',
        readTime: '11 min read',
        tags: ['TypeScript', 'JavaScript', 'Frontend', 'Backend'],
        slug: 'typescript-pro-tips',
        views: 1342,
        author: {
          name: 'Lisa Wang',
          role: 'TypeScript Expert',
          avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=40&h=40&fit=crop&crop=face'
        }
      }
    ])

    const categories = ref([
      { name: 'Vue.js', icon: 'VueIcon', count: 12 },
      { name: 'React', icon: 'ReactIcon', count: 8 },
      { name: 'Node.js', icon: 'NodeIcon', count: 6 },
      { name: 'CSS', icon: 'CssIcon', count: 15 },
      { name: 'JavaScript', icon: 'JsIcon', count: 20 },
      { name: 'API', icon: 'ApiIcon', count: 7 }
    ])

    const popularPosts = computed(() => {
      return [...posts.value]
        .sort((a, b) => b.views - a.views)
        .slice(0, 3)
    })

    const filteredPosts = computed(() => {
      let filtered = posts.value

      // Filter by search query
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(post => 
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query))
        )
      }

      // Filter by category
      if (selectedCategory.value) {
        filtered = filtered.filter(post => 
          post.tags.includes(selectedCategory.value)
        )
      }

      // Sort posts
      switch (sortBy.value) {
        case 'newest':
          filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
          break
        case 'oldest':
          filtered.sort((a, b) => new Date(a.date) - new Date(b.date))
          break
        case 'popular':
          filtered.sort((a, b) => b.views - a.views)
          break
      }

      return filtered
    })

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    const formatViews = (views) => {
      if (views >= 1000) {
        return (views / 1000).toFixed(1) + 'k'
      }
      return views.toString()
    }

    const handleImageError = (event) => {
      event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjMUUxRTI1Ii8+CjxwYXRoIGQ9Ik0xNTAgMTAwSDI1MFYxNTBIMTUwVjEwMFoiIGZpbGw9IiMzMzM0MzgiLz4KPC9zdmc+'
    }

    const navigateToPost = (slug) => {
      router.push(`/blog/${slug}`)
    }

    const toggleCategory = (category) => {
      selectedCategory.value = selectedCategory.value === category ? null : category
    }

    const handleSearch = () => {
      // Search is handled in computed property
    }

    const sortPosts = () => {
      // Sorting is handled in computed property
    }

    const clearFilters = () => {
      searchQuery.value = ''
      selectedCategory.value = null
      sortBy.value = 'newest'
    }

    const loadMorePosts = async () => {
      loadingMore.value = true
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      loadingMore.value = false
      showLoadMore.value = false
    }

    const subscribeNewsletter = () => {
      if (email.value) {
        alert(`Subscribed with: ${email.value}`)
        email.value = ''
      }
    }

    const getCategoryClass = (tag) => {
      const categoryMap = {
        'Vue.js': 'vue',
        'React': 'react',
        'Node.js': 'node',
        'CSS': 'css',
        'JavaScript': 'js',
        'API': 'api',
        'Frontend': 'frontend',
        'Backend': 'backend',
        'Design': 'design'
      }
      return categoryMap[tag] || 'default'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          inView.value = true
        }
      })
    }, { threshold: 0.1 })

    onMounted(() => {
      if (postsContainer.value) {
        observer.observe(postsContainer.value)
      }
    })

    onUnmounted(() => {
      if (postsContainer.value) {
        observer.unobserve(postsContainer.value)
      }
    })

    return {
      postsContainer,
      inView,
      searchQuery,
      selectedCategory,
      viewMode,
      sortBy,
      email,
      loadingMore,
      showLoadMore,
      posts,
      categories,
      popularPosts,
      filteredPosts,
      formatDate,
      formatViews,
      handleImageError,
      navigateToPost,
      toggleCategory,
      handleSearch,
      sortPosts,
      clearFilters,
      loadMorePosts,
      subscribeNewsletter,
      getCategoryClass
    }
  }
}
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  color: #e2e8f0;
}

.main-content {
  flex: 1;
  padding: 80px 0;
  position: relative;
}

/* Enhanced Background */
.blog-background {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
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
  opacity: 0.15;
  animation: float 12s ease-in-out infinite;
}

.shape-1 {
  width: 300px;
  height: 300px;
  background: #6366f1;
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.shape-2 {
  width: 250px;
  height: 250px;
  background: #10b981;
  top: 60%;
  right: 10%;
  animation-delay: 4s;
}

.shape-3 {
  width: 280px;
  height: 280px;
  background: #8b5cf6;
  bottom: 20%;
  left: 15%;
  animation-delay: 8s;
}

.shape-4 {
  width: 200px;
  height: 200px;
  background: #f59e0b;
  top: 20%;
  right: 20%;
  animation-delay: 6s;
}

.grid-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
  background-size: 60px 60px;
}

.noise-overlay {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E");
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Enhanced Blog Header */
.blog-header {
  text-align: center;
  margin-bottom: 80px;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
}

.blog-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
  border: 1px solid rgba(99, 102, 241, 0.3);
  padding: 0.875rem 1.75rem;
  border-radius: 50px;
  margin-bottom: 2rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.badge-icon {
  font-size: 1.4rem;
  animation: pulse 2s ease-in-out infinite;
}

.badge-text {
  font-size: 0.95rem;
  font-weight: 600;
  color: #a5b4fc;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.blog-title {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #e2e8f0 0%, #a5b4fc 50%, #818cf8 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 6s ease infinite;
}

.text-gradient {
  background: linear-gradient(135deg, #818cf8, #c4b5fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.blog-subtitle {
  font-size: 1.375rem;
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 3rem;
  font-weight: 400;
}

/* Enhanced Search */
.search-container {
  max-width: 500px;
  margin: 0 auto;
}

.search-input-wrapper {
  position: relative;
  margin-bottom: 1rem;
}

.search-icon {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: #64748b;
}

.search-input {
  width: 100%;
  padding: 1.25rem 1.25rem 1.25rem 3.5rem;
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 16px;
  font-size: 1.125rem;
  color: #e2e8f0;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.search-input::placeholder {
  color: #64748b;
}

.search-input:focus {
  outline: none;
  border-color: #818cf8;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1), 0 8px 32px rgba(0, 0, 0, 0.2);
  background: rgba(30, 41, 59, 0.8);
}

.search-underline {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.search-input:focus + .search-underline {
  width: 100%;
}

.search-stats {
  text-align: center;
}

.stats-text {
  font-size: 0.95rem;
  color: #94a3b8;
  font-weight: 500;
}

/* Enhanced Blog Content */
.blog-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 60px;
  align-items: start;
}

/* Enhanced Posts Section */
.posts-section {
  space-y: 2rem;
}

/* Enhanced View Controls */
.view-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.view-toggle {
  display: flex;
  gap: 0.5rem;
  background: rgba(15, 23, 42, 0.8);
  border-radius: 12px;
  padding: 0.375rem;
}

.view-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #64748b;
  font-size: 0.95rem;
  font-weight: 500;
}

.view-btn.active {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.btn-icon {
  width: 1.125rem;
  height: 1.125rem;
}

.sort-select {
  padding: 0.75rem 1rem;
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  color: #e2e8f0;
  cursor: pointer;
  font-size: 0.95rem;
}

.sort-select:focus {
  outline: none;
  border-color: #818cf8;
}

/* Enhanced Posts Container */
.posts-container {
  transition: all 0.3s ease;
}

.posts-container.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2rem;
}

.posts-container.list-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.posts-container.list-view .post-article {
  max-width: 100%;
}

.posts-container.animate-in .post-article {
  animation: fadeInUp 0.6s ease-out forwards;
  animation-delay: calc(var(--stagger-delay, 0) + 0.2s);
}

.posts-transition {
  display: contents;
}

.post-stagger-enter-active {
  transition: all 0.6s ease;
  transition-delay: calc(var(--stagger-delay, 0) + 0.2s);
}

.post-stagger-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

/* Enhanced Post Article */
.post-article {
  cursor: pointer;
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
  animation-delay: calc(var(--stagger-delay, 0) + 0.2s);
}

.post-card {
  position: relative;
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.6));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.4s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.post-card:hover {
  transform: translateY(-8px);
  border-color: rgba(99, 102, 241, 0.4);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(99, 102, 241, 0.1);
}

/* Enhanced Post Image */
.post-image-container {
  position: relative;
  overflow: hidden;
  height: 220px;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.image-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent, rgba(15, 23, 42, 0.9));
  opacity: 0.6;
}

.post-card:hover .post-image {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.4s ease;
}

.post-card:hover .image-overlay {
  opacity: 1;
}

.read-more {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  font-weight: 600;
  transform: translateY(20px);
  transition: transform 0.4s ease;
  background: rgba(99, 102, 241, 0.9);
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  backdrop-filter: blur(10px);
}

.post-card:hover .read-more {
  transform: translateY(0);
}

.arrow-icon {
  width: 1.125rem;
  height: 1.125rem;
}

.post-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.post-badge.vue { background: linear-gradient(135deg, #41b883, #34495e); }
.post-badge.react { background: linear-gradient(135deg, #61dafb, #282c34); }
.post-badge.node { background: linear-gradient(135deg, #339933, #333333); }
.post-badge.css { background: linear-gradient(135deg, #1572b6, #33a9dc); }
.post-badge.js { background: linear-gradient(135deg, #f7df1e, #000000); }
.post-badge.api { background: linear-gradient(135deg, #651fff, #7c4dff); }
.post-badge.frontend { background: linear-gradient(135deg, #ff6b6b, #ee5a24); }
.post-badge.backend { background: linear-gradient(135deg, #4834d4, #686de0); }
.post-badge.design { background: linear-gradient(135deg, #6c5ce7, #a29bfe); }
.post-badge.default { background: linear-gradient(135deg, #6366f1, #8b5cf6); }

/* Enhanced Post Content */
.post-content {
  padding: 2rem;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  font-size: 0.875rem;
  color: #94a3b8;
}

.meta-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.meta-icon {
  width: 1rem;
  height: 1rem;
}

.meta-separator {
  width: 4px;
  height: 4px;
  background: #475569;
  border-radius: 50%;
}

.post-views {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  background: rgba(99, 102, 241, 0.1);
  padding: 0.375rem 0.75rem;
  border-radius: 8px;
}

.post-title {
  font-size: 1.375rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #f1f5f9;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-excerpt {
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Enhanced Author Info */
.author-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(30, 41, 59, 0.6);
  border-radius: 16px;
  border: 1px solid rgba(99, 102, 241, 0.1);
}

.author-avatar-container {
  position: relative;
}

.author-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #6366f1;
}

.online-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: #10b981;
  border: 2px solid #1e293b;
  border-radius: 50%;
}

.author-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.author-name {
  font-weight: 600;
  color: #f1f5f9;
  font-size: 0.95rem;
}

.author-role {
  font-size: 0.875rem;
  color: #64748b;
}

/* Enhanced Tags */
.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.post-tag {
  background: rgba(99, 102, 241, 0.1);
  color: #a5b4fc;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  border: 1px solid rgba(99, 102, 241, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
}

.post-tag:hover {
  background: #6366f1;
  color: white;
  transform: translateY(-1px);
}

.post-tag.vue { background: rgba(65, 184, 131, 0.1); color: #41b883; border-color: rgba(65, 184, 131, 0.3); }
.post-tag.vue:hover { background: #41b883; color: white; }
.post-tag.react { background: rgba(97, 218, 251, 0.1); color: #61dafb; border-color: rgba(97, 218, 251, 0.3); }
.post-tag.react:hover { background: #61dafb; color: #282c34; }
.post-tag.node { background: rgba(51, 153, 51, 0.1); color: #339933; border-color: rgba(51, 153, 51, 0.3); }
.post-tag.node:hover { background: #339933; color: white; }
.post-tag.css { background: rgba(21, 114, 182, 0.1); color: #1572b6; border-color: rgba(21, 114, 182, 0.3); }
.post-tag.css:hover { background: #1572b6; color: white; }
.post-tag.js { background: rgba(247, 223, 30, 0.1); color: #f7df1e; border-color: rgba(247, 223, 30, 0.3); }
.post-tag.js:hover { background: #f7df1e; color: #000; }
.post-tag.api { background: rgba(101, 31, 255, 0.1); color: #7c4dff; border-color: rgba(101, 31, 255, 0.3); }
.post-tag.api:hover { background: #7c4dff; color: white; }

.more-tag {
  background: rgba(148, 163, 184, 0.1);
  color: #94a3b8;
  border-color: rgba(148, 163, 184, 0.2);
}

.more-tag:hover {
  background: #94a3b8;
  color: #1e293b;
}

/* Enhanced Glow Effects */
.post-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 24px;
  filter: blur(25px);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
}

.post-hover-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  height: 80%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
}

.post-card:hover .post-glow {
  opacity: 0.15;
}

.post-card:hover .post-hover-glow {
  opacity: 0.3;
}

/* Enhanced Empty State */
.empty-state {
  text-align: center;
  padding: 5rem 2rem;
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  width: 6rem;
  height: 6rem;
  color: #475569;
  margin: 0 auto 2rem;
  opacity: 0.5;
}

.empty-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 1rem;
}

.empty-description {
  color: #94a3b8;
  margin-bottom: 2.5rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.125rem;
}

.empty-action {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: none;
  font-weight: 600;
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
}

.empty-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
}

/* Enhanced Load More */
.load-more {
  text-align: center;
  padding: 3rem 0 1rem;
}

.load-more-btn {
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(99, 102, 241, 0.3);
  color: #a5b4fc;
  padding: 1.25rem 2.5rem;
  border-radius: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
}

.load-more-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
  border-color: transparent;
}

.load-more-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Enhanced Sidebar */
.blog-sidebar {
  space-y: 2rem;
}

.sidebar-widget {
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.widget-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(99, 102, 241, 0.1);
  background: rgba(15, 23, 42, 0.4);
}

.widget-header h3 {
  margin: 0;
  color: #f1f5f9;
  font-size: 1.25rem;
  font-weight: 700;
}

.widget-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #a5b4fc;
}

/* Enhanced Categories */
.categories-list {
  padding: 1rem;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem 1.25rem;
  background: none;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #94a3b8;
  margin-bottom: 0.5rem;
}

.category-btn:hover {
  background: rgba(99, 102, 241, 0.1);
  color: #a5b4fc;
  transform: translateX(4px);
}

.category-btn.active {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
  color: #a5b4fc;
  border: 1px solid rgba(99, 102, 241, 0.3);
}

.category-icon {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  color: white;
  border-radius: 10px;
  flex-shrink: 0;
}

.icon-text {
  font-weight: 700;
  font-size: 0.75rem;
}

.category-icon.vue { background: linear-gradient(135deg, #41b883, #34495e); }
.category-icon.react { background: linear-gradient(135deg, #61dafb, #282c34); }
.category-icon.node { background: linear-gradient(135deg, #339933, #333333); }
.category-icon.css { background: linear-gradient(135deg, #1572b6, #33a9dc); }
.category-icon.js { background: linear-gradient(135deg, #f7df1e, #000000); }
.category-icon.api { background: linear-gradient(135deg, #651fff, #7c4dff); }

.category-name {
  flex: 1;
  text-align: left;
  font-weight: 600;
  font-size: 0.95rem;
}

.category-count {
  background: rgba(99, 102, 241, 0.1);
  padding: 0.375rem 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 700;
  color: #a5b4fc;
}

.category-btn.active .category-count {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

/* Enhanced Popular Posts */
.popular-posts {
  padding: 1rem;
}

.popular-post {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 0.75rem;
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid transparent;
  animation: fadeInUp 0.6s ease-out forwards;
  animation-delay: calc(var(--pop-delay, 0) + 0.3s);
  opacity: 0;
}

.popular-post:hover {
  background: rgba(99, 102, 241, 0.1);
  border-color: rgba(99, 102, 241, 0.3);
  transform: translateX(4px);
}

.popular-post-rank {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.popular-post-image {
  width: 4rem;
  height: 4rem;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;
}

.popular-post-content {
  flex: 1;
  min-width: 0;
}

.popular-post-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #f1f5f9;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.popular-post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #64748b;
}

.popular-post-views {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.views-icon {
  width: 1rem;
  height: 1rem;
}

/* Enhanced Newsletter */
.newsletter-widget {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(139, 92, 246, 0.9));
  color: white;
  position: relative;
  overflow: hidden;
}

.newsletter-widget::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: rotate 10s linear infinite;
}

.newsletter-widget .widget-header {
  border-bottom-color: rgba(255, 255, 255, 0.2);
  background: transparent;
  position: relative;
  z-index: 1;
}

.newsletter-widget .widget-header h3 {
  color: white;
}

.newsletter-widget .widget-icon {
  color: white;
}

.newsletter-content {
  padding: 2rem;
  position: relative;
  z-index: 1;
}

.newsletter-text {
  margin-bottom: 1.5rem;
  line-height: 1.6;
  opacity: 0.9;
  font-size: 1.05rem;
}

.newsletter-form {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.newsletter-input {
  flex: 1;
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 12px;
  color: #1e293b;
  font-size: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.newsletter-input::placeholder {
  color: #64748b;
}

.newsletter-input:focus {
  outline: none;
  background: white;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.newsletter-btn {
  background: white;
  color: #6366f1;
  border: none;
  font-weight: 700;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.newsletter-btn:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.newsletter-note {
  font-size: 0.875rem;
  opacity: 0.8;
  text-align: center;
  font-style: italic;
}

/* Enhanced Animations */
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
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(120deg);
  }
  66% {
    transform: translateY(10px) rotate(240deg);
  }
}

@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-fade-in {
  animation: fadeInUp 0.6s ease-out forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

/* Enhanced Responsive Design */
@media (max-width: 1200px) {
  .blog-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .blog-sidebar {
    order: -1;
  }

  .blog-title {
    font-size: 3.5rem;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 60px 0;
  }

  .container {
    padding: 0 1.5rem;
  }

  .blog-title {
    font-size: 2.75rem;
  }

  .blog-subtitle {
    font-size: 1.25rem;
  }

  .view-controls {
    flex-direction: column;
    gap: 1.5rem;
    align-items: stretch;
  }

  .posts-container.grid-view {
    grid-template-columns: 1fr;
  }

  .post-content {
    padding: 1.5rem;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .popular-post {
    flex-direction: column;
    text-align: center;
  }

  .popular-post-rank {
    align-self: center;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .blog-title {
    font-size: 2.25rem;
  }

  .blog-badge {
    padding: 0.75rem 1.25rem;
  }

  .search-input {
    padding: 1rem 1rem 1rem 3rem;
    font-size: 1rem;
  }

  .post-meta {
    flex-direction: column;
    align-items: start;
    gap: 0.75rem;
  }

  .author-info {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .categories-list {
    padding: 0.5rem;
  }
}
</style>