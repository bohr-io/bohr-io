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
      d="M7.11588 19.8269C7.12516 19.8365 7.13455 19.846 7.14404 19.8555C7.6678 20.3793 8.38224 20.5962 9.0639 20.5061C9.10934 20.5001 9.15464 20.4928 9.19973 20.484C9.63271 20.4003 10.0462 20.1908 10.3815 19.8555C10.3895 19.8475 10.3974 19.8394 10.4053 19.8313L23.3292 6.90743C24.2231 6.01356 24.2231 4.56429 23.3292 3.67041C22.4353 2.77653 20.986 2.77653 20.0921 3.67041L8.7628 14.9998L3.90744 10.1444C3.01356 9.25051 1.56429 9.25051 0.670411 10.1444C-0.223469 11.0383 -0.223471 12.4875 0.670409 13.3814L7.11588 19.8269Z"
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
      gradientId: `check-icon-gradient-${Math.random().toString().slice(2)}`,
    };
  },
}
</script>
