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
      d="M24 12C24 14.3734 23.2962 16.6935 21.9776 18.6668C20.6591 20.6402 18.7849 22.1783 16.5922 23.0866C14.3995 23.9948 11.9867 24.2324 9.65892 23.7694C7.33115 23.3064 5.19295 22.1635 3.51472 20.4853C1.83649 18.8071 0.693601 16.6689 0.230577 14.3411C-0.232446 12.0133 0.00519327 9.60052 0.913444 7.4078C1.82169 5.21509 3.35976 3.34094 5.33315 2.02237C7.30654 0.70379 9.62662 1.10341e-06 12 0L12 3.98262C10.4143 3.98262 8.86423 4.45283 7.54578 5.3338C6.22733 6.21476 5.19972 7.4669 4.59291 8.93188C3.98609 10.3969 3.82732 12.0089 4.13667 13.5641C4.44603 15.1193 5.20961 16.5479 6.33086 17.6691C7.45211 18.7904 8.88067 19.554 10.4359 19.8633C11.9911 20.1727 13.6031 20.0139 15.0681 19.4071C16.5331 18.8003 17.7852 17.7727 18.6662 16.4542C19.5472 15.1358 20.0174 13.5857 20.0174 12H24Z"
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
      gradientId: `wait-icon-gradient-${Math.random().toString().slice(2)}`,
    };
  },
}
</script>
