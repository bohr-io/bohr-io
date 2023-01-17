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
      d="M4 8C4 3.58167 7.58173 0 12 0C16.4183 0 20 3.58167 20 8C20 11.0604 18.7536 12.2805 17.397 13.6085L17 14C15.5 15.5 15 18 15 18H12H9C9 18 8.5 15.5 7 14L6.60297 13.6085C5.24637 12.2805 4 11.0604 4 8ZM16 5C16.5523 5 17 4.55228 17 4C17 3.44772 16.5523 3 16 3C15.4477 3 15 3.44772 15 4C15 4.55228 15.4477 5 16 5ZM14 6C14.5523 6 15 5.55228 15 5C15 4.44772 14.5523 4 14 4C13.4477 4 13 4.44772 13 5C13 5.55228 13.4477 6 14 6ZM16 7C16 7.55228 15.5523 8 15 8C14.4477 8 14 7.55228 14 7C14 6.44772 14.4477 6 15 6C15.5523 6 16 6.44772 16 7ZM17 7C17.5523 7 18 6.55228 18 6C18 5.44772 17.5523 5 17 5C16.4477 5 16 5.44772 16 6C16 6.55228 16.4477 7 17 7ZM9 20V19H15V20H9ZM15 21C15 22.6569 13.6569 24 12 24C10.3431 24 9 22.6569 9 21H15Z"
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
      gradientId: `lightbulb-icon-gradient-${Math.random().toString().slice(2)}`,
    };
  },
}
</script>
