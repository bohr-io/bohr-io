<template>
  <div
    ref="container"
    class="bohr__custom--select"
    :class="{ with__validation: validationStatus }"
    tabindex="0"
    @click="open = !open"
    @keypress.prevent.enter="open = !open"
  >
    <div class="selected" :class="{ open: open }">
      <input type="text" :value="modelValue" :placeholder="placeholder" readonly tabindex="-1" class="label" />
      <img class="arrow" src="../../public/assets/svg/arrow-select.svg" alt="">
    </div>
    <div class="dropdown" :class="{ selectHide: !open }">
      <div class="items">

        <template v-if="(typeof options[0] === 'string')">
          <div
            v-for="option in (options as string[])"
            :key="option"
            @click="setSelected(option)"
          >
            <span class="label">{{ option }}</span>
          </div>
        </template>

        <template v-else>
          <div
            v-for="option in (options as OptionField[])"
            :key="option.value"
            :class="{ disabled: option.disabled }"
            @click="!option.disabled && setSelected(option.value)"
          >
            <span class="label">{{ option.value }}</span>
          </div>
        </template>

      </div>
      <slot name="addon"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { ValidationStatus } from '@/types';
import getValidationColor from '@/utils/getValidationColor';
import { defineComponent, PropType } from 'vue'

type OptionField = { value: string, disabled?: boolean, disabledTooltip?: string }

export default defineComponent({
  props: {
    modelValue: String,

    placeholder: {
      type: String,
      default: '',
    },

    options: {
      type: Array as PropType<string[] | OptionField[]>,
      required: true,
    },
    validationStatus: {
      type: String as PropType<ValidationStatus>,
      default: '',
    },
  },
  emits: ['update:modelValue'],  
  data() {
    return {
      open: false,
    };
  },
  computed: {
    colorHslValues() {
      return getValidationColor(this.validationStatus);
    },
  },
  watch: {
    open() {
      if (this.open) {
        this.addEventListeners();
      } else {
        this.removeEventListeners();
      }
    }
  },
  beforeUnmount() {
    this.removeEventListeners();
  },
  methods:{
    setSelected(option: string){
      this.$emit('update:modelValue', option);
    },

    addEventListeners() {
      document.addEventListener('click', this.closeListener);
      document.addEventListener('focusin', this.closeListener);
    },
    
    removeEventListeners() {
      document.removeEventListener('click', this.closeListener);
      document.removeEventListener('focusin', this.closeListener);
    },

    closeListener(e: MouseEvent | FocusEvent) {
      const container = this.$refs.container as HTMLDivElement;

      if (!container || container.contains(e.target as Node)) return;

      this.open = false;
    },
  }
});
</script>

<style scoped>
.bohr__custom--select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  background: linear-gradient( 180deg, rgba(255, 255, 255, 1e-5) 0%, hsla(0, 0%, 100%, 0.05) 100% );
  border: 1px solid hsla(0, 0%, 100%, 0.1);
  border-radius: 4px;
  margin-bottom: 8px;
}

.bohr__custom--select:focus {
  outline: 1px solid white;
  outline-offset: 2px;
}

.with__validation {
  border-color: hsl(v-bind(colorHslValues));
}  

.bohr__custom--select .selected {
  display: flex;
  align-items: center;
  padding: 11px;
  color: hsl(0, 0%, 100%);
  cursor: pointer;
  user-select: none;
}

.bohr__custom--select .selected .label {
  background-color: transparent;
  border: none;
  pointer-events: none;
  color: inherit;
  font-size: 14px;
  line-height: 1em;
  padding: 0;
  border: none;
}

.bohr__custom--select .items .label{
  margin-left: 12px;
  font-size: 14px;
  line-height: 1em;
  font-weight: 400;
}

.bohr__custom--select .selected .arrow {
  position: absolute;
  top: 16px;
  right: 12px;
  cursor: pointer;
}

.bohr__custom--select .dropdown {
  border-radius: 0 0 6px 6px;
  border: 1px solid hsla(0, 0%, 100%, 0.1);
  position: absolute;
  top: 40px;
  background: hsl(0, 0%, 7%);
  left: 0;
  right: 0;
  z-index: 1;
}

.bohr__custom--select .items {
  color: hsl(0, 0%, 100%);
  overflow-y: scroll;
  max-height: 350px;
}

.bohr__custom--select .items div {
  color: hsl(0, 0%, 100%);
  padding: 10px 12px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
}

.bohr__custom--select .items div.disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

.bohr__custom--select .items div:hover {
  background-image: linear-gradient(180deg, hsl(21, 89%, 52%) 0%, hsl(355, 78%, 60%) 100%);
}

.selectHide {
  display: none;
}
</style>
