<template>
  <div class="datepicker__container">
    <label v-if="label" :for="`dp-input-${id}`" class="datepicker__label">
      {{ label }}
    </label>
    <Datepicker
      v-bind="$attrs"
      dark
      :locale="$i18n.locale"
      :uid="id"
      six-weeks
      input-class-name="bohr-dp"
    ></Datepicker>
  </div>
</template>

<script lang="ts">
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    Datepicker,
  },
  props: {
    label: String,
    id: {
      type: String,
      required: true,
    }
  },
  inheritAttrs: false,
});
</script>

<style scoped>
.datepicker__label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 8px;
}

:deep(.bohr-dp) {
  appearance: none;
  background: linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.05) 100%);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: 40px;
  padding-block: 0;
  padding-inline: 35px 13px;
  box-sizing: border-box;
  color: inherit;
  width: 100%;
}

:deep(.bohr-dp):focus{
  outline: 1px solid white;
  outline-offset: 2px;
}
</style>