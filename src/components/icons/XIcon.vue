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
      d="M23.4072 0.590681C22.6196 -0.196895 21.3427 -0.196893 20.5551 0.590683L13.4131 7.73269C12.6321 8.51374 11.3658 8.51374 10.5847 7.73269L3.44292 0.590905C2.65534 -0.196672 1.37843 -0.196672 0.590856 0.590904C-0.196721 1.37848 -0.196719 2.65539 0.590857 3.44297L7.73264 10.5848C8.51369 11.3658 8.51369 12.6321 7.73264 13.4132L0.590682 20.5551C-0.196894 21.3427 -0.196894 22.6196 0.590682 23.4072C1.37826 24.1948 2.65517 24.1948 3.44275 23.4072L10.5847 16.2652C11.3658 15.4842 12.6321 15.4842 13.4131 16.2652L20.5553 23.4074C21.3429 24.195 22.6198 24.195 23.4074 23.4074C24.195 22.6198 24.195 21.3429 23.4074 20.5554L16.2652 13.4132C15.4841 12.6321 15.4841 11.3658 16.2652 10.5848L23.4072 3.44275C24.1948 2.65517 24.1948 1.37826 23.4072 0.590681Z"
      :fill="isGradient ? `url(#${gradientId})` : color || 'white'"
    />
  </svg>
</template>

<script>
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
      gradientId: `x-icon-gradient-${Math.random().toString().slice(2)}`,
    };
  },
}
</script>
