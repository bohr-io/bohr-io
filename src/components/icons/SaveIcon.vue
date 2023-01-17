<template>
  <svg :width="sizePx" :height="sizePx" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient :id="gradientId" x1="0%" y1="0%" x2="0%" y2="100%">
        <slot name="gradient">
          <stop offset="0%" style="stop-color:#F4CD3B;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#F16622;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#E84856;stop-opacity:1" />
        </slot>
      </linearGradient>
    </defs>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0 2C0 0.895431 0.895431 0 2 0H5H11H12C14.2091 0 16 1.79086 16 4V14C16 15.1046 15.1046 16 14 16H12H4H2C0.895431 16 0 15.1046 0 14V2ZM4 15H12V8.5C12 8.22386 11.7761 8 11.5 8H4.5C4.22386 8 4 8.22386 4 8.5V15ZM13 15H14C14.5523 15 15 14.5523 15 14V4C15 2.34315 13.6569 1 12 1V4C12 4.55228 11.5523 5 11 5H5C4.44772 5 4 4.55228 4 4V1L2 1C1.44772 1 1 1.44772 1 2V14C1 14.5523 1.44772 15 2 15H3V8C3 7.44772 3.44772 7 4 7H12C12.5523 7 13 7.44772 13 8V15ZM9 1.5C9 1.22386 9.22386 1 9.5 1H10.5C10.7761 1 11 1.22386 11 1.5V3.5C11 3.77614 10.7761 4 10.5 4H9.5C9.22386 4 9 3.77614 9 3.5V1.5ZM6 12.5C6 12.2239 6.22386 12 6.5 12H9.5C9.77614 12 10 12.2239 10 12.5C10 12.7761 9.77614 13 9.5 13H6.5C6.22386 13 6 12.7761 6 12.5ZM5.5 10C5.22386 10 5 10.2239 5 10.5C5 10.7761 5.22386 11 5.5 11H10.5C10.7761 11 11 10.7761 11 10.5C11 10.2239 10.7761 10 10.5 10H5.5Z"
      :fill="isGradient ? `url(#${gradientId})` : color || 'white'"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    isGradient: Boolean,
    color: String,

    sizePx: {
      type: Number,
      default: 16,
    },
  },
  data() {
    return {
      gradientId: `save-icon-gradient-${Math.random().toString().slice(2)}`,
    };
  },
})
</script>
