<template>
  <div class="bohr__switch__container">
    <label v-if="label" :for="id" class="bohr__switch__label">
      {{ label }}
    </label>
    <input
      :id="id"
      class="bohr__switch"
      type="checkbox"
      v-model="value"
      v-bind="$attrs"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  inheritAttrs: false,
  emits: ['update:modelValue'],
  props: {
    id: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
    label: String,
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', value)
      }
    }
  },
})
</script>

<style scoped>
.bohr__switch__container  {
  display: inline-block;
}

.bohr__switch__label {
  display: block;
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.bohr__switch {
  position: relative;
  appearance: none;
  width: 40px;
  height: 20px;
  border: 1px solid hsla(0, 0%, 100%, 1);
  border-radius: 9999px;
  cursor: pointer;
  margin-block: 9px;
}

.bohr__switch::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: linear-gradient(hsla(21, 89%, 52%, 1), hsla(355, 78%, 60%, 1));
  border-radius: 9999px;
  opacity: 0;
  transition: opacity var(--transition);
}

.bohr__switch:checked::before {
  opacity: 1;
}

.bohr__switch::after {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  width: 16px;
  height: 16px;
  background-color: hsla(0, 0%, 100%, 1);
  border-radius: 9999px;
  transition: transform var(--transition);
}

.bohr__switch:checked::after {
  transform: translateX(20px);
}
</style>
