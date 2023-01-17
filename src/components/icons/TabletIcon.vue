<template>
  <svg :width="sizePx" :height="sizePx * (20/28)" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient :id="gradientId" x1="0%" y1="0%" x2="0%" y2="100%">
        <slot name="gradient">
          <stop offset="0%" style="stop-color:#F4CD3B;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#F16622;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#E84856;stop-opacity:1" />
        </slot>
      </linearGradient>
    </defs>
    <rect class="screen" x="1.16602" y="1.21094" width="25.6667" height="16.9615" rx="1" fill="#4E677C"/>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0 2C0 0.895427 0.895431 0 2 0H26C27.1046 0 28 0.895431 28 2V17.3846C28 18.4892 27.1046 19.3846 26 19.3846H2C0.895431 19.3846 0 18.4892 0 17.3846V2ZM1.16632 2.21154C1.16632 1.65925 1.61403 1.21154 2.16632 1.21154H25.833C26.3853 1.21154 26.833 1.65925 26.833 2.21154V17.1731C26.833 17.7254 26.3853 18.1731 25.833 18.1731H2.16631C1.61403 18.1731 1.16632 17.7254 1.16632 17.1731V2.21154ZM25 7.26923C24.7239 7.26923 24.5 7.49309 24.5 7.76923V11.6154C24.5 11.8915 24.7239 12.1154 25 12.1154H25.1667C25.4428 12.1154 25.6667 11.8915 25.6667 11.6154V7.76923C25.6667 7.49309 25.4428 7.26923 25.1667 7.26923H25Z"
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
      default: 28,
    },
  },
  data() {
    return {
      gradientId: `tablet-icon-gradient-${Math.random().toString().slice(2)}`,
    };
  },
}
</script>
