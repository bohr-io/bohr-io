<template>
  <div class="toast__container">
    <TransitionGroup name="toast">
      <svg width="0" height="0" viewBox="0 0 0 0" key="toast-gradients">
        <defs>
          <linearGradient id="toast-grandient-tip" x1="328" y1="36" x2="2.46232e-06" y2="36" gradientUnits="userSpaceOnUse">
            <stop stop-color="hsl(0, 0%, 100%)" stop-opacity="0.5"/>
            <stop offset="1" stop-color="hsl(0, 0%, 100%)" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="toast-grandient-success" x1="328" y1="36" x2="2.46232e-06" y2="36" gradientUnits="userSpaceOnUse">
            <stop stop-color="hsl(0, 0%, 100%)" stop-opacity="0.5"/>
            <stop offset="1" stop-color="hsl(0, 0%, 100%)" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="toast-grandient-warn" x1="328" y1="36" x2="2.46232e-06" y2="36" gradientUnits="userSpaceOnUse">
            <stop stop-color="hsl(0, 0%, 0%)" stop-opacity="0.5"/>
            <stop offset="1" stop-color="hsl(0, 0%, 0%)" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="toast-grandient-error" x1="328" y1="36" x2="2.46232e-06" y2="36" gradientUnits="userSpaceOnUse">
            <stop stop-color="hsl(45, 89%, 59%)" stop-opacity="0.5"/>
            <stop offset="1" stop-color="hsl(45, 89%, 59%)" stop-opacity="0"/>
          </linearGradient>
        </defs>
      </svg>
      <div v-for="toast in toasts" :key="toast.id" class="toast__card" :class="toast.type">
        <component
          :is="getToastIcon(toast.type)"
          :sizePx="24"
          class="toast__icon"
        />
        <span class="toast__type">
          {{ getToastTypeText(toast.type) }}
        </span>
        <span class="message__text">
          {{ toast.message }}
        </span>
        <button
          v-if="toast.action"
          @click="toast.action?.function"
          class="toast__action"
        >
          {{ toast.action.text }}
        </button>
        <div class="toast__stripes">
          <svg width="320" height="72" viewBox="0 0 320 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16 72L40 0H24L0 72H16ZM56 0L32 72H48L72 0H56ZM64 72L88 0H104L80 72H64ZM120 0L96 72H112L136 0H120ZM128 72L152 0H168L144 72H128ZM184 0L160 72H176L200 0H184ZM192 72L216 0H232L208 72H192ZM248 0L224 72H240L264 0H248ZM256 72L280 0H296L272 72H256ZM328 0H312L288 72H304L328 0Z" :fill="`url(#toast-grandient-${toast.type})`"/>
          </svg>
        </div>
      </div>  
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import { ToastData } from '@/types';
import { defineComponent } from 'vue';
import CheckIcon from './icons/CheckIcon.vue';
import ExclamationIcon from './icons/ExclamationIcon.vue';
import LightbulbIcon from './icons/LightbulbIcon.vue';
import XIcon from './icons/XIcon.vue';

export default defineComponent({
  name: 'ToastDisplay',
  components: {
    CheckIcon,
    ExclamationIcon,
    LightbulbIcon,
    XIcon,
  },
  computed: {
    toasts() {
      return this.$store.state.toastData as ToastData[];
    },
    toastWidth() {
      const isPreviewOpen = this.$store.state.preview;
      if (isPreviewOpen)  return '100%';
      
      let sidebarWidthProp = '--sidebar-width';
      // if (!this.$route.meta.isThinMainBar) sidebarWidthProp += '-expanded';
      return `calc(100% - var(${sidebarWidthProp}))`;
    },
  },
  methods: {
    getToastIcon(toastType: ToastData['type']) {
      const iconMap = {
        success: 'CheckIcon',
        warn: 'ExclamationIcon',
        error: 'XIcon',
        tip: 'LightbulbIcon',
      };

      return iconMap[toastType];
    },
    
    getToastTypeText(toastType: ToastData['type']) {
      const textMap = {
        success: 'success',
        warn: 'warning',
        error: 'error',
        tip: 'tip',
      };

      return this.$t(`common.${textMap[toastType]}`);
    },
  }
});
</script>

<style scoped>
.toast__container {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 10000;

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  transition: width var(--transition);
}

@media screen and (min-width:1280px) {
  .toast__container {
    width: v-bind(toastWidth);
  }
}

.toast__card {
  --action-text-color: hsla(203, 37%, 20%, 1);
  background: linear-gradient(180deg, hsla(181, 69%, 61%, 1), hsla(203, 36%, 33%, 1));
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 72px;
  margin: auto;
  padding-left: 36px;
  gap: 24px;
}

@media screen and (min-width:1280px) {
  .toast__card {
    padding-left: 96px;
  }
}

.toast__card.success {
  --action-text-color: hsla(131, 45%, 36%, 1);
  background: linear-gradient(180deg, hsla(181, 69%, 61%, 1), hsla(131, 67%, 60%, 1));
}

.toast__card.warn {
  --action-text-color: hsla(355, 53%, 36%, 1);
  background: linear-gradient(180deg, hsla(47, 89%, 59%, 1) 0%, hsla(39, 92%, 57%, 1) 100%);
}

.toast__card.error {
  --action-text-color: hsla(355, 53%, 36%, 1);
  background: linear-gradient(180deg, hsla(21, 89%, 52%, 1) 0%, hsla(355, 78%, 60%, 1) 100%);
}

.toast__icon {
  filter: drop-shadow(0 0 2px hsla(0, 0%, 0%, 0.5));
}

.toast__type {
  font-weight: 700;
  font-size: 24px;
  letter-spacing: -0.04em;
  color: hsla(0, 0%, 100%, 1);
  text-shadow: 0px 0px 6px hsla(0, 0%, 0%, 0.25);
  text-transform: capitalize;
}

.message__text {
  font-size: 16px;
  font-weight: 700;
  color: hsla(0, 0%, 0%, 1);
  margin-right: auto;
}

.toast__action {
  padding: 11px;
  background-color: hsla(0, 0%, 100%, 1);
  border: none;
  border-radius: 4px;
  font-weight: 700;
  font-size: 12px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  color: var(--action-text-color);
}

.toast__action:active {
  background-color: hsla(0, 0%, 100%, 0.95);
}

.toast__stripes {
  margin-left: -24px;
  font-size: 0;
  min-width: 36px;
  width: 6vw;
  max-width: 320px;
  overflow: hidden;
}

@media screen and (min-width:767px) {
  .toast__stripes {
    min-width: 96px;
    width: 22.22vw;
  }
}

.toast-move,
.toast-enter-active,
.toast-leave-active {
  transition-property: opacity, transform;
  transition-duration: 300ms;
  transition-timing-function: linear;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(100%);
}
.toast-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.toast-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>
