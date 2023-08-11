<template>
  <div
    ref="container"
    class="bohr__custom--select"
    :class="{ with__validation: validationStatus }"
    @keydown="handleKeydown"
  >
    <SkeletonLoading :isShowing="isLoading">
      <input
        type="text"
        v-model="inputValue"
        :placeholder="placeholder"
        :readonly="!open"
        class="filter__input"
        @click="open = !open"
      />
  
      <img class="arrow" src="../../public/assets/svg/arrow-select.svg" alt="">
    </SkeletonLoading>

    <div class="dropdown" :class="{ selectHide: !open }">
      <div class="items" ref="items">

        <template v-for="option, index in filteredOptions" :key="option">
          <div
            :class="{ disabled: option.disabled, selecting: index === selectingIndex }"
            @click="handleOptionClick"
            @mouseover="selectingIndex = index"
          >
            <span class="label">{{ option.label || option.value }}</span>
          </div>
        </template>

      </div>
      <slot name="addon"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { ValidationStatus } from '@/types';
import SkeletonLoading from '@/components/SkeletonLoading.vue';
import getValidationColor from '@/utils/getValidationColor';
import { defineComponent, nextTick, PropType } from 'vue'

type OptionField = {
  value: string
  label?: string
  disabled?: boolean
}

export default defineComponent({
  components: {
    SkeletonLoading,
  },
  props: {
    isLoading: Boolean,
    modelValue: {
      type: String,
      default: '',
    },

    placeholder: {
      type: String,
      default: '',
    },

    options: {
      type: Array as PropType<OptionField[]>,
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
      inputValue: this.modelValue,
      isFilterEnabled: false,
      selectingIndex: this.options.findIndex(({ value }) => value === this.modelValue),
    };
  },
  computed: {
    filteredOptions() {
      const searchRegex = new RegExp(this.inputValue, 'i');

      return this.isFilterEnabled
        ? this.options.filter(({ value }) => searchRegex.test(value))
        : this.options; 
    },

    colorHslValues() {
      return getValidationColor(this.validationStatus);
    },
  },
  watch: {
    open() {
      this.selectingIndex = this.options.findIndex(({ value }) => value === this.modelValue);

      if (this.open) {
        this.addEventListeners();
        this.scrollSelectingIntoView();
      } else {
        this.isFilterEnabled = false;
        this.inputValue = this.modelValue;
        this.removeEventListeners();
        (this.$refs.items as HTMLDivElement).scrollTop = 0;
      }
    },

    modelValue() {
      this.inputValue = this.modelValue;
    },

    inputValue() {
      if (this.open) {
        this.isFilterEnabled = true;
        this.selectingIndex = 0;
      }
    },
  },
  beforeUnmount() {
    this.removeEventListeners();
  },
  methods:{
    setSelected(){
      const newOption = this.filteredOptions[this.selectingIndex];

      if (newOption.disabled) {
        return;
      }

      const hasNewValueInOptions = this.options.find(({ value }) => value === newOption?.value);

      if (!hasNewValueInOptions) {
        this.inputValue = this.modelValue;
      } else {
        this.$emit('update:modelValue', newOption.value);
      }

      this.open = false;
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

    handleOptionClick() {
      this.setSelected();
    },

    handleKeydown(e: KeyboardEvent) {
      const actionMap: Record<KeyboardEvent['key'], () => void> = {
        escape: () => {
          this.inputValue = this.modelValue;
          this.open = false;
        },

        enter: () => {
          if (this.open) {
            this.setSelected();
          } else {
            this.open = true;
          }
        },

        arrowup: () => {
          e.preventDefault();
          if (this.selectingIndex > 0) {
            this.selectingIndex--;
            this.scrollSelectingIntoView();

            if (!this.open) {
              this.setSelected();
            }
          }
        },

        arrowdown: () => {
          e.preventDefault();
          if (this.selectingIndex < this.filteredOptions.length - 1) {
            this.selectingIndex++;
            this.scrollSelectingIntoView();

            if (!this.open) {
              this.setSelected();
            }
          }
        },
      };

      const pressedKey = e.key.toLowerCase();
      actionMap[pressedKey]?.();
    },

    async scrollSelectingIntoView() {
      await nextTick();

      (this.$refs.container as HTMLDivElement)
        .querySelector('.selecting')
        ?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
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

.filter__input {
  background-color: transparent;
  border: none;
  color: inherit;
  font-size: 14px;
  line-height: 1em;
  padding: 11px;
  border: none;
  cursor: pointer;
  box-sizing: border-box;
  width: 100%;
  outline-offset: 2px;
}

.bohr__custom--select .items .label{
  margin-left: 12px;
  font-size: 14px;
  line-height: 1em;
  font-weight: 400;
}

.arrow {
  position: absolute;
  top: 16px;
  right: 12px;
  cursor: pointer;
  pointer-events: none;
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

.bohr__custom--select .items div.selecting {
  background-image: linear-gradient(180deg, hsl(21, 89%, 52%) 0%, hsl(355, 78%, 60%) 100%);
}

.selectHide {
  display: none;
}
</style>
