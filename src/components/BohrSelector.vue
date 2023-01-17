<template>
  <div class="selector__container">
    <button
      class="selector__button"
      :class="isOpen && 'active'"
      @click="toggle"
    >
      <span v-if="!hideSelected">{{ selectedOption }}</span>
      <figure class="selector__button--figure">
        <img src="/assets/svg/arrow-down-small.svg" class="selector__button--icon">
      </figure>
    </button>
  
    <ul class="selector__dropdown" v-if="isOpen">
      <li
        v-for="option in options"
        :key="option"
        class="selector__item"
        @click="select(option)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BohrSelector',
  props: {
    hideSelected: Boolean,
    defaultOption: String,
    options: {
      type: Array,
      required: true,
      validator(value) {
        const isValid = value.every((option) => typeof option === 'string');
        if (!isValid) console.warn('The options prop (for "BohrSelector") must be a Array with only Strings.');
        return isValid;
      }
    }
  },
  emits: ['selected'],
  data() {
    return {
      selectedOption: this.defaultOption || this.options[0],
      isOpen: false
    };
  },
  watch: {
    options(newOptions) {
      if(!this.defaultOption && !this.selectedOption) {
        this.selectedOption = newOptions[0];
      }
    }
  },
  mounted() {
    document.addEventListener("click", this.close);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.close);
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },

    close(e) {
      if (!this.$el.contains(e.target)) {
        this.isOpen = false;
      }
    },

    select(option) {
      this.$emit('selected', option);
      this.selectedOption = option;
      this.toggle();
    }
  }
}
</script>

<style scoped>
  .selector__container {
    position: relative;
    display: inline-block;
  }  

  .selector__dropdown {
    position: absolute;
    top: 100%;
    left: 100%;
    transform: translateX(-100%);

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;

    min-width: 100%;
    width: max-content;
    margin-top: 8px;
    padding: 8px;
    box-sizing: border-box;
    
    border-radius: 4px;
    background: rgba(255, 255, 255, 1);
    box-shadow: var(--project-shadow);
    list-style: none;
    z-index: 100;
  }

  .selector__item {
    text-decoration: none;
    color: #212529;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 100%;
  }

  .selector__item:hover {
    color: #F16622;
  }

  .selector__button {
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    color: #121212;
    border: none;
    cursor: pointer;
  }

  .selector__button--figure {
    display: inline-block;
    width: 14px;
    height: 14px;
    background-color: var(--breadcrumb-color);
    margin: 0;
    padding: 4px;
    border-radius: 4px;
    line-height: 0;
  }

  .selector__button--icon {
    width: 100%;
    height: 100%;
  }

  .selector__button.active .selector__button--figure,
  .selector__button:hover .selector__button--figure {
    background: rgba(232, 72, 85, 1);
  }

  .selector__button.active .selector__button--icon,
  .selector__button:hover .selector__button--icon {
    filter: invert(98%) sepia(0%) saturate(7500%) hue-rotate(214deg) brightness(102%) contrast(107%);
  }
</style>