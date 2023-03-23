<template>
  <ModalBase
    class="hightchart__settings__modal"
    :isVisible="isVisible"
    @close="close"
  >
    <div class="highchart__options">
      <BohrTypography tag="h2" variant="title2" color="hsl(355, 78%, 60%)">
        {{ $t('analytics.chartOptionsModal.title') }}
      </BohrTypography>
      <label>
        <BohrTypography tag="p" variant="title4">
          {{ $t('analytics.chartOptionsModal.label') }}
          <a
            href="https://www.highcharts.com/demo/dark-unica"
            target="_blank"
            rel="noreferrer"
            style="color: hsl(21, 89%, 52%)"
          >
            ({{ $t('common.reference') }})
          </a>
        </BohrTypography>
        <MonacoEditor
          theme="vs-dark"
          language="javascript"
          :options="{
            automaticLayout: true,
            minimap: { enabled: false },
          }"
          :height="400"
          v-model:value="internalSettingsValue"
        ></MonacoEditor>
      </label>
      <div class="modal__buttons">
        <BohrButton size="lg" color="black" @click="close">{{ $t('common.cancel') }}</BohrButton>
        <BohrButton size="lg" @click="save">{{ $t('common.save') }}</BohrButton>
      </div>
    </div>
  </ModalBase>
</template>

<script lang="ts">
import BohrButton from '@/components/BohrButton.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import ModalBase from '@/components/ModalBase.vue';
import MonacoEditor from 'monaco-editor-vue3';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    BohrButton,
    BohrTypography,
    MonacoEditor,
    ModalBase,
  },
  emit: ['newSettings', 'close'],
  props: {
    isVisible: Boolean,

    initialSettings: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      internalSettingsValue: '',
    };
  },
  watch: {
    isVisible(newIsVisible) {
      if (newIsVisible === true) {
        this.internalSettingsValue = this.initialSettings;
      }
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },

    save() {
      this.$emit('newSettings', this.internalSettingsValue);
    },
  },
});
</script>

<style scoped>
.hightchart__settings__modal {
  width: 80vw;
  max-width: 810px;
}

.highchart__options label {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 6px;
  margin-top: 24px;
}

.editor__container {
  width: 100%;
  height: 200px;
  border: 1px solid hsla(0, 0%, 40%, 1);
  border-radius: 2px;
}

.modal__buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
}
</style>