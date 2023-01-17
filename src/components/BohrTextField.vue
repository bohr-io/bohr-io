<template>
  <div class="bohr__text__field__container">
    <label v-if="label" :for="id" class="bohr__text__field__label">
      {{ label }}
    </label>
    <SkeletonLoading :isShowing="isLoading">
      <div class="bohr__text__field__input__container">
        <input
          ref="input"
          :id="id"
          :type="inputType"
          :class="[
            type === 'password' ? 'bohr__text__hidden':'bohr__text__field',
            {
              with__validation: validationStatus,
              error: hasError
            }
          ]"
          :value="modelValue"
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          v-bind="$attrs"
        />
        <div class="text__field__addons">
          <component v-if="validationIcon" :is="validationIcon" :sizePx="14" :color="`hsl(${colorHslValues})`" />
          <div v-if="!hiddenToggleDisabled && type === 'password'">
            <VTooltip>
              <button
                type="button"
                class="visibility__toggle__btn"
                :title="$t('components.textField.toggleVisibility')"
                :aria-label="$t('components.textField.toggleVisibility')"
                @click="isTextVisible = !isTextVisible"
              >
                <EyeIcon :hasSlash="isTextVisible" />
              </button>
              <template #popper>
                {{ $t('components.textField.toggleVisibility') }}
              </template>
            </VTooltip>
          </div>
        </div>
      </div>
    </SkeletonLoading>
  </div>
</template>

<script lang="ts">
import CheckIcon from '@/components/icons/CheckIcon.vue';
import EyeIcon from '@/components/icons/EyeIcon.vue';
import WaitIcon from '@/components/icons/WaitIcon.vue';
import XIcon from '@/components/icons/XIcon.vue';
import SkeletonLoading from '@/components/SkeletonLoading.vue';
import { ValidationStatus } from '@/types';
import getValidationColor from '@/utils/getValidationColor';
import { defineComponent, PropType } from 'vue';

function consoleWarnInvalidProp(propName: string, availableOptions: string[]) {
  console.warn(
    `The provided "${propName}" is not valid.` + '\n' +
    `It should be a String with the "${propName}" name`  + '\n' +
    `The available variants are: ${availableOptions.join(', ')}`
  )
}

export default defineComponent({
  name: 'BohrTextField',
  inheritAttrs: false,
  components: {
    CheckIcon,
    EyeIcon,
    WaitIcon,
    XIcon,
    SkeletonLoading,
},
  props: {
    modelValue: [String, Number],
    label: String,
    id: String,
    type: {
      type: String,
      default: 'text',
      validator(value: string) {
        const variantOptions = ['text', 'password', 'email', 'number'];
        const isValidProp = variantOptions.includes(value);
        
        if (!isValidProp) consoleWarnInvalidProp('type', variantOptions);

        return isValidProp;        
      }
    },
    validationStatus: {
      type: String as PropType<ValidationStatus>,
      default: '',
    },

    hiddenToggleDisabled: Boolean,
    hasError: Boolean,
    autoFocus: Boolean,
    isLoading: Boolean,
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isTextVisible: false
    }
  },
  computed: {
    inputType() {
      if (this.type === 'password') {
        if (!this.isTextVisible) return 'password';
        return 'text';
      }
      return this.type;
    },

    colorHslValues() {
      return getValidationColor(this.validationStatus);
    },

    validationIcon() {
      if (!this.validationStatus) return '';

      const validationIconMap = {
        error: 'XIcon',
        warn: 'WaitIcon',
        success: 'CheckIcon',
      };

      return validationIconMap[this.validationStatus];
    },
  },

  mounted(){
    this.$nextTick(()=>{
      this.focusInput();
    })
  },

  methods:{
    focusInput(){
      let input;
      if(this.autoFocus){
        const inputFocus = this.$refs.input as any;
        input = inputFocus.focus();
      }
      return input;
    }
  }
});
</script>

<style scoped>
  .bohr__text__field__container {
    position: relative;
    display: inline-block;
    font-size: 12px;
  }

  .bohr__text__field__label {
    display: block;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 8px;
    color: hsl(v-bind(colorHslValues));
  }

  .bohr__text__field__input__container {
    position: relative;
  }

  .bohr__text__field,
  .bohr__text__hidden{
    background: linear-gradient(180deg, transparent 0%, hsla(0, 0%, 100%, 0.05) 100%);
    border-radius: 4px;
    border: 1px solid hsl(0, 0%, 100%, 0.1);
    height: 40px;
    box-sizing: border-box;
    color: inherit;
    width: 100%;
    outline-offset: 2px;
  }

  .with__validation {
    border-color: hsl(v-bind(colorHslValues));
  }  

  .bohr__text__field {
    padding: 13px;
  }

  .bohr__text__hidden{
    padding: 13px 44px 13px 13px;
  }

  .bohr__text__field.error,
  .bohr__text__hidden.error{
    background: linear-gradient(180deg, transparent 0%, hsla(355, 78%, 60%, 0.1) 100%);
    border: 1px solid hsl(355, 78%, 60%, 0.5);
  }

  .text__field__addons {
    position: absolute;
    top: 50%;
    right: 14px;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
  }

  .visibility__toggle__btn {
    background: none;
    border: none;
    opacity: 0.1;
    cursor: pointer;
    font-size: 0;
    padding: 0;
  }

  .visibility__toggle__btn:focus,
  .visibility__toggle__btn:hover {
    opacity: 0.5;
  }
</style>
