<template>
  <div class="preview__cursor">
    <svg width="20" height="20" viewBox="0 0 388 388" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M377.886 200.456C292.412 212.14 212.14 292.412 200.456 377.886C199.741 383.114 191.887 384.775 189.528 380.056L5.7082 12.4164C3.55932 8.11863 8.11863 3.55932 12.4164 5.7082L380.056 189.528C384.775 191.887 383.114 199.741 377.886 200.456Z"
        :fill="color"
        stroke="hsla(0, 0%, 0%, 0.5)"
        stroke-width="50"
        />
    </svg>
    <span class="cursor__username">{{ username }}</span>
  </div>
</template>

<script lang="ts">
import getLiveBlocksColor from '@/utils/getLiveBlocksColor';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      requied: true,
    },
    colorSeed: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    color() { return getLiveBlocksColor(this.colorSeed) },
    xPx() { return `${this.x}px` },
    yPx() { return `${this.y}px` },
  }
});
</script>

<style scoped>
.preview__cursor {
  position: absolute;
  top: v-bind(yPx);
  left: v-bind(xPx);
  width: 20px;
  height: 20px;
  z-index: 100;
  transition: all 100ms linear;
}

.cursor__username {
  position: absolute;
  top: 100%;
  left: 100%;
  background-color: v-bind(color);
  padding: 4px;
  border-radius: 4px;
  border: 2px solid hsla(0, 0%, 0%, 0.5);
  text-shadow: -1px -1px black,
               -1px 1px black,
               1px -1px black,
               1px 1px black;
}
</style>
