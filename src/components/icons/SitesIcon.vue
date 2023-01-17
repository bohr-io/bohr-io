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
    <transition>
      <template v-if="isFilled">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1 0C0.447715 0 0 0.447715 0 1V10C0 10.5523 0.447715 11 1 11H10C10.5523 11 11 10.5523 11 10V1C11 0.447715 10.5523 0 10 0H1ZM1 13C0.447715 13 0 13.4477 0 14V23C0 23.5523 0.447715 24 1 24H10C10.5523 24 11 23.5523 11 23V14C11 13.4477 10.5523 13 10 13H1ZM13 1C13 0.447715 13.4477 0 14 0H23C23.5523 0 24 0.447715 24 1V10C24 10.5523 23.5523 11 23 11H14C13.4477 11 13 10.5523 13 10V1ZM14 13C13.4477 13 13 13.4477 13 14V23C13 23.5523 13.4477 24 14 24H23C23.5523 24 24 23.5523 24 23V14C24 13.4477 23.5523 13 23 13H14Z"
          :fill="isGradient ? `url(#${gradientId})` : 'white'"
        />
      </template>

      <template v-else>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 1C0 0.447715 0.447715 0 1 0H10C10.5523 0 11 0.447715 11 1V10C11 10.5523 10.5523 11 10 11H1C0.447715 11 0 10.5523 0 10V1ZM0 14C0 13.4477 0.447715 13 1 13H10C10.5523 13 11 13.4477 11 14V23C11 23.5523 10.5523 24 10 24H1C0.447715 24 0 23.5523 0 23V14ZM14 0C13.4477 0 13 0.447715 13 1V10C13 10.5523 13.4477 11 14 11H23C23.5523 11 24 10.5523 24 10V1C24 0.447715 23.5523 0 23 0H14ZM13 14C13 13.4477 13.4477 13 14 13H23C23.5523 13 24 13.4477 24 14V23C24 23.5523 23.5523 24 23 24H14C13.4477 24 13 23.5523 13 23V14ZM1 1.5C1 1.22386 1.22386 1 1.5 1H9.5C9.77614 1 10 1.22386 10 1.5V9.5C10 9.77614 9.77614 10 9.5 10H1.5C1.22386 10 1 9.77614 1 9.5V1.5ZM14 1.5C14 1.22386 14.2239 1 14.5 1H22.5C22.7761 1 23 1.22386 23 1.5V9.5C23 9.77614 22.7761 10 22.5 10H14.5C14.2239 10 14 9.77614 14 9.5V1.5ZM14.5 14C14.2239 14 14 14.2239 14 14.5V22.5C14 22.7761 14.2239 23 14.5 23H22.5C22.7761 23 23 22.7761 23 22.5V14.5C23 14.2239 22.7761 14 22.5 14H14.5ZM1 14.5C1 14.2239 1.22386 14 1.5 14H9.5C9.77614 14 10 14.2239 10 14.5V22.5C10 22.7761 9.77614 23 9.5 23H1.5C1.22386 23 1 22.7761 1 22.5V14.5Z"
          :fill="isGradient ? `url(#${gradientId})` : 'white'"
        />
      </template>
    </transition>
  </svg>
</template>

<script>
export default {
  props: {
    isFilled: Boolean,
    isGradient: Boolean,

    sizePx: {
      type: Number,
      default: 32,
    },
  },
  data() {
    return {
      gradientId: `sites-icon-gradient-${Math.random().toString().slice(2)}`,
    }
  },
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity var(--transition);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
