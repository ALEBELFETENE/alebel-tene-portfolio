<template>
  <div :class="['card', `card-${variant}`]">
    <div v-if="$slots.header" class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiCard',
  props: {
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'outlined', 'elevated'].includes(value)
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.card-default {
  background-color: var(--card-bg, #f8fafc);
  border: 1px solid var(--card-border, #e2e8f0);
}

.card-outlined {
  border: 2px solid var(--card-border, #e2e8f0);
  background: transparent;
}

.card-elevated {
  background-color: var(--card-bg, #ffffff);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: none;
}

.card-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--card-border, #e2e8f0);
  background-color: var(--card-header-bg, #f1f5f9);
}

.card-body {
  padding: 20px;
}

.card-footer {
  padding: 16px 20px;
  border-top: 1px solid var(--card-border, #e2e8f0);
  background-color: var(--card-footer-bg, #f8fafc);
}
</style>