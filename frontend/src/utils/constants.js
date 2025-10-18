// Theme constants
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
}

// Project status constants
export const PROJECT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived'
}

// Skill categories
export const SKILL_CATEGORIES = {
  FRONTEND: 'Frontend',
  BACKEND: 'Backend',
  DATABASE: 'Database',
  TOOLS: 'Tools & Others',
  DESIGN: 'Design',
  MOBILE: 'Mobile'
}

// Contact form subjects
export const CONTACT_SUBJECTS = [
  'Project Inquiry',
  'Collaboration',
  'Job Opportunity',
  'Freelance Work',
  'Other'
]

// Social media platforms
export const SOCIAL_PLATFORMS = {
  GITHUB: 'github',
  LINKEDIN: 'linkedin',
  TWITTER: 'twitter',
  INSTAGRAM: 'instagram',
  FACEBOOK: 'facebook',
  YOUTUBE: 'youtube'
}

// API endpoints
export const API_ENDPOINTS = {
  PROJECTS: '/projects',
  SKILLS: '/skills',
  CONTACT: '/contact',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile'
  },
  UPLOAD: '/upload'
}

// Validation rules
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s-()]+$/,
  URL: /^https?:\/\/.+\..+$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/
}

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language'
}

// Breakpoints for responsive design
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
}

// Animation durations
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500
}

// Color palette
export const COLORS = {
  PRIMARY: '#3B82F6',
  SECONDARY: '#6B7280',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  INFO: '#06B6D4'
}

// Default values
export const DEFAULTS = {
  AVATAR: '/images/default-avatar.png',
  PROJECT_IMAGE: '/images/default-project.png',
  BLOG_IMAGE: '/images/default-blog.png',
  PER_PAGE: 10
}

// Export all constants as a single object for easy importing
export default {
  THEMES,
  PROJECT_STATUS,
  SKILL_CATEGORIES,
  CONTACT_SUBJECTS,
  SOCIAL_PLATFORMS,
  API_ENDPOINTS,
  VALIDATION_RULES,
  STORAGE_KEYS,
  BREAKPOINTS,
  ANIMATION_DURATIONS,
  COLORS,
  DEFAULTS
}