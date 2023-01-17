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
      d="M8 0.5C8 0.223858 8.22386 0 8.5 0H22.5H23.5C23.7761 0 24 0.223858 24 0.5V1.5V15.5C24 15.7761 23.7761 16 23.5 16H22.5C22.2239 16 22 15.7761 22 15.5V3.40777L12.134 13.2738C11.9387 13.4691 11.6221 13.4691 11.4269 13.2738L10.7198 12.5667C10.5245 12.3714 10.5245 12.0548 10.7198 11.8596L20.5793 2H8.5C8.22386 2 8 1.77614 8 1.5V0.5ZM14 5C14 4.44772 13.5523 4 13 4H5L4.67125 4.01064C2.06307 4.17992 0 6.34903 0 9V19L0.0106354 19.3288C0.179923 21.9369 2.34903 24 5 24H15L15.3288 23.9894C17.9369 23.8201 20 21.651 20 19V11L19.9839 10.8202C19.8992 10.3538 19.4909 10 19 10C18.4477 10 18 10.4477 18 11V19L17.9863 19.2889C17.8409 20.8102 16.5594 22 15 22H5L4.71108 21.9863C3.18978 21.8409 2 20.5594 2 19V9L2.01373 8.71108C2.1591 7.18978 3.44061 6 5 6H13L13.1798 5.98389C13.6462 5.89922 14 5.49092 14 5Z"
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
      gradientId: `new-window-icon-gradient-${Math.random().toString().slice(2)}`,
    };
  },
}
</script>
