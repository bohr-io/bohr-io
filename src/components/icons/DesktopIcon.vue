<template>
  <svg :width="sizePx" :height="sizePx * (3/4)" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      class="screen"
      d="M1.33398 1.75C1.33398 1.19772 1.7817 0.75 2.33398 0.75H29.6675C30.2198 0.75 30.6675 1.19772 30.6675 1.75V19.7501C30.6675 20.3024 30.2198 20.7501 29.6675 20.7501H2.33398C1.7817 20.7501 1.33398 20.3024 1.33398 19.7501V1.75Z"
      fill="#4E677C"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0 2C0 0.89543 0.895431 0 2 0H30.0002C31.1048 0 32.0002 0.895431 32.0002 2V19.3335C32.0002 20.4381 31.1048 21.3335 30.0002 21.3335H2C0.895432 21.3335 0 20.4381 0 19.3335V2ZM1.33334 2.33334C1.33334 1.78106 1.78106 1.33334 2.33334 1.33334H29.6669C30.2192 1.33334 30.6669 1.78106 30.6669 2.33334V19.0001C30.6669 19.5524 30.2192 20.0001 29.6669 20.0001H2.33334C1.78106 20.0001 1.33334 19.5524 1.33334 19.0001V2.33334ZM8.50006 22.6668C8.22392 22.6668 8.00006 22.8907 8.00006 23.1668V23.5002C8.00006 23.7763 8.22392 24.0002 8.50006 24.0002H23.5002C23.7763 24.0002 24.0002 23.7763 24.0002 23.5002V23.1668C24.0002 22.8907 23.7763 22.6668 23.5002 22.6668H8.50006Z"
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
      default: 32,
    },
  },
  data() {
    return {
      gradientId: `desktop-icon-gradient-${Math.random().toString().slice(2)}`,
    };
  },
}
</script>
