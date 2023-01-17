<template>
  <svg :width="sizePx" :height="sizePx * (18/11)" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient :id="gradientId" x1="0%" y1="0%" x2="0%" y2="100%">
        <slot name="gradient">
          <stop offset="0%" style="stop-color:#F4CD3B;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#F16622;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#E84856;stop-opacity:1" />
        </slot>
      </linearGradient>
    </defs>
    <rect class="screen" x="1.09961" y="1.125" width="8.8" height="15.75" rx="1" fill="#4E677C"/>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0 2C0 0.89543 0.895431 0 2 0H9C10.1046 0 11 0.895431 11 2V16C11 17.1046 10.1046 18 9 18H2C0.895431 18 0 17.1046 0 16V2ZM1.1001 2.1251C1.1001 1.57282 1.54781 1.1251 2.1001 1.1251H3.2998V1.7501C3.2998 2.02624 3.52366 2.2501 3.7998 2.2501H7.1998C7.47595 2.2501 7.6998 2.02624 7.6998 1.7501V1.1251H8.9001C9.45238 1.1251 9.9001 1.57282 9.9001 2.1251V15.8751C9.9001 16.4274 9.45238 16.8751 8.9001 16.8751H2.1001C1.54781 16.8751 1.1001 16.4274 1.1001 15.8751V2.1251Z"
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
      default: 11,
    },
  },
  data() {
    return {
      gradientId: `phone-icon-gradient-${Math.random().toString().slice(2)}`,
    };
  },
}
</script>
