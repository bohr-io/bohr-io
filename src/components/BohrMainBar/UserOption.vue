<template>
  <div class="option__toggle" :class="{ expanded: isExpanded }">
    <span class="toggle__label">{{ label }}</span>
    <div class="toggle__options__container">
      <template v-for="option in options" :key="option.value">
        <button class="toggle__option" :class="{ selected: selected === option.value }" @click="select(option.value)">
          <img class="toggle__option__img" width="24" height="24" :src="option.icon" alt="" />
          <span class="toggle__option__text">{{ option.name }}</span>
        </button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: ['label', 'options', 'isExpanded'],
  emits: ['select'],
  data() {
    return {
      selected: this.options.find((option) => option.isDefault)?.value,
    }
  },
  methods: {
    select(option) {
      this.selected = option;
      this.$emit('select', option);
    }
  }
}
</script>

<style scoped>
.toggle__label {
  display: block;
  width: max-content;
  font-size: 12px;
  line-height: 14px;
  font-weight: 700;
  text-transform: uppercase;
  margin-inline: auto;
}

.option__toggle.expanded .toggle__label {
  margin-left: unset;
}

.toggle__options__container {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 4px;
}

.toggle__option {
  border: 1px solid transparent;
  padding: 12px 9px;
  width: 48px;
  height: 48px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  cursor: pointer;
}

.option__toggle.expanded .toggle__option {
  width: 58px;
  height: 76px;
}

.toggle__option.selected {
  border: 1px solid rgba(85, 221, 224, 0.5);
  box-shadow: 0 0 10px rgba(85, 221, 224, 0.4);
  cursor: initial;
}

.toggle__option__img {
  object-fit: cover;
  border-radius: 9999px;
}

.toggle__option__text {
  display: none;
}

.option__toggle.expanded .toggle__option__text {
  display: initial;
  color: white;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  text-transform: uppercase;
  display: inline-block;
  margin-top: 12px;
}
</style>