<template>
  <component
    :is="component"
    class="bohr__button"
    :class="[
      {
        'danger': isDanger,
        'bohr__button--full-width': isFullWidth,
      },
      variantClass,
      sizeClass,
    ]"
  >
    <div
      v-if="$slots.iconLeft"
      class="bohr__button__icon"
    >
      <slot name="iconLeft"></slot>
    </div>

    <span class="bohr__button__text">
      <slot></slot>
    </span>

    <div
      v-if="$slots.iconRight"
      class="bohr__button__icont"
    >
      <slot name="iconRight"></slot>
    </div>
  </component>  
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'BohrButton',
  props: {
    size: {
      type: String,
      default: 'md',
      validator(value: string) {
        return ['sm', 'md', 'lg'].includes(value);
      }
    },
    variant: {
      type: String,
      default: 'default',
      validator(value: string) {
        return ['default', 'ghost'].includes(value);
      }
    },
    component: {
      type: [String, Object],
      default: 'button'
    },
    iconSide: {
      type: String,
      default: 'left',
      validator(value: string) {
        return ['left', 'right'].includes(value);
      }
    },
    color: {
      type: String as PropType<'primary' | 'secundary' | 'black'>,
      default: 'primary',
      validator(value: string) {
        const validValues = ['primary', 'secundary', 'black'];
        const isValid = validValues.includes(value);
        if (!isValid) {
          console.warn('invalid BohrButton color prop');
          console.warn('color prop value must be one of:', validValues);
        }
        return isValid;
      },
    },
    isDanger: Boolean,
    isFullWidth: Boolean,
    label: String,
  },
  data() {
    const colorsMap = {
      primary: {
        c1: '21, 89%, 52%',
        c2: '355, 78%, 60%',
        text: '0, 0%, 100%',
        highlight: '47, 89%, 59%',
      },
      secundary: {
        c1: '181, 69%, 61%',
        c2: '131, 67%, 60%',
        text: '0, 0%, 0%',
        highlight: '131, 89%, 59%',
      },
      black: {
        c1: '0, 0%, 0%',
        c2: '0, 0%, 0%',
        text: '0, 0%, 100%',
        highlight: '0, 0%, 0%',
      },
    };

    return {
      variantClass: `bohr__button--${this.variant}`,
      sizeClass: `bohr__button--${this.size}`,
      colors: colorsMap[this.color],
    }
  }
});
</script>

<style scoped>
  .bohr__button {
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 14px;
    
    border: none;
    border-radius: 2px;
    padding: 0;

    letter-spacing: 0.25px;
    font-weight: 700;
    color: #FFFFFF;
    text-align: center;
    text-transform: uppercase;
  }

  .bohr__button:not(:disabled):hover {
    cursor: pointer;
  }
  
  .bohr__button:not(:disabled):active {
    box-shadow: inset 0px 6px 6px rgba(0, 0, 0, 0.25);
  }

  
  /* Size options */
  .bohr__button--sm {
    padding: 11px;
    font-size: 12px;
    line-height: 14px;
  }

  .bohr__button--md {
    padding: 13px;
    font-size: 12px;
    line-height: 14px;
  }
  
  .bohr__button--lg {
    padding: 15px;
    font-size: 16px;
    line-height: 18px;
  }

  .bohr__button--full-width {
    width: 100%;
  }


  /* Icon options */
  .bohr__button__icon {
    display: grid;
    place-content: center;
    position: relative;
    z-index: 1;
    width: 12px;
    height: 12px;
    margin: 0;
  }

  .bohr__button:not(:disabled):hover .bohr__button__icon,
  .bohr__button:not(:disabled):hover .bohr__button__text {
    filter: drop-shadow(0px 0px 5px hsl(v-bind('colors.highlight')));
  }
  
  .bohr__button:disabled .bohr__button__icon {
    filter: brightness(0);
  }


  /* Default variant */
  .bohr__button--default:not(:disabled) {
    color: hsl(v-bind('colors.text'));
    background-image: linear-gradient(180deg, hsl(v-bind('colors.c1')) 0%, hsl(v-bind('colors.c2')) 100%);
  }

  .bohr__button--default:not(:disabled).danger {
    background: #E84855;
  }
  
  .bohr__button--default:not(:disabled):focus,
  .bohr__button--default:not(:disabled):hover {
    background-image: linear-gradient(0deg, hsla(v-bind('colors.c2'), 0.5), hsla(v-bind('colors.c2'), 0.5)),
                      linear-gradient(180deg, hsl(v-bind('colors.c1')) 0%, hsl(v-bind('colors.c2')) 100%);
  }

  .bohr__button--default:not(:disabled).danger:focus,
  .bohr__button--default:not(:disabled).danger:hover {
    background: #D73744;
  }

  .bohr__button--default:disabled {
    background-color: #666666;
    color: black
  }
  

  /* Ghost variant */
  .bohr__button--ghost {
    background: none;
  }
  
  .bohr__button--ghost:not(:disabled)::before,
  .bohr__button--ghost:not(:disabled)::after {
    content: '';
    position: absolute;
    inset: 0px;
    pointer-events: none;
  }

  .bohr__button--ghost:not(:disabled)::before {
    border-radius: 2px;
  }

  .bohr__button--ghost:not(:disabled)::after {
    border-width: 1px;
    border-style: solid;
    border-image-slice: 1;
    border-image-source: linear-gradient(180deg, hsl(v-bind('colors.c1')) 0%, hsl(v-bind('colors.c2')) 100%);
  }
  
  .bohr__button--ghost:not(:disabled):hover {
    background-image: linear-gradient(180deg, hsla(v-bind('colors.c1'), 0.75) 0%, hsla(v-bind('colors.c2'), 0.75) 100%);
  }

  .bohr__button--ghost:not(:disabled).danger {
    color: hsl(355, 67%, 53%);
  }
  
  .bohr__button--ghost:not(:disabled)::after {
    border-color: hsl(355, 67%, 53%);
    border-image-source: unset;
  }

  .bohr__button--ghost:not(:disabled).danger:focus,
  .bohr__button--ghost:not(:disabled).danger:hover {
    background-color: hsl(355, 67%, 53%);
    color: hsl(0, 0%, 0%);
  }

  .bohr__button--ghost:disabled {
    color: #666666;
    border: 1px solid #666666;
    padding: 10px;
  }
</style>