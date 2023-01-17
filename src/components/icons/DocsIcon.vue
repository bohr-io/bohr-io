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
          d="M20 8V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4C4 2.89543 4.89543 2 6 2H13.1429M20 8C14.2857 9 14.2857 9 13.1429 2M20 8L13.1429 2"
          :fill="isGradient ? `url(#${gradientId})` : 'white'"
        />
      </template>

      <template v-else>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.35294 2.95238C5.57325 2.95238 4.94118 3.59197 4.94118 4.38095V19.619C4.94118 20.408 5.57325 21.0476 6.35294 21.0476H17.6471C18.4268 21.0476 19.0588 20.408 19.0588 19.619V8.75697C17.9865 8.94513 17.1181 9.08592 16.4213 9.11275C15.6015 9.14431 14.9163 9.02437 14.3792 8.54885C13.8621 8.09104 13.5651 7.37256 13.3259 6.43447C13.1037 5.56351 12.9125 4.41687 12.6757 2.95238H6.35294ZM13.7533 3.70897L18.4771 7.8915C17.6075 8.04022 16.9309 8.14006 16.3855 8.16106C15.659 8.18903 15.2686 8.07087 14.999 7.83211C14.7093 7.57563 14.4685 7.10363 14.2372 6.19649C14.0728 5.552 13.9243 4.73819 13.7533 3.70897ZM4 4.38095C4 3.06599 5.05345 2 6.35294 2H13.0756C13.1896 2 13.2997 2.04187 13.3855 2.11782L19.8393 7.83211C19.9414 7.92253 20 8.05316 20 8.19048V19.619C20 20.934 18.9466 22 17.6471 22H6.35294C5.05345 22 4 20.934 4 19.619V4.38095Z"
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
      gradientId: `docs-icon-gradient-${Math.random().toString().slice(2)}`,
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
