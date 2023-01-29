<template>
  <dialog
    ref="dialogEl"
    class="modal"
    @click="handleDialogClick"
    @close="$emit('close')"
    @cancel.prevent="$emit('close')"
  >
    <template v-if="withCloseBtn">
      <BohrIconButton
        type="button"
        class="btn__close"
        @click="$emit('close')"
        :label="$t('components.modal.close')"
      >
        <XIcon isGradient />
      </BohrIconButton>
    </template>
    <slot>
      Modal default content
    </slot>
  </dialog>
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
  },
  watch: {
    isVisible() {
      const dialogEl = this.$refs.dialogEl as HTMLDialogElement;
      if (this.isVisible)  dialogEl?.showModal();
      else dialogEl?.close();
    },
  },
  methods: {
    handleDialogClick(e: MouseEvent) {
      const dialogEl = this.$refs.dialogEl as HTMLDialogElement;
      if (!dialogEl) return;

      const dialogRect = dialogEl.getBoundingClientRect();

      const isDialogClick = (
        dialogRect.top <= e.clientY &&
        e.clientY <= dialogRect.bottom &&
        dialogRect.left <= e.clientX &&
        e.clientX <= dialogRect.right
      );

      if (!isDialogClick) this.$emit('close');
    }
  },
});
</script>

<style scoped>
  .modal {
    --animation-duration: 5000ms;
    border-radius: 8px;
    background-color: hsla(0, 0%, 100%, 1);
    color: hsla(0, 0%, 0%, 1);
    border: none;
    overflow-x: auto;
    padding: 24px;
  }

  @media screen and (min-width: 767px) {
    .modal {
      padding: 48px;
    }
  }
  
  @media screen and (min-width: 992px) {
    .modal {
      padding: 72px;
    }
  }

  .modal::backdrop {
    background-color: hsla(0, 0%, 0%, 0.72);
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