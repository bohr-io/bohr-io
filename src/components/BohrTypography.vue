<template>
  <component :is="tag" class="bohr__typography">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import typographyColection from '@/assets/typography.json';
import { defineComponent, PropType } from 'vue';

type GlobalCSSProp = 'inherit' | 'initial' | 'revert' | 'revert-layer' | 'unset'
type TextAlign = 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'justify-all' | 'match-parent' | GlobalCSSProp
type TextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'full-width' | 'full-size-kana' | GlobalCSSProp

export default defineComponent({
  props: {
    color: {
      type: String,
      default: 'inherit'
    },
    textAlign: {
      type: String as PropType<TextAlign>,
      default: 'initial',
    },
    textTransform: {
      type: String as PropType<TextTransform>,
      default: 'initial',
    },
    tag: {
      type: String,
      default: 'span'
    },
    variant: {
      type: String as PropType<keyof typeof typographyColection>,
      default: 'body1',
    },
  },
  computed: {
    typography() {
      const _typography = typographyColection[this.variant];
      if (this.textTransform) _typography.textTransform = this.textTransform;
      return _typography;
    },
  }
});
</script>

<style scoped>
.bohr__typography {
  display: block;
  margin: 0;
  font-size: v-bind('typography.fontSize');
  font-weight: v-bind('typography.fontWeight');
  line-height: v-bind('typography.lineHeight');
  letter-spacing: v-bind('typography.letterSpacing');
  text-transform: v-bind('typography.textTransform');
  text-align: v-bind(textAlign);
  color: v-bind(color);
}
</style>