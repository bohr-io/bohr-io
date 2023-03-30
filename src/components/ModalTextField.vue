<template>
  <div class="modal__textfield">
    <label v-if="label" :for="id">
      {{ label }}
    </label>
    <input
      :id="id"
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  inheritAttrs: false,
  props: {
    label: String,
    id: {
      type: String,
      required: true,
    },
    modelValue: [String, Number],
  },
});
</script>

<style scoped>
.modal__textfield label {
  display: block;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.modal__textfield input {
  padding: 10px 12px;
  width: 100%;
  box-sizing: border-box;
}
</style>