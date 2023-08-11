<template>
  <div class="bohr__checkbox__container">
    <label v-if="label" :for="id" class="bohr__checkbox__label" :class="{ right: rightLabel }">
      {{ label }}
    </label>
    <SkeletonLoading :isShowing="isLoading">
      <div class="bohr__checkbox">
        <input
          v-bind="$attrs"
          type="checkbox"
          :checked="modelValue"
          :id="id"
          @input="handleInput"
          class="bohr__checkbox__input"
        />
        <img
          class="bohr__checkbox__checkmark"
          src="/assets/svg/check-checkbox.svg"
          alt=""
        />
      </div>
    </SkeletonLoading>
  </div>
</template>

<script lang="ts">
import SkeletonLoading from '@/components/SkeletonLoading.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  inheritAttrs: false,
  components: {
    SkeletonLoading,
  },
  props: {
    modelValue: Boolean,
    label: String,
    id: String,
    isLoading: Boolean,
    rightLabel: Boolean,
  },
  emits: ['update:modelValue'],
  methods: {
    handleInput(e: Event) {
      this.$emit('update:modelValue', (e.target as HTMLInputElement).checked);
    }
  },
});
</script>

<style scoped>
.bohr__checkbox__container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bohr__checkbox__label {
  font-weight: 700;
  text-transform: uppercase;
}

.bohr__checkbox__label.right {
  order: 2;
}

.bohr__checkbox {
  position: relative;
  width: 24px;
  height: 24px;
  background-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0.005) 0%, hsla(0, 0%, 100%, 0.05) 100%);;
  border: 1px solid hsla(0, 0%, 100%, 0.1);
  border-radius: 4px;
}

.bohr__checkbox__input {
  width: 100%;
  height: 100%;
  cursor: pointer;
  appearance: none;
}

.bohr__checkbox__checkmark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  pointer-events: none;
}

.bohr__checkbox__input:checked + .bohr__checkbox__checkmark {
  opacity: 1;
}
</style>