<template>
  <div class="status__icon__wrapper" :class="statusClass">
    <VTooltip placement="bottom" distance="12">
      <svg class="status__icon" width="15" height="15" viewBox="0 0 17 17">
        <circle cx="8.5" cy="8.5" r="8.5" :fill="status && 'transparent'" />
      </svg>
      <template #popper>
        {{ $t('common.status') }}: {{ $t(`common.${status === 'off' ? 'sleep' : status}`) }}
      </template>
    </VTooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    status: {
      type: String as PropType<'success' | 'warning' | 'error' | 'off'>,
      default: 'off',
    }
  },
  computed: {
    statusClass() {
      return `status__icon--${this.status}`;
    }
  }
});
</script>

<style scoped>
.status__icon__wrapper {
  --background: black;
  --shadow-color: black;
  position: relative;
  display: inline-block;
  font-size: 0;
  width: 17px;
  height: 17px;
}

.status__icon {
  position: relative;
  border-radius: 100%;
  background: var(--background);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 25px 1px var(--shadow-color);
}

.status__icon--success {
  --background: linear-gradient(180deg, #55DDE0 0%, #53DD6C 100%);
  --shadow-color: #53DD6C;
}

.status__icon--warning {
  --background: linear-gradient(180deg, #F4CC3A 0%, #F6AE2D 100%);
  --shadow-color: #F6AE2D;
}

.status__icon--error {
  --background: linear-gradient(180deg, #F26419 0%, #E84855 100%);
  --shadow-color: #F26419;
}

@media screen and (max-width: 767px) {
  .status__icon__wrapper {
    grid-area: status;
    height: 100%;
  }
}
</style>
