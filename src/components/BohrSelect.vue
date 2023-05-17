<template>
  <div class="bohr__select__container">
    <label v-if="label" :for="id" class="bohr__select__label">
      {{ label }}
      <span v-if="required" class="bohr__text__required">*</span>
    </label>
    <SkeletonLoading :isShowing="isLoading">
      <select
        :id="id"
        class="bohr__select"
        :class="[$style.bohr__select, { placeholder__value: modelValue === '' }]"
        :value="modelValue"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        v-bind="$attrs"
        :required="required"
      >
        <slot></slot>
      </select>
      <ArrowIcon
        :sizePx="16"
        direction="bottom"
        class="bohr__select__arrow"
      />
    </SkeletonLoading>
  </div>
</template>

<script lang="ts">
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import SkeletonLoading from '@/components/SkeletonLoading.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    ArrowIcon,
    SkeletonLoading,
  },
  inheritAttrs: false,
  props: {
    modelValue: [String, Number],
    label: String,
    id: String,
    isLoading: Boolean,
    required: Boolean,
  },
  emits: ['update:modelValue'],
});
</script>

<style scoped>
  .bohr__select__container {
    position: relative;
    display: inline-block;
    font-size: 12px;
    min-width: 200px;
  }

  .bohr__text__required {
    color: red;
  }

  .bohr__select__label {
    display: block;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .bohr__select {
    appearance: none;
    background: linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.05) 100%);
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    height: 40px;
    padding-block: 0;
    padding-inline: 13px 32px;
    box-sizing: border-box;
    color: inherit;
    width: 100%;
  }

  .placeholder__value {
    color: hsla(0, 0%, 40%, 1);
  }

  .bohr__select.placeholder__value > :first-child {
    color: hsla(0, 0%, 40%, 1);
  }  

  .bohr__select__arrow {
    pointer-events: none;
    position: absolute;
    bottom: 12px;
    right: 8px;
    opacity: 0.5;
  }
</style>

<style module>
  .bohr__select optgroup,
  .bohr__select option {
    background: black;
    color: hsla(0, 0%, 100%, 1);
  }
</style>
