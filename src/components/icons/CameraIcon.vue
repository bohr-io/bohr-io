<template>
  <svg :width="sizePx" :height="sizePx * (24/14)" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient :id="gradientId" x1="0%" y1="0%" x2="0%" y2="100%">
        <slot name="gradient">
          <stop offset="0%" style="stop-color:#F4CD3B;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#F16622;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#E84856;stop-opacity:1" />
        </slot>
      </linearGradient>
    </defs>
    
    <rect class="screen" x="1.26367" y="1.27344" width="22.7368" height="11.4545" rx="1" fill="#4E677C"/>
    <rect x="17.6836" y="3.82031" width="1.27273" height="3.78947" rx="0.5" transform="rotate(-90 17.6836 3.82031)" :fill="isGradient ? `url(#${gradientId})` : color || 'white'"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 0C0.895431 0 0 0.89543 0 2V12C0 13.1046 0.89543 14 2 14H22C23.1046 14 24 13.1046 24 12V2C24 0.895431 23.1046 0 22 0H2ZM2.26338 1.27295C1.71109 1.27295 1.26338 1.72066 1.26338 2.27295V11.7275C1.26338 12.2798 1.71109 12.7275 2.26338 12.7275H21.8634C22.4157 12.7275 22.8634 12.2798 22.8634 11.7275V2.27295C22.8634 1.72066 22.4157 1.27295 21.8634 1.27295H2.26338Z" :fill="isGradient ? `url(#${gradientId})` : color || 'white'"/>
    <path d="M15.9202 7.00142C15.9202 9.18902 14.1612 10.956 11.9992 10.956C9.83719 10.956 8.07812 9.18902 8.07812 7.00142C8.07812 4.81382 9.83719 3.04688 11.9992 3.04688C14.1612 3.04688 15.9202 4.81382 15.9202 7.00142Z" :stroke="isGradient ? `url(#${gradientId})` : color || 'white'"/>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    isGradient: Boolean,
    color: String,

    sizePx: {
      type: Number,
      default: 24,
    },
  },
  data() {
    return {
      gradientId: `camera-icon-gradient-${Math.random().toString().slice(2)}`,
    };
  },
})
</script>
