<template>
  <svg :width="sizePx" :height="sizePx" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      d="M11.0001 0C9.85189 0 8.93945 0.964537 9.00314 2.11094L9.83339 17.0555C9.86283 17.5854 10.3011 18 10.8319 18H12.9399C13.4706 18 13.9089 17.5854 13.9383 17.0555L14.7686 2.11094C14.8323 0.964538 13.9198 0 12.7717 0H11.0001ZM11.8859 24C12.9904 24 13.8859 23.1046 13.8859 22C13.8859 20.8954 12.9904 20 11.8859 20C10.7813 20 9.88587 20.8954 9.88587 22C9.88587 23.1046 10.7813 24 11.8859 24Z"
      :fill="isGradient ? `url(#${gradientId})` : color || 'white'"
    />
  </svg>
</template>

<script lang="ts">
export default {
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
      gradientId: `exclamation-icon-gradient-${Math.random().toString().slice(2)}`,
    };
  },
}
</script>
