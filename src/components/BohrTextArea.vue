<template>
  <div class="bohr__text__area__container">
    <label v-if="label" :for="id" class="bohr__text__area__label">
      {{ label }}
      <span v-if="required" class="bohr__text__required">*</span>
    </label>
    <SkeletonLoading :isShowing="isLoading">
      <textarea
        ref="input"
        :id="id"
        class="bohr__text__area"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        v-bind="$attrs"
        :required="required"
      ></textarea>
    </SkeletonLoading>
  </div>
</template>

<script lang="ts">
import SkeletonLoading from '@/components/SkeletonLoading.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BohrTextField',
  inheritAttrs: false,
  components: {
    SkeletonLoading,
  },
  props: {
    modelValue: String,
    label: String,
    id: String,
    isLoading: Boolean,
    required: Boolean,
  },
  emits: ['update:modelValue'],
  computed: {
    height() {
      return Number(this.$attrs.rows) * 40 || 40;
    }
  },
});
</script>

<style scoped>
  .bohr__text__area__container {
    position: relative;
    display: inline-block;
    font-size: 12px;
  }

  .bohr__text__required {
    color: red;
  }

  .bohr__text__area__label {
    display: block;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 8px;
    color: hsl(0, 0%, 100%);
  }

  
  .bohr__text__area {
    background: linear-gradient(180deg, transparent 0%, hsla(0, 0%, 100%, 0.05) 100%);
    border-radius: 4px;
    border: 1px solid hsl(0, 0%, 100%, 0.1);
    height: v-bind(height)px;
    box-sizing: border-box;
    color: inherit;
    width: 100%;
    outline-offset: 2px;
    padding: 13px;
  }
</style>
