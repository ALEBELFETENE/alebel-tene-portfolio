<template>
  <section class="hero-section" ref="heroSection">
    <!-- Background -->
    <div class="hero-background">
      <div class="background-overlay"></div>
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
        <div class="shape shape-5"></div>
      </div>
       <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>
      <div class="grid-pattern"></div>
    </div>

    <div class="hero-container">
      <!-- Text Content -->
      <div class="hero-content" ref="heroContent">
        <div class="hero-badge animate-fade-in">
          <span class="badge-icon">🚀</span>
          <span class="badge-text">Available for freelance work</span>
        </div>

        <div class="content-wrapper">
          <h2 class="hero-subtitle animate-fade-in-up" style="animation-delay: 0.2s">
            <span class="waving-hand">👋</span>
            {{ subtitle }}
          </h2>

          <h1 class="hero-title animate-fade-in-up" style="animation-delay: 0.4s">
            <span class="title-line">Software Engineering</span>
            <span class="title-gradient">{{ title }}</span>
            <span class="typing-cursor">|</span>
          </h1>

          <p class="hero-description animate-fade-in-up" style="animation-delay: 0.6s">
            {{ description }}
          </p>

          <!-- Stats -->
          <div class="hero-stats animate-fade-in-up" style="animation-delay: 0.8s">
            <div class="stat-item">
              <div class="stat-icon">📁</div>
              <div class="stat-content">
                <div class="stat-number">10+</div>
                <div class="stat-label">Projects</div>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">⏳</div>
              <div class="stat-content">
                <div class="stat-number">3+</div>
                <div class="stat-label">Years Exp</div>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">⭐</div>
              <div class="stat-content">
                <div class="stat-number">90%</div>
                <div class="stat-label">Satisfaction</div>
              </div>
            </div>
          </div>

          <!-- Buttons -->
          <div class="hero-actions animate-fade-in-up" style="animation-delay: 1s">
            <button class="primary-btn" @click="$emit('contact')">
              <span class="btn-content">
                <svg class="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Get In Touch
              </span>
            </button>
            <button class="secondary-btn" @click="$emit('projects')">
              <span class="btn-content">
                <svg class="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                View Projects
              </span>
            </button>
          </div>

          <!-- Social Links -->
          <div class="social-links animate-fade-in-up" style="animation-delay: 1.2s">
            <a href="https://github.com/ALEBELFETENE" class="social-link" aria-label="GitHub">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="LinkedIn">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Twitter">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Image Section -->
      <div class="hero-image" ref="heroImage">
        <div class="image-container">
          <img :src="image" :alt="name" class="profile-image" />
          <div class="image-glow"></div>
          
          <!-- Floating Tech Elements -->
          <div class="floating-tech">
            <div class="tech-element element-1">
              <div class="tech-icon">⚡</div>
            </div>
            <div class="tech-element element-2">
              <div class="tech-icon">🔧</div>
            </div>
            <div class="tech-element element-3">
              <div class="tech-icon">🎨</div>
            </div>
            <div class="tech-element element-4">
              <div class="tech-icon">🚀</div>
            </div>
          </div>

          <!-- Experience Badge -->
          <div class="experience-badge">
            <div class="badge-content">
              <span class="badge-number">5+</span>
              <span class="badge-text">Years Experience</span>
            </div>
            <div class="badge-glow"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="scroll-indicator animate-fade-in-up" style="animation-delay: 1.4s">
      <div class="scroll-text">Scroll Down</div>
      <div class="scroll-arrow"></div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue'
import myPhoto from '@/assets/971.jpg'

export default {
  name: 'PortfolioHero',
  props: {
    subtitle: { 
      type: String, 
      default: "Hello, I'm .Alebel Fetene" 
    },
    title: { 
      type: String, 
      default: 'Full-Stack Developer' 
    },
    description: {
      type: String,
      default: 'I build creative, responsive, and high-performing web applications using modern technologies. Passionate about creating digital experiences that make a difference.'
    },
    name: { 
      type: String, 
      default: 'Alebel Fetene' 
    }
  },
  emits: ['contact', 'projects'],
  setup() {
    const heroSection = ref(null)
    const heroContent = ref(null)
    const heroImage = ref(null)
    const image = ref(myPhoto)

    onMounted(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in')
            }
          })
        },
        { threshold: 0.1 }
      )

      if (heroContent.value) observer.observe(heroContent.value)
      if (heroImage.value) observer.observe(heroImage.value)
    })

    return { heroSection, heroContent, heroImage, image }
  }
}
</script>

<style scoped>
/* === Main Section === */
.hero-section {
  position: relative;
  min-height: 100vh;
  padding: 120px 2rem 80px;
  overflow: hidden;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* === Background === */
.hero-background {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.background-overlay {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.1) 0%, transparent 50%);
}

.grid-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: radial-gradient(ellipse at center, black 40%, transparent 70%);
}

/* === Floating Shapes === */
.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.floating-shapes .shape {
  position: absolute;
  background: rgba(11, 235, 235, 0.8);
  border-radius: 50%;
  box-shadow: #f4f4f7;
  animation: float 4s ease-in-out infinite;
}
.shape-1 { width: 100px; height: 100px; top: 10%; left: 15%; }
.shape-2 { width: 60px; height: 60px; bottom: 20%; right: 20%; }
.shape-3 { width: 80px; height: 80px; top: 40%; right: 10%; }
.shape-4 { width: 50px; height: 50px; bottom: 10%; left: 25%; }

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.shape-1 {
  width: 120px;
  height: 120px;
  background: #6366f1;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 80px;
  height: 80px;
  background: #8b5cf6;
  bottom: 20%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 100px;
  height: 100px;
  background: #06b6d4;
  top: 40%;
  right: 10%;
  animation-delay: 4s;
}

.shape-4 {
  width: 60px;
  height: 60px;
  background: #10b981;
  bottom: 15%;
  left: 20%;
  animation-delay: 1s;
}

.shape-5 {
  width: 90px;
  height: 90px;
  background: #ec4899;
  top: 60%;
  left: 5%;
  animation-delay: 3s;
}

/* === Container Layout === */
.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 5rem;
  align-items: center;
  width: 100%;
}

/* === Content Section === */
.hero-content {
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s ease;
}

.hero-content.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Badge */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(99, 102, 241, 0.2);
  border: 1px solid rgba(99, 102, 241, 0.4);
  padding: 0.25rem 1.5rem;
  border-radius: 50px;
  margin-bottom: 0.5rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.2);
}

.badge-icon {
  font-size: 1.2rem;
}

.badge-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: #c7d2fe;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Content */
.hero-subtitle {
  font-size: 1.25rem;
  color: #cbd5e1;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.title-line {
  display: block;
  color: #e2e8f0;
  margin-bottom: 0.5rem;
}

.title-gradient {
  background: linear-gradient(135deg, #a5b4fc 0%, #818cf8 50%, #6366f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: gradient-shift 4s ease infinite;
}

.hero-description {
  font-size: 1.125rem;
  line-height: 1.7;
  color: #94a3b8;
  max-width: 500px;
  margin-bottom: 2rem;
}

/* Stats */
.hero-stats {
  display: flex;
  gap: 2rem;
  margin: 2.5rem 0;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-3px);
  border-color: rgba(99, 102, 241, 0.4);
  box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.2);
}

.stat-icon {
  font-size: 1.5rem;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #f8fafc;
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: #cbd5e1;
  font-weight: 500;
}

/* Buttons */
.hero-actions {
  display: flex;
  gap: 1rem;
  margin: 2.5rem 0;
}

.primary-btn,
.secondary-btn {
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  position: relative;
  overflow: hidden;
}

.primary-btn {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4);
}

.primary-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.primary-btn:hover::before {
  left: 100%;
}

.primary-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px -5px rgba(99, 102, 241, 0.6);
}

.secondary-btn {
  background: rgba(30, 41, 59, 0.8);
  color: #c7d2fe;
  border: 1px solid rgba(99, 102, 241, 0.3);
  backdrop-filter: blur(10px);
}

.secondary-btn:hover {
  background: rgba(99, 102, 241, 0.1);
  border-color: rgba(99, 102, 241, 0.5);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.2);
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Social Links */
.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 50%;
  color: #c7d2fe;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.social-link:hover {
  background: rgba(99, 102, 241, 0.2);
  border-color: rgba(99, 102, 241, 0.5);
  color: #a5b4fc;
  transform: translateY(-3px);
  box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.3);
}

.social-link svg {
  width: 1.25rem;
  height: 1.25rem;
}

/* === Image Section === */
.hero-image {
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s ease;
}

.hero-image.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.image-container {
  position: relative;
  display: inline-block;
}

.profile-image {
  width: 380px;
  height: 380px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid rgba(99, 102, 241, 0.3);
  box-shadow: 
    0 25px 50px -12px rgba(99, 102, 241, 0.4),
    inset 0 2px 4px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.profile-image:hover {
  transform: scale(1.02);
  border-color: rgba(99, 102, 241, 0.6);
  box-shadow: 
    0 35px 60px -12px rgba(99, 102, 241, 0.6),
    inset 0 2px 4px 0 rgba(255, 255, 255, 0.2);
}

.image-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
  height: 420px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 50%;
  filter: blur(30px);
  opacity: 0.3;
  z-index: 1;
  animation: pulse-glow 3s ease-in-out infinite alternate;
}

/* Floating Tech Elements */
.floating-tech {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.tech-element {
  position: absolute;
  width: 50px;
  height: 50px;
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

.tech-icon {
  font-size: 1.25rem;
}

.element-1 {
  top: -10px;
  right: 40px;
  animation-delay: 0s;
}

.element-2 {
  bottom: 60px;
  left: -20px;
  animation-delay: 2s;
}

.element-3 {
  bottom: -10px;
  right: 80px;
  animation-delay: 4s;
}

.element-4 {
  top: 80px;
  left: -10px;
  animation-delay: 1s;
}

/* Experience Badge */
.experience-badge {
  position: absolute;
  bottom: 20px;
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

.badge-number {
  font-size: 1.5rem;
  font-weight: 800;
}

.badge-text {
  font-size: 0.75rem;
  font-weight: 600;
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

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  opacity: 0;
}

.scroll-text {
  font-size: 0.875rem;
  color: #94a3b8;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.scroll-arrow {
  width: 2px;
  height: 20px;
  background: #6366f1;
  margin: 0 auto;
  border-radius: 1px;
  animation: bounce 2s infinite;
}

/* === Animations === */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

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

@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(20deg); }
  75% { transform: rotate(-10deg); }
}

@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
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

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* Animation classes */
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.waving-hand {
  animation: wave 2s infinite;
}

.typing-cursor {
  animation: blink 1s infinite;
}

/* === Responsive Design === */
@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }

  .hero-title {
    font-size: 3rem;
  }

  .profile-image {
    width: 320px;
    height: 320px;
  }

  .image-glow {
    width: 360px;
    height: 360px;
  }

  .hero-stats {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 100px 1.5rem 60px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .hero-stats {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .stat-item {
    width: 200px;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .primary-btn,
  .secondary-btn {
    width: 200px;
  }

  .profile-image {
    width: 280px;
    height: 280px;
  }

  .image-glow {
    width: 320px;
    height: 320px;
  }

  .tech-element {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.125rem;
  }

  .profile-image {
    width: 250px;
    height: 250px;
  }

  .image-glow {
    width: 290px;
    height: 290px;
  }

  .experience-badge {
    padding: 0.75rem 1.5rem;
  }
}
</style>