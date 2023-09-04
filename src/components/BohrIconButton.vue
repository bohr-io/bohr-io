<template>
  <component
    :is="component"
    :type="component === 'button' ? 'button' : undefined"
    :aria-label="label"
    class="bohr__icon__button"
    :class="{
      'hover__enabled': !withoutHoverEffect,
    }"
    :style="{
      '--background-color': backgroundColor
    }"
    v-tooltip="{
      content: label,
      disabled: hiddenLabel,
      distance: 15,
    }"
  >
    <div class="icon__wrapper" >
      <slot></slot>
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    component: {
      type: [String, Object],
      default: 'button',
    },
    backgroundColor: {
      type: String,
      default: 'none'
    },
    label: {
      type: String,
      required: true,
    },
    withoutHoverEffect: {
      type: Boolean,
      default: false,
    },
    hiddenLabel: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped>
.bohr__icon__button {
  display: inline-flex;
  background: var(--background-color);
  border: none;
  padding: 0;
  border-radius: 9999px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.bohr__icon__button:disabled {
  filter: grayscale(1) brightness(0.7);
}
.icon__wrapper {
  display: grid;
  place-content: center;
  background: none;
  border: none;
  width: max-content;
  height: max-content;
  padding: 0;
  font-size: 0;
  transition: 250ms ease-in-out;
  transition-property: opacity, background-color;
  border-radius: 9999px;
}

.icon__wrapper:disabled {
  opacity: 0.1;
}

.hover__enabled {
  padding: 6px;
}

.hover__enabled:not(:disabled):focus,
.hover__enabled:not(:disabled):hover {
  background-color: hsl(0, 0%, 80%);
}
</style>
