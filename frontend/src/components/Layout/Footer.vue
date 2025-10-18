<template>
  <footer class="footer">
    <!-- Wave Divider -->
    <div class="wave-divider">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
      </svg>
    </div>

    <div class="container">
      <!-- Main Footer Content -->
      <div class="footer-content">
        <!-- Brand Section -->
        <div class="footer-section brand-section">
          <div class="brand-logo">
            <div class="logo-icon">🚀</div>
            <h3>{{ siteTitle }}</h3>
          </div>
          <p class="brand-description">
            Full-stack developer passionate about creating amazing web experiences and digital solutions.
          </p>
          <div class="social-links">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url" 
              :aria-label="social.name"
              class="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="social-icon">{{ social.icon }}</span>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-section">
          <h4 class="section-title">Quick Links</h4>
          <div class="links-grid">
            <router-link 
              v-for="link in quickLinks" 
              :key="link.name"
              :to="link.path" 
              class="footer-link"
              @click="scrollToTop"
            >
              <span class="link-icon">{{ link.icon }}</span>
              {{ link.name }}
            </router-link>
          </div>
        </div>

        <!-- Services -->
        <div class="footer-section">
          <h4 class="section-title">Services</h4>
          <div class="links-grid">
            <span 
              v-for="service in services" 
              :key="service"
              class="footer-link service-item"
            >
              <span class="service-icon">⚡</span>
              {{ service }}
            </span>
          </div>
        </div>

        <!-- Newsletter -->
        <div class="footer-section newsletter-section">
          <h4 class="section-title">Stay Updated</h4>
          <p class="newsletter-description">
            Get the latest updates on new projects and articles.
          </p>
          <div class="newsletter-form">
            <input 
              v-model="email" 
              type="email" 
              placeholder="Enter your email" 
              class="newsletter-input"
              @keyup.enter="subscribeNewsletter"
            >
            <button 
              class="newsletter-btn" 
              @click="subscribeNewsletter"
              :disabled="!email"
            >
              <span class="btn-icon">📧</span>
              Subscribe
            </button>
          </div>
          <p v-if="subscriptionMessage" class="subscription-message">
            {{ subscriptionMessage }}
          </p>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p class="copyright">
            &copy; {{ currentYear }} {{ siteTitle }}. All rights reserved.
          </p>
          <div class="legal-links">
            <a href="#" class="legal-link">Privacy Policy</a>
            <a href="#" class="legal-link">Terms of Service</a>
            <a href="#" class="legal-link">Cookie Policy</a>
          </div>
          <button class="back-to-top" @click="scrollToTop">
            <span class="arrow-icon">↑</span>
            Back to Top
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'LayoutFooter',
  data() {
    return {
      siteTitle: 'Portfolio Pro',
      email: '',
      subscriptionMessage: '',
      socialLinks: [
        { name: 'GitHub', icon: '💻', url: 'https://github.com' },
        { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
        { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
        { name: 'Instagram', icon: '📸', url: 'https://instagram.com' },
        { name: 'Dribbble', icon: '🎨', url: 'https://dribbble.com' }
      ],
      quickLinks: [
        { name: 'Home', path: '/', icon: '🏠' },
        { name: 'Projects', path: '/projects', icon: '🚀' },
        { name: 'Blog', path: '/blog', icon: '📝' },
        { name: 'About', path: '/about', icon: '👨‍💻' },
        { name: 'Contact', path: '/contact', icon: '📞' }
      ],
      services: [
        'Web Development',
        'Mobile Apps',
        'UI/UX Design',
        'Consulting',
        'Maintenance'
      ]
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    subscribeNewsletter() {
      if (this.email && this.validateEmail(this.email)) {
        // Simulate API call
        this.subscriptionMessage = '🎉 Thanks for subscribing!'
        setTimeout(() => {
          this.email = ''
          this.subscriptionMessage = ''
        }, 3000)
      } else {
        this.subscriptionMessage = 'Please enter a valid email address.'
      }
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return re.test(email)
    }
  }
}
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #cdd8d1 0%, #aec5b8 100%);
  color: #131314;
  position: relative;
  margin-top: 100px;
}

.wave-divider {
  position: absolute;
  top: -100px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.wave-divider svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 100px;
}

.shape-fill {
  fill: #0f172a;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 40px;
  padding: 60px 0 40px;
}

.footer-section h3,
.footer-section h4 {
  margin-bottom: 20px;
  color: #010a13;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 20px;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 30px;
  height: 2px;
  background: linear-gradient(90deg, #13161b, #17161a);
  border-radius: 2px;
}

/* Brand Section */
.brand-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  font-size: 2rem;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 12px;
  padding: 8px;
}

.brand-logo h3 {
  margin: 0;
  font-size: 1.5rem;
  background: linear-gradient(135deg, #02060e, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-description {
  line-height: 1.6;
  color: #94a3b8;
  font-size: 0.95rem;
}

/* Social Links */
.social-links {
  display: flex;
  gap: 12px;
  margin-top: 10px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(29, 24, 24, 0.1);
}

.social-link:hover {
  background: rgba(59, 130, 246, 0.2);
  transform: translateY(-2px);
  border-color: rgba(59, 130, 246, 0.4);
}

.social-icon {
  font-size: 1.2rem;
}

/* Links Grid */
.links-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #0f1114;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 8px 0;
  border-radius: 6px;
}

.footer-link:hover {
  color: #0a0c0f;
  transform: translateX(5px);
}

.link-icon,
.service-icon {
  font-size: 1rem;
  opacity: 0.8;
}

.service-item {
  cursor: default;
}

.service-item:hover {
  transform: none;
  color: #07090c;
}

/* Newsletter */
.newsletter-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.newsletter-description {
  color: #020407;
  font-size: 0.9rem;
  line-height: 1.5;
}

.newsletter-form {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.newsletter-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid rgba(17, 6, 6, 0.2);
  border-radius: 8px;
  background: rgba(19, 2, 2, 0.9);
  color: #160303;
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.newsletter-input::placeholder {
  color: #94a3b8;
}

.newsletter-input:focus {
  outline: none;
  border-color: #050f1f;
  background: rgba(10, 3, 3, 0.15);
}

.newsletter-btn {
  padding: 12px 20px;
  background: linear-gradient(135deg, #1b0444, #0e012b);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.newsletter-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(243, 244, 245, 0.9);
}

.newsletter-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.subscription-message {
  font-size: 0.85rem;
  color: #10b981;
  margin-top: 8px;
}

/* Footer Bottom */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 30px 0;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.copyright {
  color: #94a3b8;
  font-size: 0.9rem;
}

.legal-links {
  display: flex;
  gap: 20px;
}

.legal-link {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.3s ease;
}

.legal-link:hover {
  color: #3b82f6;
}

.back-to-top {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(29, 16, 16, 0.1);
  color: #060d16;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.85rem;
  backdrop-filter: blur(10px);
}

.back-to-top:hover {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
  border-color: rgba(59, 130, 246, 0.4);
  transform: translateY(-1px);
}

.arrow-icon {
  font-size: 1rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 40px 30px;
  }
}

@media (max-width: 768px) {
  .footer {
    margin-top: 80px;
  }

  .wave-divider {
    top: -80px;
  }

  .wave-divider svg {
    height: 80px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 40px 0 30px;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .legal-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }

  .footer-content {
    padding: 30px 0 20px;
  }

  .social-links {
    justify-content: center;
  }

  .brand-logo {
    justify-content: center;
    text-align: center;
  }
}
</style>