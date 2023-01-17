<template>
  <template v-if="isShowing">
    <div class="skeleton__wrapper" :class="{ inline }">
      <svg role="presentation" class="skeleton" width="1" height="1" viewBox="0 0 1 1" fill="red" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      </svg>
      <slot></slot>
    </div>
  </template>

  <template v-else>
    <slot></slot>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const addPx = (string: string) => string.endsWith('px') ? string : string + 'px';

export default defineComponent({
  inheritAttrs: false,
  props: {
    isShowing: Boolean,
    inline: Boolean,
    width: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '',
    },
    borderRadius: {
      type: String,
      default: '2px'
    },
  },
  data() {
    const borderRadiusPx = this.borderRadius === 'circle'
      ? '99999px'
      : addPx(this.borderRadius);

    return {
      borderRadiusPx,
    }
  }
})
</script>

<style scoped>
.skeleton__wrapper {
  position: relative;
  border-radius: v-bind(borderRadiusPx);
  width: v-bind(width);
  height: v-bind(height);
  overflow: hidden;
  isolation: isolate;
}

.skeleton__wrapper.inline {
  vertical-align: top;
  display: inline-block;
}

.skeleton {
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  z-index: 100;
  animation: skeleton-animation 3s linear infinite;
  background-image: linear-gradient(90deg, hsl(203, 18%, 60%), hsl(203, 36%, 33%), hsl(203, 18%, 60%));
  background-size: 300% 100%;
}


@keyframes skeleton-animation {
  from {
    background-position: 0% 0%;
  }
  to {
    background-position: -300% 0%;
  }
}
</style>