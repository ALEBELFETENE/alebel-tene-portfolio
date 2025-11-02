<template>
  <LayoutHeader />
  <section class="skills-section" id="skills" ref="skillsSection">
      
    <!-- Animated Background -->
    <div class="skills-background">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>
      <div class="tech-grid"></div>
    </div>

    <div class="container">
      <!-- Section Header -->
      <div class="section-header" ref="sectionHeader">
        <div class="section-badge animate-fade-in">
          <span class="badge-icon">🚀</span>
          <span class="badge-text">Expertise</span>
        </div>
        <h2 class="section-title animate-fade-in-up" style="animation-delay: 0.2s">
          Skills & <span class="text-gradient">Technologies</span>
        </h2>
        <p class="section-subtitle animate-fade-in-up" style="animation-delay: 0.4s">
          Mastering modern technologies to build exceptional digital experiences
        </p>
      </div>

      <!-- Skills Navigation -->
      <div class="skills-navigation animate-fade-in-up" style="animation-delay: 0.6s" ref="skillsNav">
        <button
          v-for="category in skills"
          :key="category.name"
          class="nav-item"
          :class="{ active: activeCategory === category.name }"
          @click="setActiveCategory(category.name)"
        >
          <div class="nav-icon">
            <component :is="category.icon" />
          </div>
          <span class="nav-text">{{ category.name }}</span>
        </button>
      </div>

      <!-- Skills Content -->
      <div class="skills-content">
        <!-- Progress Bars View -->
        <div 
          class="skills-progress-view" 
          :class="{ active: viewMode === 'progress' }"
          ref="progressView"
        >
          <div class="category-content animate-fade-in-up" style="animation-delay: 0.8s">
            <div class="category-header">
              <h3 class="category-title">
                <div class="category-icon">
                  <component :is="getActiveCategory().icon" />
                </div>
                {{ getActiveCategory().name }}
              </h3>
              <div class="view-toggle">
                <button 
                  class="view-btn" 
                  :class="{ active: viewMode === 'progress' }"
                  @click="viewMode = 'progress'"
                >
                  <BarChartIcon />
                </button>
                <button 
                  class="view-btn" 
                  :class="{ active: viewMode === 'grid' }"
                  @click="viewMode = 'grid'"
                >
                  <GridIcon />
                </button>
              </div>
            </div>

            <div class="skills-list">
              <div
                v-for="(skill, index) in getActiveCategory().items"
                :key="skill.name"
                class="skill-item"
                :style="`animation-delay: ${0.8 + index * 0.1}s`"
                @mouseenter="hoveredSkill = skill.name"
                @mouseleave="hoveredSkill = null"
              >
                <div class="skill-header">
                  <div class="skill-info">
                    <div class="skill-icon">
                      <component :is="skill.icon" />
                    </div>
                    <span class="skill-name">{{ skill.name }}</span>
                  </div>
                  <span class="skill-level">{{ inView ? skill.level : 0 }}%</span>
                </div>
                <div class="skill-bar">
                  <div
                    class="skill-progress"
                    :style="`width: ${inView ? skill.level : 0}%`"
                    :class="{
                      'animate-grow': inView,
                      'hovered': hoveredSkill === skill.name
                    }"
                  ></div>
                  <div class="skill-dots">
                    <div
                      v-for="n in 10"
                      :key="n"
                      class="skill-dot"
                      :class="{ active: n * 10 <= skill.level }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Grid View -->
        <div 
          class="skills-grid-view" 
          :class="{ active: viewMode === 'grid' }"
          ref="gridView"
        >
          <div class="skills-cloud animate-fade-in" style="animation-delay: 0.8s">
            <div
              v-for="skill in getAllSkills()"
              :key="skill.name"
              class="skill-bubble"
              :style="getBubbleStyle(skill)"
              :class="`level-${Math.floor(skill.level / 25)}`"
              @mouseenter="hoveredSkill = skill.name"
              @mouseleave="hoveredSkill = null"
            >
              <div class="bubble-content">
                <div class="bubble-icon">
                  <component :is="skill.icon" />
                </div>
                <span class="bubble-name">{{ skill.name }}</span>
                <div class="bubble-level">{{ skill.level }}%</div>
              </div>
              <div class="bubble-glow"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills Summary -->
      <div class="skills-summary animate-fade-in-up" style="animation-delay: 1.2s">
        <div class="summary-stats">
          <div class="summary-stat">
            <div class="stat-number">{{ totalTechnologies }}+</div>
            <div class="stat-label">Technologies</div>
          </div>
          <div class="summary-stat">
            <div class="stat-number">{{ averageSkillLevel }}%</div>
            <div class="stat-label">Average Mastery</div>
          </div>
          <div class="summary-stat">
            <div class="stat-number">{{ yearsExperience }}+</div>
            <div class="stat-label">Years Experience</div>
          </div>
        </div>
      </div>
    </div>

  </section>
  <LayoutFooter />
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import LayoutHeader from '@/components/Layout/Header.vue'
import LayoutFooter from '@/components/Layout/Footer.vue'

// SVG Icons
const FrontendIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  `
}

const BackendIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  `
}

const ToolsIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  `
}

const BarChartIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  `
}

const GridIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  `
}

// Skill Icons
const VueIcon = { template: `<div class="skill-icon-vue">V</div>` }
const ReactIcon = { template: `<div class="skill-icon-react">R</div>` }
const JsIcon = { template: `<div class="skill-icon-js">JS</div>` }
const TsIcon = { template: `<div class="skill-icon-ts">TS</div>` }
const HtmlIcon = { template: `<div class="skill-icon-html">H</div>` }
const NodeIcon = { template: `<div class="skill-icon-node">N</div>` }
const ExpressIcon = { template: `<div class="skill-icon-express">E</div>` }
const PythonIcon = { template: `<div class="skill-icon-python">P</div>` }
const MongoIcon = { template: `<div class="skill-icon-mongo">M</div>` }
const PostgresIcon = { template: `<div class="skill-icon-postgres">PG</div>` }
const GitIcon = { template: `<div class="skill-icon-git">G</div>` }
const DockerIcon = { template: `<div class="skill-icon-docker">D</div>` }
const AwsIcon = { template: `<div class="skill-icon-aws">AWS</div>` }
const FigmaIcon = { template: `<div class="skill-icon-figma">F</div>` }
const JestIcon = { template: `<div class="skill-icon-jest">J</div>` }

export default {
  name: 'PortfolioSkills',
  components: {
    LayoutHeader,
    LayoutFooter,
    FrontendIcon,
    BackendIcon,
    ToolsIcon,
    BarChartIcon,
    GridIcon,
    VueIcon,
    ReactIcon,
    JsIcon,
    TsIcon,
    HtmlIcon,
    NodeIcon,
    ExpressIcon,
    PythonIcon,
    MongoIcon,
    PostgresIcon,
    GitIcon,
    DockerIcon,
    AwsIcon,
    FigmaIcon,
    JestIcon
  },
  setup() {
    const skillsSection = ref(null)
    const sectionHeader = ref(null)
    const skillsNav = ref(null)
    const progressView = ref(null)
    const gridView = ref(null)
    const inView = ref(false)
    const activeCategory = ref('Frontend')
    const viewMode = ref('progress')
    const hoveredSkill = ref(null)

    const skills = ref([
      {
        name: 'Frontend',
        icon: 'FrontendIcon',
        items: [
          { name: 'Vue.js', level: 90, icon: 'VueIcon' },
          { name: 'React', level: 85, icon: 'ReactIcon' },
          { name: 'JavaScript', level: 95, icon: 'JsIcon' },
          { name: 'TypeScript', level: 80, icon: 'TsIcon' },
          { name: 'HTML/CSS', level: 95, icon: 'HtmlIcon' }
        ]
      },
      {
        name: 'Backend',
        icon: 'BackendIcon',
        items: [
          { name: 'Node.js', level: 88, icon: 'NodeIcon' },
          { name: 'Express.js', level: 85, icon: 'ExpressIcon' },
          { name: 'Python', level: 75, icon: 'PythonIcon' },
          { name: 'MongoDB', level: 80, icon: 'MongoIcon' },
          { name: 'PostgreSQL', level: 70, icon: 'PostgresIcon' }
        ]
      },
      {
        name: 'Tools & Others',
        icon: 'ToolsIcon',
        items: [
          { name: 'Git', level: 90, icon: 'GitIcon' },
          { name: 'Docker', level: 70, icon: 'DockerIcon' },
          { name: 'AWS', level: 65, icon: 'AwsIcon' },
          { name: 'Figma', level: 60, icon: 'FigmaIcon' },
          { name: 'Jest', level: 75, icon: 'JestIcon' }
        ]
      }
    ])

    const totalTechnologies = computed(() => {
      return skills.value.reduce((total, category) => total + category.items.length, 0)
    })

    const averageSkillLevel = computed(() => {
      const allSkills = getAllSkills()
      const total = allSkills.reduce((sum, skill) => sum + skill.level, 0)
      return Math.round(total / allSkills.length)
    })

    const yearsExperience = ref(5)

    const getActiveCategory = () => {
      return skills.value.find(cat => cat.name === activeCategory.value) || skills.value[0]
    }

    const getAllSkills = () => {
      return skills.value.flatMap(category => category.items)
    }

    const setActiveCategory = (category) => {
      activeCategory.value = category
    }

    const getBubbleStyle = (skill) => {
      const size = 60 + (skill.level / 100) * 40
      const hue = getCategoryHue(skill)
      return {
        width: `${size}px`,
        height: `${size}px`,
        '--hue': hue,
        animationDelay: `${Math.random() * 2}s`
      }
    }

    const getCategoryHue = (skill) => {
      for (const category of skills.value) {
        if (category.items.includes(skill)) {
          if (category.name === 'Frontend') return 220
          if (category.name === 'Backend') return 160
          if (category.name === 'Tools & Others') return 30
        }
      }
      return 200
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          inView.value = true
        }
      })
    }, { threshold: 0.3 })

    onMounted(() => {
      if (skillsSection.value) {
        observer.observe(skillsSection.value)
      }
    })

    onUnmounted(() => {
      if (skillsSection.value) {
        observer.unobserve(skillsSection.value)
      }
    })

    return {
      skillsSection,
      sectionHeader,
      skillsNav,
      progressView,
      gridView,
      inView,
      activeCategory,
      viewMode,
      hoveredSkill,
      skills,
      totalTechnologies,
      averageSkillLevel,
      yearsExperience,
      getActiveCategory,
      getAllSkills,
      setActiveCategory,
      getBubbleStyle
    }
  }
}
</script>

<style scoped>
.skills-section {
  position: relative;
  padding: 120px 0;
  overflow: hidden;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #f8fafc;
}

/* Background */
.skills-background {
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
  background: #6366f1;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  background: #10b981;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 180px;
  height: 180px;
  background: #8b5cf6;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

.shape-4 {
  width: 120px;
  height: 120px;
  background: #f59e0b;
  top: 30%;
  right: 25%;
  animation-delay: 6s;
}

.tech-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
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
  background: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(99, 102, 241, 0.3);
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
  color: #818cf8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.section-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 4s ease infinite;
}

.text-gradient {
  background: linear-gradient(135deg, #818cf8, #a5b4fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 1.25rem;
  color: #94a3b8;
  max-width: 600px;
  margin: 0 auto;
}

/* Skills Navigation */
.skills-navigation {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  color: #cbd5e1;
}

.nav-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
  color: #818cf8;
  border-color: rgba(129, 140, 248, 0.3);
}

.nav-item.active {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4);
  border-color: rgba(129, 140, 248, 0.5);
}

.nav-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.nav-icon svg {
  width: 100%;
  height: 100%;
  stroke: currentColor;
}

/* Skills Content */
.skills-content {
  position: relative;
  min-height: 400px;
}

.skills-progress-view,
.skills-grid-view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
  pointer-events: none;
}

.skills-progress-view.active,
.skills-grid-view.active {
  opacity: 1;
  transform: translateY(0);
  pointer-events: all;
}

/* Progress View */
.category-content {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.3);
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.category-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #f8fafc;
}

.category-icon {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.category-icon svg {
  width: 1.5rem;
  height: 1.5rem;
  stroke: currentColor;
}

.view-toggle {
  display: flex;
  gap: 0.5rem;
  background: rgba(30, 41, 59, 0.8);
  border-radius: 50px;
  padding: 0.25rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.view-btn {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  transition: all 0.3s ease;
}

.view-btn.active {
  background: #6366f1;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.view-btn svg {
  width: 1.25rem;
  height: 1.25rem;
  stroke: currentColor;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.skill-item {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.skill-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.skill-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Skill icon colors */
.skill-icon-vue { background: #41b883; }
.skill-icon-react { background: #61dafb; color: #000; }
.skill-icon-js { background: #f7df1e; color: #000; }
.skill-icon-ts { background: #3178c6; }
.skill-icon-html { background: #e34f26; }
.skill-icon-node { background: #339933; }
.skill-icon-express { background: #000000; }
.skill-icon-python { background: #3776ab; }
.skill-icon-mongo { background: #47a248; }
.skill-icon-postgres { background: #336791; }
.skill-icon-git { background: #f05032; }
.skill-icon-docker { background: #2496ed; }
.skill-icon-aws { background: #ff9900; }
.skill-icon-figma { background: #f24e1e; }
.skill-icon-jest { background: #c21325; }

.skill-name {
  font-weight: 600;
  color: #f8fafc;
  font-size: 1.125rem;
}

.skill-level {
  font-weight: 700;
  color: #818cf8;
  font-size: 1.125rem;
}

.skill-bar {
  position: relative;
  height: 12px;
  background: rgba(15, 23, 42, 0.8);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  border-radius: 10px;
  transition: width 2s ease-in-out;
  transform-origin: left;
  position: relative;
  z-index: 2;
  box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
}

.skill-progress.hovered {
  filter: brightness(1.2);
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.7);
}

.skill-progress.animate-grow {
  animation: growWidth 2s ease-out forwards;
}

.skill-dots {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 2px;
  z-index: 1;
}

.skill-dot {
  width: 2px;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1px;
  transition: background 0.3s ease;
}

.skill-dot.active {
  background: rgba(255, 255, 255, 0.3);
}

/* Grid View */
.skills-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.skill-bubble {
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  animation: float 3s ease-in-out infinite;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}

.skill-bubble:hover {
  transform: scale(1.1) translateY(-5px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.4);
  border-color: rgba(129, 140, 248, 0.3);
}

.skill-bubble.level-0 { background: rgba(99, 102, 241, 0.2); }
.skill-bubble.level-1 { background: rgba(99, 102, 241, 0.3); }
.skill-bubble.level-2 { background: rgba(99, 102, 241, 0.4); }
.skill-bubble.level-3 { background: rgba(99, 102, 241, 0.5); }

.bubble-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  z-index: 2;
  position: relative;
}

.bubble-icon {
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.75rem;
  color: white;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.bubble-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: #f8fafc;
  text-align: center;
}

.bubble-level {
  font-size: 0.625rem;
  font-weight: 700;
  color: #818cf8;
}

.bubble-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: conic-gradient(from 0deg, #6366f1, #8b5cf6, #6366f1);
  border-radius: 50%;
  filter: blur(10px);
  opacity: 0.2;
  z-index: 1;
}

/* Skills Summary */
.skills-summary {
  margin-top: 4rem;
}

.summary-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.summary-stat {
  text-align: center;
  padding: 2rem;
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.summary-stat:hover {
  transform: translateY(-5px);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #818cf8, #a5b4fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
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

.animate-fade-in {
  animation: fadeInUp 0.6s ease-out forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .section-title {
    font-size: 3rem;
  }

  .skills-cloud {
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .skills-section {
    padding: 80px 0;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .skills-navigation {
    flex-direction: column;
    align-items: center;
  }

  .nav-item {
    width: 200px;
    justify-content: center;
  }

  .summary-stats {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .category-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .view-toggle {
    align-self: flex-end;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .category-content {
    padding: 1.5rem;
  }

  .skill-info {
    gap: 0.75rem;
  } 

  .skill-name {
    font-size: 1rem;
  }
}
</style>