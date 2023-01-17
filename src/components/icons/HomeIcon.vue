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
          d="M11.2989 0.309802L0.255231 12.3823C-0.309444 12.9995 0.124114 14 0.956292 14H4V23C4 23.5523 4.44772 24 5 24H9C9.55229 24 10 23.5523 10 23V17C10 16.4477 10.4477 16 11 16H13C13.5523 16 14 16.4477 14 17V23C14 23.5523 14.4477 24 15 24H19C19.5523 24 20 23.5523 20 23V14H23.0437C23.8759 14 24.3094 12.9995 23.7448 12.3823L12.7011 0.309804C12.3232 -0.103267 11.6768 -0.103268 11.2989 0.309802Z"
          :fill="isGradient ? `url(#${gradientId})` : 'white'"
        />
      </template>

      <template v-else>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.2989 0.309802L0.255231 12.3823C-0.309444 12.9995 0.124114 14 0.956292 14H4V23C4 23.5523 4.44772 24 5 24H9C9.55229 24 10 23.5523 10 23V17C10 16.4477 10.4477 16 11 16H13C13.5523 16 14 16.4477 14 17V23C14 23.5523 14.4477 24 15 24H19C19.5523 24 20 23.5523 20 23V14H23.0437C23.8759 14 24.3094 12.9995 23.7448 12.3823L12.7011 0.309804C12.3232 -0.103267 11.6768 -0.103268 11.2989 0.309802ZM4 13C4.55229 13 5 13.4477 5 14V22.5C5 22.7761 5.22386 23 5.5 23H8.5C8.77614 23 9 22.7761 9 22.5V17C9 15.8954 9.89543 15 11 15H13C14.1046 15 15 15.8954 15 17V22.5C15 22.7761 15.2239 23 15.5 23H18.5C18.7761 23 19 22.7761 19 22.5V14C19 13.4477 19.4477 13 20 13H22.387C22.6045 13 22.7183 12.7417 22.5715 12.5813L12.3689 1.42827C12.1707 1.21159 11.8293 1.21159 11.6311 1.42827L1.42849 12.5813C1.28175 12.7417 1.39555 13 1.61295 13H4Z"
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
      gradientId: `home-icon-gradient-${Math.random().toString().slice(2)}`,
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
