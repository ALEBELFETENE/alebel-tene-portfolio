<template>
  <LayoutHeader />
  <section class="about-section" id="about" ref="aboutSection">
    <!-- Animated Background -->
    <div class="about-background">
      <div class="floating-elements">
        <div class="element element-1"></div>
        <div class="element element-2"></div>
        <div class="element element-3"></div>
        <div class="element element-4"></div>
      </div>
      <div class="grid-pattern"></div>
    </div>

    <div class="container">
      <!-- Section Header -->
      <div class="section-header" ref="sectionHeader">
        <div class="section-badge animate-fade-in">
          <span class="badge-icon">🎯</span>
          <span class="badge-text">My Journey</span>
        </div>
        <h2 class="section-title animate-fade-in-up" style="animation-delay: 0.2s">
          About <span class="text-gradient">Me</span>
        </h2>
        <p class="section-subtitle animate-fade-in-up" style="animation-delay: 0.4s">
          Passionate developer crafting digital experiences that make a difference
        </p>
      </div>

      <div class="about-content">
        <!-- Image Column -->
        <div class="image-column" ref="imageColumn">
          <div class="image-container animate-fade-in-right" style="animation-delay: 0.6s">
            <div class="image-wrapper">
              <img 
                :src="image" 
                alt="Your Name - Developer" 
                class="about-image"
              />
              <div class="image-glow"></div>
              
              <!-- Floating Elements Around Image -->
              <div class="floating-elements">
                <div class="floating-element element-1">
                  <CodeIcon class="element-icon" />
                </div>
                <div class="floating-element element-2">
                  <DesignIcon class="element-icon" />
                </div>
                <div class="floating-element element-3">
                  <RocketIcon class="element-icon" />
                </div>
              </div>
              
              <!-- Experience Badge -->
              <div class="experience-badge">
                <div class="badge-content">
                  <span class="years">{{ yearsExperience }}+</span>
                  <span class="label">Years Experience</span>
                </div>
                <div class="badge-glow"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Content Column -->
        <div class="content-column" ref="contentColumn">
          <!-- Text Content -->
          <div class="about-text animate-fade-in-up" style="animation-delay: 0.8s">
            <div v-for="(paragraph, index) in paragraphs" 
                 :key="index" 
                 class="paragraph-wrapper"
                 :style="`animation-delay: ${0.8 + index * 0.2}s`">
              <p class="about-paragraph">
                {{ paragraph }}
              </p>
            </div>
          </div>

          <!-- Skills Progress -->
          <div class="skills-section animate-fade-in-up" style="animation-delay: 1.2s">
            <h3 class="skills-title">My Expertise</h3>
            <div class="skills-grid">
              <div v-for="skill in skills" 
                   :key="skill.name" 
                   class="skill-item"
                   @mouseenter="hoverSkill = skill.name"
                   @mouseleave="hoverSkill = null">
                <div class="skill-header">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-percentage">{{ skill.percentage }}%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" 
                       :style="`width: ${skill.percentage}%`"
                       :class="{ 'animate-grow': inView }"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Call to Action -->
          <div class="cta-section animate-fade-in-up" style="animation-delay: 1.6s">
            <UiButton 
              size="large" 
              class="cta-button group"
              @click="$emit('contact')"
            >
              <span class="btn-content">
                <EmailIcon class="btn-icon" />
                Let's Work Together
              </span>
            </UiButton>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="stats-section" ref="statsSection">
        <div class="stats-container animate-fade-in-up" style="animation-delay: 1.8s">
          <div class="stats-grid">
            <div v-for="(stat, index) in stats" 
                 :key="stat.label" 
                 class="stat-card"
                 :style="`animation-delay: ${2 + index * 0.1}s`">
              <div class="stat-icon-wrapper">
                <div class="stat-icon">
                  <component :is="stat.icon" />
                </div>
                <div class="stat-glow"></div>
              </div>
              <div class="stat-content">
                <div class="stat-number" ref="statNumbers">
                  {{ inView ? stat.number : '0' }}+
                </div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
              <div class="stat-decoration"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <LayoutFooter />
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import UiButton from '@/components/ui/Button.vue'
import LayoutHeader from '@/components/Layout/Header.vue'
import LayoutFooter from '@/components/Layout/Footer.vue'

// Import your photo from assets
import myPhoto from '@/assets/aaa.jpg'

// SVG Icons
const UserIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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

const DesignIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  `
}

const RocketIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  `
}

const EmailIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  `
}

const ProjectIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  `
}

const ExperienceIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
    </svg>
  `
}

const ClientIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  `
}

const TechIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  `
}

export default {
  name: 'PortfolioAbout',
  components: {
    LayoutHeader,
    LayoutFooter,
    UiButton,
    UserIcon,
    CodeIcon,
    DesignIcon,
    RocketIcon,
    EmailIcon,
    ProjectIcon,
    ExperienceIcon,
    ClientIcon,
    TechIcon
  },
  props: {
    paragraphs: {
      type: Array,
      default: () => [
        'I am a passionate full-stack developer with over 5 years of experience building web applications. I specialize in Vue.js, Node.js, and modern JavaScript frameworks.',
        'My journey in web development started when I built my first website in college. Since then, I have worked with various startups and established companies, delivering high-quality solutions.',
        'When I am not coding, I enjoy contributing to open-source projects, writing technical blogs, and exploring new technologies.'
      ]
    },
    stats: {
      type: Array,
      default: () => [
        { number: '5', label: 'Projects Completed', icon: 'ProjectIcon' },
        { number: '5', label: 'Years Experience', icon: 'ExperienceIcon' },
        { number: '30', label: 'Happy Clients', icon: 'ClientIcon' },
        { number: '15', label: 'Technologies', icon: 'TechIcon' }
      ]
    }
  },
  emits: ['contact'],
  setup(props) {
    const aboutSection = ref(null)
    const sectionHeader = ref(null)
    const imageColumn = ref(null)
    const contentColumn = ref(null)
    const statsSection = ref(null)
    const statNumbers = ref([])
    const inView = ref(false)
    const hoverSkill = ref(null)

    // Use the imported image directly
    const image = ref(myPhoto)

    const skills = ref([
      { name: 'Vue.js', percentage: 90 },
      { name: 'React', percentage: 85 },
      { name: 'Node.js', percentage: 88 },
      { name: 'TypeScript', percentage: 80 },
      { name: 'Python', percentage: 75 },
      { name: 'UI/UX Design', percentage: 70 }
    ])

    const yearsExperience = ref(5)

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          inView.value = true
          startNumberAnimation()
        }
      })
    }, { threshold: 0.3 })

    const startNumberAnimation = () => {
      statNumbers.value.forEach((element, index) => {
        if (element) {
          const targetNumber = parseInt(props.stats[index].number)
          animateNumber(element, targetNumber, 2000)
        }
      })
    }

    const animateNumber = (element, target, duration) => {
      let start = 0
      const increment = target / (duration / 16)
      
      const timer = setInterval(() => {
        start += increment
        if (start >= target) {
          element.textContent = target + '+'
          clearInterval(timer)
        } else {
          element.textContent = Math.floor(start) + '+'
        }
      }, 16)
    }

    onMounted(() => {
      if (aboutSection.value) {
        observer.observe(aboutSection.value)
      }
    })

    onUnmounted(() => {
      if (aboutSection.value) {
        observer.unobserve(aboutSection.value)
      }
    })

    return {
      aboutSection,
      sectionHeader,
      imageColumn,
      contentColumn,
      statsSection,
      statNumbers,
      inView,
      hoverSkill,
      skills,
      yearsExperience,
      image
    }
  }
}
</script>

<style scoped>
.about-section {
  position: relative;
  padding: 120px 0;
  overflow: hidden;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  color: #f8fafc;
}

/* Background */
.about-background {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
}

.element {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.1;
  animation: float 8s ease-in-out infinite;
}

.element-1 {
  width: 300px;
  height: 300px;
  background: #6366f1;
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.element-2 {
  width: 200px;
  height: 200px;
  background: #10b981;
  bottom: 20%;
  right: 10%;
  animation-delay: 2s;
}

.element-3 {
  width: 150px;
  height: 150px;
  background: #8b5cf6;
  top: 50%;
  left: 80%;
  animation-delay: 4s;
}

.element-4 {
  width: 250px;
  height: 250px;
  background: #ec4899;
  bottom: 10%;
  left: 60%;
  animation-delay: 6s;
}

.grid-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
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
  background: rgba(99, 102, 241, 0.2);
  border: 1px solid rgba(99, 102, 241, 0.5);
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.2);
}

.badge-icon {
  font-size: 1.2rem;
}

.badge-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: #c7d2fe;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.section-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #f8fafc 0%, #c7d2fe 50%, #a5b4fc 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 4s ease infinite;
}

.text-gradient {
  background: linear-gradient(135deg, #a5b4fc, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 1.25rem;
  color: #cbd5e1;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* About Content */
.about-content {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 80px;
  align-items: start;
  margin-bottom: 80px;
}

/* Image Column */
.image-column {
  display: flex;
  justify-content: center;
}

.image-container {
  position: relative;
}

.image-wrapper {
  position: relative;
  width: 400px;
  height: 500px;
}

.about-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  position: relative;
  z-index: 1;
  border: 2px solid rgba(99, 102, 241, 0.3);
  box-shadow: 0 25px 50px -12px rgba(99, 102, 241, 0.4);
  transition: all 0.3s ease;
}

.about-image:hover {
  transform: scale(1.02);
  box-shadow: 0 35px 60px -12px rgba(99, 102, 241, 0.6);
}

.image-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
  height: 520px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 30px;
  filter: blur(20px);
  opacity: 0.3;
  z-index: 0;
  animation: pulse-glow 2s ease-in-out infinite alternate;
}

/* Floating Elements Around Image */
.floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.floating-element {
  position: absolute;
  width: 60px;
  height: 60px;
  background: rgba(99, 102, 241, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4);
  animation: float 6s ease-in-out infinite;
  z-index: 3;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.element-1 {
  top: -20px;
  right: -20px;
  animation-delay: 0s;
}

.element-2 {
  bottom: 40px;
  left: -30px;
  animation-delay: 2s;
}

.element-3 {
  bottom: -20px;
  right: 40px;
  animation-delay: 4s;
}

.element-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #f8fafc;
}

/* Experience Badge */
.experience-badge {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  padding: 1rem 2rem;
  border-radius: 50px;
  color: #f8fafc;
  z-index: 4;
  box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.badge-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  position: relative;
  z-index: 2;
}

.years {
  font-size: 1.5rem;
  font-weight: 800;
}

.label {
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 50px;
  filter: blur(10px);
  opacity: 0.5;
  z-index: 1;
}

/* Content Column */
.content-column {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* Text Content */
.about-text {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.paragraph-wrapper {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.about-paragraph {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #e2e8f0;
  padding: 1.5rem;
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 20px;
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.5);
  transition: all 0.3s ease;
}

.about-paragraph:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px -10px rgba(99, 102, 241, 0.3);
  border-color: rgba(99, 102, 241, 0.5);
  background: rgba(30, 41, 59, 0.9);
}

/* Skills Section */
.skills-section {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.5);
  transition: all 0.3s ease;
}

.skills-section:hover {
  border-color: rgba(99, 102, 241, 0.4);
  box-shadow: 0 15px 30px -5px rgba(99, 102, 241, 0.3);
}

.skills-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #f8fafc;
  text-align: center;
}

.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.skill-item {
  cursor: pointer;
  transition: all 0.3s ease;
}

.skill-item:hover {
  transform: translateX(10px);
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.skill-name {
  font-weight: 600;
  color: #c7d2fe;
}

.skill-percentage {
  font-size: 0.875rem;
  color: #94a3b8;
  font-weight: 600;
}

.skill-bar {
  height: 8px;
  background: rgba(99, 102, 241, 0.1);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.skill-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.skill-item:hover .skill-bar::before {
  opacity: 1;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  border-radius: 10px;
  transition: width 2s ease-in-out;
  transform-origin: left;
  position: relative;
  overflow: hidden;
}

.skill-progress::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: translateX(-100%);
  animation: shimmer 2s infinite;
}

.animate-grow {
  animation: growWidth 2s ease-out forwards;
}

/* CTA Section */
.cta-section {
  text-align: center;
}

.cta-button {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: none;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  color: #f8fafc;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4);
  position: relative;
  overflow: hidden;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.cta-button:hover::before {
  left: 100%;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px -5px rgba(99, 102, 241, 0.6);
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Stats Section */
.stats-section {
  margin-top: 4rem;
}

.stats-container {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.5);
  transition: all 0.3s ease;
}

.stats-container:hover {
  border-color: rgba(99, 102, 241, 0.4);
  box-shadow: 0 25px 50px -10px rgba(99, 102, 241, 0.3);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.stat-card {
  position: relative;
  text-align: center;
  padding: 2rem 1rem;
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transition: all 0.3s ease;
  border-radius: 16px;
}

.stat-card:hover {
  transform: translateY(-5px);
  background: rgba(99, 102, 241, 0.1);
}

.stat-icon-wrapper {
  position: relative;
  display: inline-flex;
  margin-bottom: 1rem;
}

.stat-icon {
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f8fafc;
  position: relative;
  z-index: 2;
  box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4);
}

.stat-icon svg {
  width: 2rem;
  height: 2rem;
}

.stat-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 5rem;
  height: 5rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 50%;
  filter: blur(15px);
  opacity: 0.3;
  animation: pulse 2s ease-in-out infinite;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #f8fafc;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #cbd5e1;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.stat-decoration {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 3px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.stat-card:hover .stat-decoration {
  width: 50px;
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

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
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

@keyframes growWidth {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@keyframes pulse-glow {
  0% {
    opacity: 0.3;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(1.05);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.5;
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-fade-in {
  animation: fadeInUp 0.6s ease-out forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.animate-fade-in-right {
  animation: fadeInRight 0.6s ease-out forwards;
  opacity: 0;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 60px;
  }

  .section-title {
    font-size: 3rem;
  }

  .image-wrapper {
    width: 350px;
    height: 450px;
  }

  .image-glow {
    width: 370px;
    height: 470px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .about-section {
    padding: 80px 0;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .image-wrapper {
    width: 300px;
    height: 400px;
  }

  .image-glow {
    width: 320px;
    height: 420px;
  }

  .floating-element {
    display: none;
  }

  .stats-container {
    padding: 2rem;
  }

  .about-paragraph {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .image-wrapper {
    width: 280px;
    height: 350px;
  }

  .image-glow {
    width: 300px;
    height: 370px;
  }

  .experience-badge {
    padding: 0.75rem 1.5rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-card {
    padding: 1.5rem 1rem;
  }
}
</style>