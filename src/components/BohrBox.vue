<template>
  <component
    :is="tag"
    class="bohr__box"
    :class="['bohr__box--' + variant, { 'bohr__box--interactive': isInteractive }, borderClass]"
    >
    <slot></slot>
    <svg
      v-if="!shadowLess"
      preserveAspectRatio="none"
      viewBox="0 0 20 20"
      class="bohr__box__shadow"
    >
      <circle cx="10" cy="10" r="10" fill="black" />
    </svg>
  </component>
</template>

<script lang="ts">
import { PropType } from 'vue';

export default {
  name: 'BohrBox',
  props: {
    isInteractive: Boolean,
    shadowLess: Boolean,
    component: String,
    color: { 
      type: String,
      required: false
    },
    variant: {
      type: String as PropType<'outline' | 'glass' | 'outline-danger' | 'outline-highlight'>,
      default: 'outline',
      validator(value: string) {
        const variants = ['outline', 'glass', 'outline-danger', 'outline-highlight'];
        const isValid = variants.includes(value);
        if (!isValid) {
          console.warn(`'${value}' is not a valid BohrBox variant`);
          console.warn('BohrBox variants:', variants);
        }
        return isValid;
      },
    },
  },
  data() {
    const defaultIs = this.isInteractive ? 'button' : 'div';

    return {
      tag: this.component ? this.component : defaultIs,
    }
  },
  computed: {
    borderClass() {
      switch (this.color) {
        case 'orange':
          return 'bohr__box__orage--outline';
        case 'green':
          return 'bohr__box__green--outline';
        case 'purple':
          return 'bohr__box__purple--outline';
        case 'red':
          return 'bohr__box__red--outline';
        default:
          return 'bohr__box--outline';
      }
    },
  }
}
</script>

<style scoped>
.bohr__box {
  --border-radius: 8px;

  position: relative;
  margin-bottom: 20px;
  border-radius: var(--border-radius);
}

.bohr__box::before,
.bohr__box::after {
  pointer-events: none;
}

.bohr__box__shadow {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: -1;
  display: inline-block;
  width: 100%;
  height: 14px;
  border-radius: 100%;
  filter: blur(15px);
  pointer-events: none;
}


/* interactive box */
.bohr__box--interactive {
  background-color: unset;
  padding: unset;
  border: unset;
  text-align: unset;
  display: block;
  width: 100%;
  color: inherit;
  cursor: pointer;
  transition: box-shadow var(--transition);
}

.bohr__box--interactive:focus,
.bohr__box--interactive:hover {
  box-shadow: 0px 12px 36px 5px rgba(255, 0, 13, 0.3);
}

.bohr__box--interactive::before,
.bohr__box--interactive::before {
  content: "";
  opacity: 0;
  transition: opacity var(--transition);
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: var(--border-radius);
  border: 2px solid transparent;
  background-image: linear-gradient(0deg, #E84856, #F16622, #F4CD3B); 
  background-origin: border-box;
  pointer-events: none;

  -webkit-mask: linear-gradient(#fff 0 0) padding-box,
                linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) padding-box,
                linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude; 
}

.bohr__box--interactive:focus::before,
.bohr__box--interactive:hover::before {
  --border-width: 4px;

  opacity: 1;
}


/* outline variant */
[class*='bohr__box--outline'] {
  --box-color: 0, 0%, 100%;
  border: 1px solid hsl(var(--box-color), 0.1);
}
[class*='bohr__box__orage--outline'] {
  --box-color: 21, 89%, 52%;
  border: 1px solid hsl(var(--box-color), 0.1);
}
[class*='bohr__box__green--outline'] {
  --box-color: 131, 67%, 60%;
  border: 1px solid hsl(var(--box-color), 0.1);
}
[class*='bohr__box__purple--outline'] {
  --box-color: 284, 31%, 51%;
  border: 1px solid hsl(var(--box-color), 0.1);
}
[class*='bohr__box__red--outline'] {
  --box-color: 355, 78%, 60%;
  border: 1px solid hsl(var(--box-color), 0.1);
}

[class*='bohr__box--outline']::after {
  content: '';
  position: absolute;
  inset: -1px;
  z-index: -1;
  border-radius: var(--border-radius);
  transition: background-color var(--transition);
  background-color: hsl(var(--box-color));

  mask-repeat: no-repeat;
  mask-image: radial-gradient(100% 2px at top, black 0, transparent 60%),
              linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.05)),
              radial-gradient(100% 2px at bottom, black 0, transparent 60%);
}


/* outline-highlight AND outline-danger */
.bohr__box--outline-highlight::after,
.bohr__box--outline-danger::after {
  mask-image: radial-gradient(100% 2px at top, black 0, transparent 60%),
              linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.05)),
              radial-gradient(100% 100px at 50% 45.5px , rgb(0, 0, 0, 0.2), transparent),
              radial-gradient(100% 2px at bottom, black 0, transparent 60%);  
}

.bohr__box--outline-danger {
  --box-color: 355, 78%, 60%;
}

.bohr__box--outline-highlight {
  --box-color: 191, 100%, 50%;
}


/* glass variant */
.bohr__box--glass::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  border-radius: var(--border-radius);
  background-image: linear-gradient(251.43deg, transparent 29.08%, rgba(255, 255, 255, 0.2) 56.83%, transparent 57.84%);
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.1),
              inset 0 0 0 10px rgba(255, 255, 255, 0.1);
}
</style>