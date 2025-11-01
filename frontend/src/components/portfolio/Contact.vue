<template>
  <LayoutHeader />
  <section class="contact-section" id="contact" ref="contactSection">
    <!-- Enhanced Animated Background -->
    <div class="contact-background">
      <div class="floating-elements">
        <div v-for="i in 8" :key="i" :class="`element element-${i}`"></div>
      </div>
      <div class="contact-grid"></div>
      <div class="gradient-overlay"></div>
    </div>

    <div class="container">
      <!-- Enhanced Section Header -->
      <div class="section-header" ref="sectionHeader">
        <div class="section-badge animate-fade-in">
          <span class="badge-icon">📬</span>
          <span class="badge-text">Get In Touch</span>
        </div>
        <h2 class="section-title animate-fade-in-up" style="animation-delay: 0.2s">
          Let's <span class="text-gradient">Connect</span> & Create
        </h2>
        <p class="section-subtitle animate-fade-in-up" style="animation-delay: 0.4s">
          Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
        </p>
      </div>

      <div class="contact-content">
        <!-- Enhanced Contact Info -->
        <div class="contact-info" ref="contactInfo">
          <div class="info-card animate-fade-in-up" style="animation-delay: 0.6s">
            <div class="info-header">
              <h3 class="info-title">Let's create something <span class="text-gradient">extraordinary</span></h3>
              <p class="info-description">
                I'm always excited to take on new challenges and collaborate on innovative projects. 
                Whether you have a specific idea in mind or need help conceptualizing, I'm here to help.
              </p>
            </div>

            <!-- Enhanced Contact Methods -->
            <div class="contact-methods">
              <a
                v-for="(method, index) in contactMethods" 
                :key="method.type" 
                :href="method.link"
                :target="method.type === 'Location' ? '_blank' : '_self'"
                class="contact-method animate-fade-in-up contact-link"
                :style="`animation-delay: ${0.8 + index * 0.1}s`"
                @mouseenter="hoverMethod = method.type"
                @mouseleave="hoverMethod = null"
              >
                <div class="method-icon-wrapper">
                  <div class="method-icon" :class="`icon-${method.type.toLowerCase()}`">
                    <component :is="method.icon" />
                  </div>
                  <div class="icon-glow"></div>
                </div>
                <div class="method-details">
                  <h4 class="method-type">{{ method.type }}</h4>
                  <p class="method-value">{{ method.value }}</p>
                </div>
                <div class="contact-arrow">
                  <ArrowIcon />
                </div>
                <div class="method-hover-effect"></div>
              </a>
            </div>

            <!-- Enhanced Quick Actions -->
            <div class="quick-actions animate-fade-in-up" style="animation-delay: 1.1s">
              <h4 class="quick-actions-title">Quick Actions</h4>
              <div class="action-buttons">
                <button 
                  v-for="action in quickActions"
                  :key="action.label"
                  @click="action.handler"
                  class="action-btn"
                  :class="action.class"
                >
                  <component :is="action.icon" class="action-icon" />
                  {{ action.label }}
                </button>
              </div>
            </div>

            <!-- Enhanced Social Links -->
            <div class="social-section animate-fade-in-up" style="animation-delay: 1.2s">
              <h4 class="social-title">Follow my journey</h4>
              <div class="social-links">
                <a
                  v-for="social in socialLinks"
                  :key="social.name"
                  :href="social.url"
                  target="_blank"
                  class="social-link group"
                  @mouseenter="hoverSocial = social.name"
                  @mouseleave="hoverSocial = null"
                >
                  <div class="social-icon-wrapper">
                    <div class="social-icon" :class="`social-${social.name.toLowerCase()}`">
                      <component :is="social.icon" />
                    </div>
                    <div class="social-glow"></div>
                  </div>
                  <span class="social-name">{{ social.name }}</span>
                  <div class="social-arrow">
                    <ArrowIcon />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Contact Form -->
        <div class="contact-form-wrapper" ref="contactForm">
          <form class="contact-form animate-fade-in-up" style="animation-delay: 0.8s" @submit.prevent="submitForm">
            <div class="form-header">
              <h3 class="form-title">Send me a message</h3>
              <p class="form-subtitle">I typically respond within 24 hours</p>
              <div class="form-decoration">
                <div class="decoration-dot"></div>
                <div class="decoration-line"></div>
                <div class="decoration-dot"></div>
              </div>
            </div>

            <div class="form-grid">
              <div 
                v-for="field in formFields" 
                :key="field.id"
                class="form-group" 
                :class="[{ 'focused': focusedField === field.id, 'has-value': form[field.id] }, field.fullWidth ? 'full-width' : '']"
              >
                <label :for="field.id" class="form-label">
                  <component :is="field.icon" class="label-icon" />
                  {{ field.label }}
                </label>
                <component
                  :is="field.type"
                  :id="field.id"
                  v-model="form[field.id]"
                  :type="field.inputType"
                  :required="field.required"
                  :placeholder="field.placeholder"
                  :maxlength="field.maxlength"
                  :rows="field.rows"
                  @focus="focusedField = field.id"
                  @blur="focusedField = null"
                  :class="field.type === 'textarea' ? 'form-textarea' : 'form-input'"
                />
                <div class="input-underline"></div>
                <div v-if="field.maxlength" class="char-count">
                  {{ form[field.id].length }}/{{ field.maxlength }}
                </div>
              </div>
            </div>

            <UiButton 
              type="submit" 
              :disabled="loading || !isFormValid" 
              class="submit-btn group"
              size="large"
              :variant="isFormValid ? 'primary' : 'disabled'"
            >
              <span class="btn-content">
                <SendIcon class="btn-icon" />
                {{ loading ? 'Sending Message...' : 'Send Message' }}
              </span>
              <div class="btn-shine"></div>
              <div class="loading-dots" v-if="loading">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </UiButton>

            <!-- Enhanced Success Message -->
            <Transition name="slide-fade">
              <div v-if="showSuccess" class="success-message">
                <div class="success-icon-wrapper">
                  <CheckCircleIcon class="success-icon" />
                </div>
                <div class="success-content">
                  <h4>Message Sent Successfully!</h4>
                  <p>I'll get back to you within 24 hours.</p>
                </div>
                <button @click="showSuccess = false" class="close-success">
                  <CloseIcon />
                </button>
              </div>
            </Transition>

            <!-- Error Message -->
            <Transition name="slide-fade">
              <div v-if="showError" class="error-message">
                <div class="error-icon-wrapper">
                  <ErrorIcon class="error-icon" />
                </div>
                <div class="error-content">
                  <h4>Message Failed to Send</h4>
                  <p>Please try again or contact me directly.</p>
                </div>
                <button @click="showError = false" class="close-error">
                  <CloseIcon />
                </button>
              </div>
            </Transition>
          </form>
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
const EmailIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  `
}

const PhoneIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  `
}

const LocationIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  `
}

const UserIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  `
}

const TagIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  `
}

const MessageIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  `
}

const SendIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  `
}

const CheckCircleIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  `
}

const ErrorIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  `
}

const CloseIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
    </svg>
  `
}

const ArrowIcon = {
  template: `
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
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

const LinkedinIcon = {
  template: `
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  `
}

const TwitterIcon = {
  template: `
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
  `
}

export default {
  name: 'PortfolioContact',
  components: {
    LayoutHeader,
    LayoutFooter,
    UiButton,
    EmailIcon,
    PhoneIcon,
    LocationIcon,
    UserIcon,
    TagIcon,
    MessageIcon,
    SendIcon,
    CheckCircleIcon,
    ErrorIcon,
    CloseIcon,
    ArrowIcon,
    GithubIcon,
    LinkedinIcon,
    TwitterIcon
  },
  setup() {
    const contactSection = ref(null)
    const sectionHeader = ref(null)
    const contactInfo = ref(null)
    const contactForm = ref(null)
    
    const form = ref({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
    
    const loading = ref(false)
    const showSuccess = ref(false)
    const showError = ref(false)
    const focusedField = ref(null)
    const hoverMethod = ref(null)
    const hoverSocial = ref(null)

    const isFormValid = computed(() => {
      return form.value.name && 
             form.value.email && 
             form.value.subject && 
             form.value.message &&
             form.value.message.length <= 500
    })

    const contactMethods = ref([
      {
        type: 'Email',
        value: 'alebelfetene12@gmail.com',
        icon: 'EmailIcon',
        link: 'mailto:alebelfetene12@gmail.com?subject=Project%20Inquiry&body=Hello%20Alebel,%20I%20would%20like%20to%20discuss%20a%20project%20with%20you.'
      },
      {
        type: 'Phone',
        value: '+251962514217',
        icon: 'PhoneIcon',
        link: 'tel:+251962514217'
      },
      {
        type: 'Location',
        value: 'Addis Ababa, Ethiopia',
        icon: 'LocationIcon',
        link: 'https://www.google.com/maps/place/Addis+Ababa,+Ethiopia/@9.022736,38.746799,12z/data=!3m1!4b1!4m6!3m5!1s0x164b85cef5ab402d:0x8467b6b037a24d49!8m2!3d9.0107934!4d38.7612525!16zL20vMDFmNDk?entry=ttu'
      }
    ])

    const socialLinks = ref([
      { name: 'GitHub', url: 'https://github.com/alebelfetene', icon: 'GithubIcon' },
      { name: 'LinkedIn', url: 'https://linkedin.com/in/alebel-fetene', icon: 'LinkedinIcon' },
      { name: 'Twitter', url: 'https://twitter.com/alebelfetene', icon: 'TwitterIcon' }
    ])

    const quickActions = ref([
      {
        label: 'Schedule Call',
        icon: 'PhoneIcon',
        handler: scheduleCall,
        class: 'schedule-call-btn'
      },
      {
        label: 'Send Email',
        icon: 'EmailIcon',
        handler: sendEmail,
        class: 'email-btn'
      },
      {
        label: 'Save Contact',
        icon: 'UserIcon',
        handler: downloadVCard,
        class: 'vcard-btn'
      }
    ])

    const formFields = ref([
      {
        id: 'name',
        label: 'Your Name',
        type: 'input',
        inputType: 'text',
        required: true,
        placeholder: 'Alebel Fetene',
        icon: 'UserIcon',
        fullWidth: false
      },
      {
        id: 'email',
        label: 'Email Address',
        type: 'input',
        inputType: 'email',
        required: true,
        placeholder: 'alebelfetene12@gmail.com',
        icon: 'EmailIcon',
        fullWidth: false
      },
      {
        id: 'subject',
        label: 'Subject',
        type: 'input',
        inputType: 'text',
        required: true,
        placeholder: 'Project Collaboration',
        icon: 'TagIcon',
        fullWidth: true
      },
      {
        id: 'message',
        label: 'Your Message',
        type: 'textarea',
        required: true,
        placeholder: 'Tell me about your project, timeline, and budget...',
        icon: 'MessageIcon',
        maxlength: 500,
        rows: 6,
        fullWidth: true
      }
    ])

    const submitForm = async () => {
      if (!isFormValid.value) return
      
      loading.value = true
      showError.value = false
      
      try {
        // Simulate API call with better error handling
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            // Simulate 90% success rate
            Math.random() > 0.1 ? resolve() : reject(new Error('Network error'))
          }, 2000)
        })
        
        // Show success message
        showSuccess.value = true
        
        // Reset form
        form.value = {
          name: '',
          email: '',
          subject: '',
          message: ''
        }
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          showSuccess.value = false
        }, 5000)
      } catch (error) {
        showError.value = true
        setTimeout(() => {
          showError.value = false
        }, 5000)
      } finally {
        loading.value = false
      }
    }

    // Quick action methods
    function scheduleCall() {
      window.open('https://calendly.com/alebelfetene/30min', '_blank')
    }

    function sendEmail() {
      window.open('mailto:alebelfetene12@gmail.com?subject=Project%20Discussion&body=Hello%20Alebel,%0A%0AI%20would%20like%20to%20discuss%20a%20project%20with%20you.%0A%0ABest%20regards,', '_self')
    }

    function downloadVCard() {
      const vCard = `BEGIN:VCARD
VERSION:3.0
FN:Alebel Fetene
ORG:Freelance Developer
TEL;TYPE=WORK,VOICE:+251962514217
EMAIL:alebelfetene12@gmail.com
URL:https://github.com/alebelfetene
ADR;TYPE=WORK:;;Addis Ababa;;;Ethiopia
NOTE:Full Stack Developer & UI/UX Designer
END:VCARD`

      const blob = new Blob([vCard], { type: 'text/vcard' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'alebel_fetene.vcf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }

    onMounted(() => {
      // Add intersection observers for animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      }, { threshold: 0.1 })

      if (contactSection.value) {
        observer.observe(contactSection.value)
      }
    })

    return {
      contactSection,
      sectionHeader,
      contactInfo,
      contactForm,
      form,
      loading,
      showSuccess,
      showError,
      focusedField,
      hoverMethod,
      hoverSocial,
      isFormValid,
      contactMethods,
      socialLinks,
      quickActions,
      formFields,
      submitForm,
      scheduleCall,
      sendEmail,
      downloadVCard
    }
  }
}
</script>

<style scoped>
/* Enhanced Base Styles */
.contact-section {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  overflow: hidden;
}

/* Enhanced Background */
.contact-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
}

.element {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, #07e262, #05f569);
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
}

.element-1 { width: 100px; height: 100px; top: 10%; left: 5%; animation-delay: 0s; }
.element-2 { width: 150px; height: 150px; top: 60%; right: 10%; animation-delay: 2s; }
.element-3 { width: 80px; height: 80px; bottom: 20%; left: 15%; animation-delay: 4s; }
.element-4 { width: 120px; height: 120px; top: 30%; right: 20%; animation-delay: 1s; }
.element-5 { width: 90px; height: 90px; bottom: 40%; right: 5%; animation-delay: 3s; }
.element-6 { width: 110px; height: 110px; top: 70%; left: 20%; animation-delay: 5s; }
.element-7 { width: 70px; height: 70px; top: 20%; left: 80%; animation-delay: 2.5s; }
.element-8 { width: 130px; height: 130px; bottom: 10%; right: 25%; animation-delay: 1.5s; }

.contact-grid {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
}

/* Enhanced Container */
.container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem 4rem;
}

/* Enhanced Section Header */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 0.5rem 1.5rem;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
}

.badge-icon {
  font-size: 1.2rem;
}

.badge-text {
  font-weight: 600;
  color: #f1f5f9;
  font-size: 0.9rem;
}

.section-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 1rem;
  line-height: 1.1;
}

.text-gradient {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
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

/* Enhanced Contact Content */
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 4rem;
  align-items: start;
}

/* Enhanced Contact Info */
.contact-info {
  position: sticky;
  top: 2rem;
}

.info-card {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 2.5rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.info-header {
  margin-bottom: 2.5rem;
}

.info-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.info-description {
  color: #cbd5e1;
  line-height: 1.6;
  font-size: 1.05rem;
}

/* Enhanced Contact Methods */
.contact-methods {
  margin-bottom: 2.5rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  margin-bottom: 1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
}

.contact-link:hover {
  transform: translateX(8px) translateY(-2px);
  background: rgba(30, 41, 59, 0.9);
  border-color: rgba(59, 130, 246, 0.4);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.3);
}

.contact-link:hover .contact-arrow {
  transform: translateX(5px);
  opacity: 1;
}

.method-icon-wrapper {
  position: relative;
  flex-shrink: 0;
}

.method-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

.contact-link:hover .method-icon {
  transform: scale(1.1);
}

.icon-email {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.icon-phone {
  background: linear-gradient(135deg, #10b981, #047857);
}

.icon-location {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.method-icon svg {
  width: 1.25rem;
  height: 1.25rem;
  color: white;
}

.icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: inherit;
  filter: blur(15px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.contact-link:hover .icon-glow {
  opacity: 0.4;
}

.method-details {
  flex: 1;
}

.method-type {
  font-size: 0.9rem;
  font-weight: 600;
  color: #94a3b8;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.method-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #f1f5f9;
}

.contact-arrow {
  color: #cbd5e1;
  transition: all 0.3s ease;
  opacity: 0;
}

.contact-arrow svg {
  width: 1.25rem;
  height: 1.25rem;
}

.method-hover-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
  transition: left 0.6s;
}

.contact-link:hover .method-hover-effect {
  left: 100%;
}

/* Enhanced Quick Actions */
.quick-actions {
  margin-bottom: 2.5rem;
  padding: 2rem;
  background: rgba(30, 41, 59, 0.4);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.quick-actions-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #f1f5f9;
  margin-bottom: 1.5rem;
  text-align: center;
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(30, 41, 59, 0.6);
  color: #f1f5f9;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.action-btn:hover {
  transform: translateY(-3px);
  border-color: rgba(59, 130, 246, 0.4);
  box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.3);
}

.schedule-call-btn:hover {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.3));
  border-color: rgba(16, 185, 129, 0.4);
}

.email-btn:hover {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.3));
  border-color: rgba(59, 130, 246, 0.4);
}

.vcard-btn:hover {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(124, 58, 237, 0.3));
  border-color: rgba(139, 92, 246, 0.4);
}

.action-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

/* Enhanced Social Links */
.social-section {
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.social-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #f1f5f9;
  margin-bottom: 1.5rem;
  text-align: center;
}

.social-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  text-decoration: none;
  color: #f1f5f9;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.social-link:hover {
  transform: translateY(-2px);
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
}

.social-icon-wrapper {
  position: relative;
  flex-shrink: 0;
}

.social-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.social-link:hover .social-icon {
  transform: scale(1.1);
}

.social-github {
  background: linear-gradient(135deg, #333, #000);
}

.social-linkedin {
  background: linear-gradient(135deg, #0077b5, #005582);
}

.social-twitter {
  background: linear-gradient(135deg, #1da1f2, #0d8bd9);
}

.social-icon svg {
  width: 1.25rem;
  height: 1.25rem;
  color: white;
}

.social-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: inherit;
  filter: blur(12px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.social-link:hover .social-glow {
  opacity: 0.4;
}

.social-name {
  font-weight: 500;
  font-size: 0.9rem;
  flex: 1;
}

.social-arrow {
  color: #cbd5e1;
  transition: transform 0.3s ease;
  opacity: 0;
}

.social-link:hover .social-arrow {
  opacity: 1;
  transform: translateX(3px);
}

.social-arrow svg {
  width: 1rem;
  height: 1rem;
}

/* Enhanced Contact Form */
.contact-form-wrapper {
  position: relative;
}

.contact-form {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 2.5rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  position: relative;
  overflow: hidden;
}

.form-header {
  text-align: center;
  margin-bottom: 2.5rem;
  position: relative;
}

.form-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 0.5rem;
}

.form-subtitle {
  color: #94a3b8;
  font-size: 1rem;
}

.form-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.decoration-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #3b82f6;
  opacity: 0.6;
}

.decoration-line {
  width: 40px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #3b82f6, transparent);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.form-group {
  position: relative;
  transition: all 0.3s ease;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group.focused {
  transform: translateY(-2px);
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #94a3b8;
  margin-bottom: 0.75rem;
  transition: color 0.3s ease;
}

.form-group.focused .form-label {
  color: #3b82f6;
}

.label-icon {
  width: 1rem;
  height: 1rem;
  color: inherit;
}

.form-input,
.form-textarea {
  width: 100%;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  color: #f8fafc;
  font-size: 1rem;
  transition: all 0.3s ease;
  resize: none;
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: #64748b;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: rgba(59, 130, 246, 0.5);
  background: rgba(30, 41, 59, 0.8);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group.has-value .form-input,
.form-group.has-value .form-textarea {
  border-color: rgba(16, 185, 129, 0.5);
}

.input-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  transition: width 0.3s ease;
}

.form-group.focused .input-underline {
  width: 100%;
}

.char-count {
  position: absolute;
  bottom: -1.5rem;
  right: 0;
  font-size: 0.75rem;
  color: #64748b;
  transition: color 0.3s ease;
}

.form-group.focused .char-count {
  color: #3b82f6;
}

/* Enhanced Submit Button */
.submit-btn {
  width: 100%;
  position: relative;
  overflow: hidden;
  border: none;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  padding: 1.25rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px -10px rgba(59, 130, 246, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  z-index: 2;
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.btn-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: rotate(45deg);
  transition: all 0.6s ease;
}

.submit-btn:hover .btn-shine {
  transform: rotate(45deg) translate(50%, 50%);
}

.loading-dots {
  display: flex;
  gap: 0.25rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loading-dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: white;
  animation: bounce 1.4s ease-in-out infinite both;
}

.loading-dots span:nth-child(1) { animation-delay: -0.32s; }
.loading-dots span:nth-child(2) { animation-delay: -0.16s; }

/* Enhanced Messages */
.success-message,
.error-message {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 16px;
  margin-top: 1.5rem;
  position: relative;
  animation: slideIn 0.5s ease-out;
}

.success-message {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05));
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.error-message {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05));
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.success-icon-wrapper,
.error-icon-wrapper {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-icon-wrapper {
  background: rgba(16, 185, 129, 0.2);
}

.error-icon-wrapper {
  background: rgba(239, 68, 68, 0.2);
}

.success-icon,
.error-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.success-icon {
  color: #10b981;
}

.error-icon {
  color: #ef4444;
}

.success-content,
.error-content {
  flex: 1;
}

.success-content h4,
.error-content h4 {
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 0.25rem;
}

.success-content p,
.error-content p {
  color: #cbd5e1;
  font-size: 0.9rem;
}

.close-success,
.close-error {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.close-success:hover,
.close-error:hover {
  color: #f1f5f9;
  background: rgba(255, 255, 255, 0.1);
}

.close-success svg,
.close-error svg {
  width: 1rem;
  height: 1rem;
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
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

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .contact-info {
    position: static;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 4rem 1.5rem 3rem;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
  
  .section-subtitle {
    font-size: 1.1rem;
  }
  
  .info-card,
  .contact-form {
    padding: 2rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .action-buttons {
    grid-template-columns: 1fr;
  }
  
  .social-links {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }
  
  .contact-link {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .contact-arrow {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 3rem 1rem 2rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .info-card,
  .contact-form {
    padding: 1.5rem;
    border-radius: 20px;
  }
  
  .quick-actions {
    padding: 1.5rem;
  }
  
  .action-btn {
    padding: 0.875rem 1rem;
    font-size: 0.85rem;
  }
  
  .social-link {
    padding: 0.875rem 1rem;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>