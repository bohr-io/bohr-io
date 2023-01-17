<template>
  <svg :width="sizePx" :height="sizePx" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM14 6C14 4.89543 14.8954 4 16 4C17.1046 4 18 4.89543 18 6V14H26C27.1046 14 28 14.8954 28 16C28 17.1046 27.1046 18 26 18H18V26C18 27.1046 17.1046 28 16 28C14.8954 28 14 27.1046 14 26V18H6C4.89543 18 4 17.1046 4 16C4 14.8954 4.89543 14 6 14H14V6Z"
      :fill="isGradient ? `url(#${gradientId})` : 'white'"
    />
  </svg>
</template>

<script>
export default {
  props: {
    isGradient: Boolean,

    sizePx: {
      type: Number,
      default: 32,
    },
  },
  data() {
    return {
      gradientId: `plus-icon-gradient-${Math.random().toString().slice(2)}`,
    };
  },
}
</script>
