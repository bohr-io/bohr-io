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
          d="M19 7C19 3.13401 15.866 0 12 0C8.13401 0 5 3.13401 5 7C5 8.933 6.46573 16 12 16C17.3401 16 18.8921 9.42023 18.9945 7.22191L19 7ZM20.1121 15.7683C18.6844 15.2561 17.8137 15 17.5 15L17.4101 15.0081L17.3255 15.0313C17.1626 15.092 17.0398 15.2352 17.0081 15.4101L17 15.5L16.9935 15.6286C16.8596 16.9496 14.6751 18 12 18L11.7427 17.9967C9.10085 17.9298 7 16.8376 7 15.5L6.99194 15.4101C6.9549 15.206 6.79397 15.0451 6.58988 15.0081L6.5 15C6.22549 15 5.52456 15.1961 4.3972 15.5883L3.38467 15.9478C1.34838 16.7001 0 18.2164 0 20.3333V22C0 23.1046 0.934362 24 2.08696 24H21.913L22.0688 23.9945C23.1486 23.9182 24 23.0544 24 22V20.3333L23.9945 20.1006C23.8955 18.0284 22.4726 16.5628 20.3863 15.8674L20.1121 15.7683Z"
          :fill="isGradient ? `url(#${gradientId})` : 'white'"
        />
      </template>

      <template v-else>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 0C15.866 0 19 3.13401 19 7L18.9945 7.22191C18.8921 9.42023 17.3401 16 12 16C6.46573 16 5 8.933 5 7C5 3.13401 8.13401 0 12 0ZM12 1C8.68629 1 6 3.68629 6 7C6 10.5962 8.32038 15 12 15C15.6796 15 18 10.5962 18 7C18 3.68629 15.3137 1 12 1ZM17.5 15C17.8137 15 18.6844 15.2561 20.1121 15.7683L20.3863 15.8674C22.4726 16.5628 23.8955 18.0284 23.9945 20.1006L24 20.3333V22C24 23.0544 23.1486 23.9182 22.0688 23.9945L21.913 24H2.08696C0.934362 24 0 23.1046 0 22V20.3333C0 18.2164 1.34838 16.7001 3.38467 15.9478L4.3972 15.5883C5.52456 15.1961 6.22549 15 6.5 15L6.58988 15.0081C6.79397 15.0451 6.9549 15.206 6.99194 15.4101L7 15.5C7 16.8376 9.10085 17.9298 11.7427 17.9967L12 18C14.6751 18 16.8596 16.9496 16.9935 15.6286L17 15.5L17.0081 15.4101C17.0398 15.2352 17.1626 15.092 17.3255 15.0313L17.4101 15.0081L17.5 15ZM17.92 16.095L17.8832 16.2269C17.3428 17.8808 15.0054 18.9307 12.2629 18.9966L11.9874 18.9999L11.7174 18.9964C8.9396 18.926 6.58266 17.844 6.09599 16.2219L6.063 16.1L5.67242 16.2183C5.34136 16.3225 4.92107 16.4632 4.42438 16.6388L3.92995 16.8161C2.12646 17.4172 1.08879 18.5857 1.00544 20.1298L1 20.3333V22C1 22.5064 1.41582 22.9386 1.9669 22.994L2.08696 23L21.8778 23.0006L21.9983 22.997C22.5286 22.9595 22.9378 22.5754 22.9935 22.109L23 22L23.0003 20.357L22.9956 20.1483C22.9248 18.666 21.9694 17.5229 20.2796 16.8903L19.2278 16.5172C18.7279 16.3443 18.3208 16.213 18.0253 16.1259L17.92 16.095Z"
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
      gradientId: `profile-icon-gradient-${Math.random().toString().slice(2)}`,
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
