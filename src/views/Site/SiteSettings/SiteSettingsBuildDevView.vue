<template>
  <SettingsCard>
    <template #content>
      <form id="build-form" class="form__build" @submit.prevent="saveBuildDev">
        <BohrTypography tag="h2" variant="title3" color="#55DDE0">{{ $t('settings.buildDev.title') }}</BohrTypography>
        <BohrTypography tag="p">{{ $t('settings.buildDev.subtitle') }}</BohrTypography>

        <label class="input__framework">
          {{ $t('settings.buildDev.frameworkPreset') }}
          <BohrSelect
            class="settings__field"
            v-model="selectedFramework"
            :isLoading="isLoading"
          >
            <option value="">
              {{ $t('settings.buildDev.selectFramework') }}
            </option>
            <option
              v-for="framework in availableFrameworks"
              :value="framework"
              :key="framework"
            >
              {{ framework }}
            </option>
          </BohrSelect>
        </label>

        <div class="settings__build-options">
          <BohrTextField
            id="build-command"
            class="settings__field"
            :label="$t('settings.buildDev.label.buildCommand')"
            v-model="buildDevData.buildCommand"
            :isLoading="isLoading"
          />
          <BohrTextField
            id="root-directory"
            class="settings__field"
            :label="$t('settings.buildDev.label.rootDirectory')"
            v-model="buildDevData.rootDirectory"
            :isLoading="isLoading"
          />
          <BohrTextField
            id="output-directory"
            class="settings__field"
            :label="$t('settings.buildDev.label.outputDirectory')"
            v-model="buildDevData.outputDirectory"
            :isLoading="isLoading"
          />
          <BohrTextField
            id="install-command"
            class="settings__field"
            :label="$t('settings.buildDev.label.installCommand')"
            v-model="buildDevData.installCommand"
            :isLoading="isLoading"
          />
          <BohrTextField
            id="development-command"
            class="settings__field"
            :label="$t('settings.buildDev.label.developmentCommand')"
            v-model="buildDevData.developmentCommand"
            :isLoading="isLoading"
          />
        </div>
      </form>
    </template>

    <template #actions>
      <BohrButton
        type="submit"
        form="build-form"
        :disabled="isSaving"
      >
        {{ $t('common.save') }}
      </BohrButton>
    </template>
  </SettingsCard>
</template>

<script lang="ts">
import frameworkSettingsPresets from '@/assets/frameworkSettingsPresets.json';
import BohrButton from '@/components/BohrButton.vue';
import BohrSelect from '@/components/BohrSelect.vue';
import BohrTextField from '@/components/BohrTextField.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import SettingsCard from '@/components/SettingsCard.vue';
import { getProjectBuildDevSettings, updateProjectBuildDevSettings } from '@/services/api/projectSettings';
import { SiteBuildDevData } from '@/types/index';
import isSavingComputed from '@/utils/isSavingComputed';
import { defineComponent } from 'vue';

const blankBuildDevData = (): SiteBuildDevData => ({
  framework: '',
  buildCommand: '',
  rootDirectory: '',
  outputDirectory: '',
  installCommand: '',
  developmentCommand: '',
});

export default defineComponent({
  emits: ['successUpdate', 'failUpdate'],
  components: {
    BohrButton,
    BohrSelect,
    BohrTextField,
    BohrTypography,
    SettingsCard,
  },
  data() {
    return {
      availableFrameworks: Object.keys(frameworkSettingsPresets).sort(),
      initialBuildDevData: blankBuildDevData(),
      buildDevData: blankBuildDevData(),
      selectedFramework: '',
      isLoading: true,
    }
  },
  computed: {
    deployGroupId() { return this.$store.getters['site/contextId'] },

    ...isSavingComputed(),
  },
  watch: {
    deployGroupId() {
      this.initializeSettingsData();
    },

    selectedFramework() {
      if (this.selectedFramework === this.initialBuildDevData.framework) {
        this.buildDevData = this.initialBuildDevData;
        return;
      }

      if (this.selectedFramework in frameworkSettingsPresets) {
        this.buildDevData = {
          framework: this.selectedFramework,
          ...frameworkSettingsPresets[this.selectedFramework as keyof typeof frameworkSettingsPresets],
        };
        return;
      }

      this.buildDevData = blankBuildDevData();
    }
  },
  created() {
    this.initializeSettingsData();
  },
  methods: {
    async initializeSettingsData() {
      this.isLoading = true;

      const org = this.$route.params.org as string;
      const project = this.$route.params.project as string;

      const { data } = await getProjectBuildDevSettings(org, project, this.deployGroupId);
      
      this.initialBuildDevData = data;
      this.buildDevData = data;
      this.selectedFramework = data.framework;
      this.isLoading = false;
    },

    async saveBuildDev() {
      if (this.isSaving) return;
      this.isSaving = true;

      const deployGroupId = this.deployGroupId;

      const { error } = await updateProjectBuildDevSettings({
        org: this.$route.params.org as string,
        project: this.$route.params.project as string,
        deployGroupId,
        commands: this.buildDevData,
      });

      this.isSaving = false

      if (error) {
        this.$emit('failUpdate');        
        return;
      }

      this.$emit('successUpdate');

      if (this.deployGroupId === deployGroupId) {
        this.initialBuildDevData = this.buildDevData;
      }
    },
  }
});
</script>

<style scoped>
.form__build {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
}

.input__framework {
  display: flex;
  flex-direction: column;
}

:deep .settings__field {
  width: var(--single-col-setting-field-width);
}

.settings__build-options {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  width: 100%;
  padding-top: 24px;
  border-top-width: 1px;
  border-top-style: solid;
  border-image-source: linear-gradient(90deg, transparent 0%, rgba(var(--color), 0.5) 50%, transparent 100%);;
  border-image-slice: 1;
}

.settings__link {
  font-size: 16px;
  font-weight: 700;
  color: #F6AE2D;
}
</style>
