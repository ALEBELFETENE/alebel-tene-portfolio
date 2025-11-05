<template>
  <button 
    :class="['btn', `btn-${variant}`, `btn-${size}`, { 'btn-disabled': disabled }]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'UiButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'danger', 'success'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click']
}
</script>

<style scoped>
.btn {
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  outline: none;
}

.btn:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.btn-small {
  padding: 8px 16px;
  font-size: 14px;
}

.btn-medium {
  padding: 12px 24px;
  font-size: 16px;
}

.btn-large {
  padding: 16px 32px;
  font-size: 18px;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
}

.btn-primary:hover:not(.btn-disabled) {
  background-color: #2563eb;
}

.btn-secondary {
  background-color: #6b7280;
  color: white;
}

.btn-secondary:hover:not(.btn-disabled) {
  background-color: #4b5563;
}

.btn-danger {
  background-color: #ef4444;
  color: white;
}

.btn-danger:hover:not(.btn-disabled) {
  background-color: #dc2626;
}

.btn-success {
  background-color: #10b981;
  color: white;
}

.btn-success:hover:not(.btn-disabled) {
  background-color: #059669;
}

.btn-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>