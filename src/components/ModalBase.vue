<template>
  <div
    v-if="isVisible"
    @click.self="emitCloseEvent"
    class="modal__backdrop"
  >
    <div
      ref="modalContainer"
      class="modal__container"
    >
      <slot>
        Modal default content
      </slot>
      <template v-if="withCloseBtn">
        <BohrIconButton
          type="button"
          class="btn__close"
          @click="emitCloseEvent"
          :label="$t('components.modal.close')"
        >
          <XIcon isGradient />
        </BohrIconButton>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import BohrIconButton from '@/components/BohrIconButton.vue';
import XIcon from '@/components/icons/XIcon.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    BohrIconButton,
    XIcon
  },
  emits: ['close'],
  props: {
    withCloseBtn: Boolean,
    isVisible: Boolean,

    width: {
      type: String,
      default: 'initial',
    },

    maxWidth: {
      type: String,
      default: 'initial',
    },

    minWidth: {
      type: String,
      default: 'initial',
    },
  },
  data(): {
    lastFocusedEl?: HTMLElement
  } {
    return {};
  },
  watch: {
    isVisible() {
      if (this.isVisible)  {
        this.$store.commit('lockScroll' && 'lockScrollScroll');
        this.addEventListeners();
        this.$nextTick(this.focusFirst);
      } else {
        this.removeEventListeners();
        this.$store.commit('unlockScroll' && 'unlockScrollScroll');
        this.lastFocusedEl?.focus();
      }
    },
  },
  methods: {
    emitCloseEvent() {
      this.$emit('close');
    },

    addEventListeners() {
      document.addEventListener('keydown', this.keyboardListener);
    },

    removeEventListeners() {
      document.removeEventListener('keydown', this.keyboardListener);
    },

    keyboardListener(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        this.emitCloseEvent();
      }

      if (e.key === 'Tab') {
        const focusableElements = this.getFocusableElements();
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    },

    focusFirst() {
      if (document.activeElement instanceof HTMLElement) {
        this.lastFocusedEl = document.activeElement;
      }

      const firstElement = this.getFocusableElements()[0];
      firstElement.focus();
    },

    getFocusableElements() {
      const focusableElements = (this.$refs.modalContainer as HTMLDivElement).querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      return Array.from(focusableElements);
    },
  },
});
</script>

<style scoped>
  .modal__backdrop {
    position: fixed;
    inset: 0;
    display: grid;
    align-content: center;
    justify-content: center;
    background-color: hsla(0, 0%, 0%, 0.72);
    z-index: 1000;
  }

  .modal__container {
    position: relative;
    border-radius: 8px;
    background-color: hsla(0, 0%, 100%, 1);
    color: hsla(0, 0%, 0%, 1);
    border: none;
    overflow-x: auto;
    padding: 24px;

    width: v-bind(width);
    max-width: v-bind(maxWidth);
    min-width: v-bind(minWidth);
  }

  @media screen and (min-width: 767px) {
    .modal__container {
      padding: 48px;
    }
  }

  .btn__close {
    position: absolute;
    top: 12px;
    right: 12px;
    box-sizing: content-box;
    width: 1em;
    height: 1em;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: hsla(0, 0%, 100%, 1);
    background: transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23FFF'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e") center/1em auto no-repeat;
  }
</style>