<template>
  <div class="bohr__multi__select" ref="container">
    <span class="multi__select__label">{{ label }}</span>
    <SkeletonLoading :isShowing="isLoading">
      <div class="selected__container" @click="toggleOpen">
        <span>{{ modelValue.join(', ') }}</span>
      </div>
    </SkeletonLoading>
    <div class="multi__select__options" :class="{ open: isOpen }">
      <label
        v-for="option in options"
        :key="option"
        class="multi__select__option"
      >
        <input
          type="checkbox"
          class="option__checkbox"
          :checked="selectedOptions?.has(option)"
          @input.prevent="optionClick(option)"
        />
        {{ option }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import SkeletonLoading from '@/components/SkeletonLoading.vue';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  components: {
    SkeletonLoading,
  },
  props: {
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    options: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    label: String,
    isLoading: Boolean,
  },
  emits: ['update:modelValue'],
  data() {
    return {
      selectedOptions: null as null | Set<string>,
      isOpen: false,
    }
  },
  watch: {
    isOpen() {
      if (this.selectedOptions === null) {
        this.selectedOptions = new Set(this.modelValue);
      }

      if (this.isOpen) {
        this.addListeners();
      } else {
        this.removeListeners();
      }
    }
  },
  unmounted() {
    this.removeListeners();
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },

    optionClick(option: string) {
      if (this.selectedOptions === null) return;

      if (this.selectedOptions.has(option)) {
        this.selectedOptions.delete(option);
      } else {
        this.selectedOptions.add(option);
      }

      this.$emit('update:modelValue', [...this.selectedOptions]);
    },

    outsideClickListener(e: MouseEvent) {
      const container = this.$refs.container;
      const target = e.target;

      if (
        !(container instanceof Element) ||
        !target ||
        container.contains(e.target as Node)
      ) {
        return;
      }

      this.isOpen = false;
    },

    escListener(e: KeyboardEvent) {
      if (e.key !== 'Escape') return;
      this.isOpen = false;
    },

    addListeners() {
      document.addEventListener('click', this.outsideClickListener);
      document.addEventListener('keydown', this.escListener, { once: true });
    },

    removeListeners() {
      document.removeEventListener('click', this.outsideClickListener);
      document.removeEventListener('keydown', this.escListener);
    },
  },
})
</script>

<style scoped>
.bohr__multi__select,
.bohr__multi__select * {
  box-sizing: border-box;
}

.bohr__multi__select {
  position: relative;
}

.multi__select__label {
  display: block;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.selected__container {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 13px;
  height: 40px;
  width: 200px;
  background: linear-gradient(180deg, transparent 0%, hsla(0, 0%, 100%, 0.05) 100%);
  border: 1px solid hsla(0, 0%, 100%, 0.1);
  border-radius: 4px;
}

.multi__select__options {
  display: none;
  position: absolute;
  top: calc(100% + 1px);
  z-index: 10;
  width: 100%;
  flex-direction: column;
  background-color: hsla(0, 0%, 0%, 1);
  border-radius: 4px;
}

.multi__select__options.open {
  display: flex;
}

.multi__select__option {
  padding: 8px 13px;
}

.option__checkbox {
  accent-color: hsla(21, 89%, 52%, 1);
}

.multi__select__option:hover {
  background: linear-gradient(180deg, hsla(21, 89%, 52%, 1) 0%, hsla(355, 78%, 60%, 1) 100%);
}
</style>