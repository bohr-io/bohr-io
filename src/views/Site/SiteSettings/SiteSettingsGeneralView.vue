<template>
  <SettingsCard>
    <template #content>
      <form id="general-form" class="general__form" @submit.prevent="saveGeneralSettings">
        <div class="form__section">
          <BohrTypography tag="h2" variant="title3" color="#55DDE0">{{ $t('settings.general.productionDeploy.title') }}</BohrTypography>
          <div class="settings__content">
            <BohrTypography tag="p" variant="body1">{{ $t('settings.general.productionDeploy.text') }}</BohrTypography>
            <BohrSelect
              id="production-deploy"
              class="settings__field"
              :label="$t('settings.general.productionDeploy.nameLabel')"
              :isLoading="isLoading"
              v-model="generalSettingsData.mainBranch"
            >
              <optgroup
                v-for="(groupOptions, groupName) in deployBranchOptions"
                :key="groupName"
                :label="groupName"
              >
                <option
                  v-for="option in groupOptions"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </option>
              </optgroup>
            </BohrSelect>
          </div>
        </div>
        <div class="form__section">
          <BohrTypography tag="h2" variant="title3" color="#55DDE0">{{ $t('settings.general.showInPortfolio.title') }}</BohrTypography>
          <div class="settings__content">
            <BohrTypography tag="p" variant="body1">{{ $t('settings.general.showInPortfolio.text') }}</BohrTypography>
            <BohrCheckBox
              :label="$t('settings.general.showInPortfolio.label')"
              id="show-in-portoflio-checkbox"
              :isLoading="isLoading"
              v-model="showInPortfolio"
            />
          </div>
        </div>
      </form>
    </template>

    <template #actions>
      <BohrButton
        type="submit"
        form="general-form"
        size="md"
        :disabled="isSaving"
      >
        {{ $t('common.save') }}
      </BohrButton>
    </template>
  </SettingsCard>

  <SettingsCard>
    <template #content>
      <form id="template-form" @submit.prevent="saveTemplateSettings">
        <div>
          <BohrTypography tag="h2" variant="title3" color="#55DDE0">{{ $t('settings.general.templateSettings.title') }}</BohrTypography>
          <div class="settings__content">
            <BohrTypography tag="p" variant="body1">{{ $t('settings.general.templateSettings.text') }}</BohrTypography>
            <BohrCheckBox
              :label="$t('settings.general.templateSettings.checkboxLabel')"
              id="template-checkbox"
              :isLoading="isLoading"
              v-model="templateSettingsData.isTemplate"
            />
            <BohrTextArea
              style="resize:none;"
              :label="$t('settings.general.templateSettings.descriptionLabel')"
              id="template-description"
              cols="35"
              rows="5"
              :isLoading="isLoading"
              v-model="templateSettingsData.description"
            />
            <BohrMultiSelect
              label="tags"
              :options="templateTags"
              :isLoading="isLoading"
              v-model="templateSettingsData.tags"
            />
          </div>
        </div>
      </form>
    </template>

    <template #actions>
      <BohrButton
        type="submit"
        form="template-form"
        size="md"
        :disabled="isSaving"
      >
        {{ $t('common.save') }}
      </BohrButton>
    </template>
  </SettingsCard>

  <SettingsCard isDanger>
    <template #content>
      <BohrTypography tag="h2" variant="title3" color="#E84855">{{ $t('settings.general.delete.title') }}</BohrTypography>
      <div class="settings__content">
        <BohrTypography tag="p" variant="body1">{{ $t('settings.general.delete.text') }}</BohrTypography>
        <BohrButton
          type="button"
          size="md"
          isDanger
          @click="showModal"
          :disabled="isSaving"
        >
          {{ $t('common.delete') }} 
        </BohrButton>
      </div>

      <ModalBase
        :isVisible="isModalVisible"
        @close="closeModal"
      >
        <h3 class="delete__modal__title">
          {{ $t('settings.general.delete.modal.title') }}
        </h3>

        <BohrTypography tag="p" class="delete__modal__text">
          {{ $t('settings.general.delete.modal.desc') }}
        </BohrTypography>
        
        <BohrTypography tag="p" class="delete__modal__text">
          {{ deleteConfirmationInstruction.rawLocalizedTextStart }} 
          <strong>{{ deleteConfirmationInstruction.orgProject }}</strong>
          {{ deleteConfirmationInstruction.rawLocalizedTextEnd }}
        </BohrTypography>
        
        
        <input
          type="text"
          placeholder="org/project"
          v-model="deleteConfirmationInputValue"
          class="delete__modal__confirmation"
        />

        <div class="delete__modal__buttons">
          <button
            type="button"
            class="delete__modal__button delete__modal__cancelBtn"
            @click="closeModal"
          >
            {{ $t('common.cancel') }}
          </button>
          <BohrButton
            type="button"
            isDanger
            :disabled="deleteConfirmationInputValue !== `${org}/${project}`"
            @click="deleteSite"
          >
            {{ $t('settings.general.delete.modal.deleteBtn') }}
          </BohrButton>
        </div>
      </ModalBase>
    </template>
  </SettingsCard>

</template>

<script lang="ts">
import templateTags from '@/assets/templateTags';
import BohrButton from '@/components/BohrButton.vue';
import BohrCheckBox from '@/components/BohrCheckBox.vue';
import BohrMultiSelect from '@/components/BohrMultiSelect.vue';
import BohrSelect from '@/components/BohrSelect.vue';
import BohrTextArea from '@/components/BohrTextArea.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import ModalBase from '@/components/ModalBase.vue';
import SettingsCard from '@/components/SettingsCard.vue';
import { deleteSite, getProjectGeneralSettings, getProjectTemplateSettings, updateProjectGeneralSettings, updateProjectTemplateSettings } from '@/services/api/projectSettings';
import toastService from '@/services/ToastService';
import isSavingComputed from '@/utils/isSavingComputed';
import { defineComponent } from 'vue';

const blankGeneralSettingsData = () => ({
  rootDirectory: '',
  mainBranch: '',
  nodeVersion: '',
});

const blankTemplateSettingsData = () => ({
  isTemplate: false,
  description: '',
  tags: [],
});

export default defineComponent({
  components: {
    BohrButton,
    BohrSelect,
    BohrTextArea,
    BohrTypography,
    SettingsCard,
    ModalBase,
    BohrCheckBox,
    BohrMultiSelect,
},
  emits: ['successUpdate', 'failUpdate'],
  data() {
    return {
      showInPortfolio: false,
      templateSettingsData: blankTemplateSettingsData(),
      generalSettingsData: blankGeneralSettingsData(),
      isModalVisible: false,
      org: this.$route.params.org as string,
      project: this.$route.params.project as string,
      deleteConfirmationInputValue: `${this.$route.params.org}/${this.$route.params.project}`,
      isLoading: true,
      templateTags,
    }
  },
  computed: {
    ...isSavingComputed(),

    deployBranchOptions(): Record<string, any> {
      const optionTypeMap = {
        'BRANCH': 'Branch',
        'PR': 'Pull Request',
        'TAG': 'Tag'
      };

      return this.$store.getters['site/deployGroup']?.reduce((acc: any, cur: any) => {
        const optgroup = optionTypeMap[cur.type as keyof typeof optionTypeMap];
        
        if (!acc[optgroup]) acc[optgroup] = [];

        acc[optgroup].push(cur.name);

        return acc;
      }, {});
    },

    deleteConfirmationInstruction() {
      const { org, project } = this;
      const rawLocalizedTextStart = this.$t('settings.general.delete.modal.confirmStart');
      const rawLocalizedTextEnd = this.$t('settings.general.delete.modal.confirmEnd');
      const orgProject = `${org}/${project}`;
      return {
        rawLocalizedTextStart,
        orgProject,
        rawLocalizedTextEnd
      }      
    },
  },
  created() {
    this.initializeSettingsData();
  },
  methods: {
    async initializeSettingsData() {
      this.isLoading = true;

      const org = this.$route.params.org as string;
      const project = this.$route.params.project as string;

      const [
        { data: { generalData, showInPortfolio } },
        { data: templateData },
      ] = await Promise.all([
        getProjectGeneralSettings(org, project,),
        getProjectTemplateSettings(org, project),
      ]);

      this.showInPortfolio = showInPortfolio;
      this.generalSettingsData = generalData;
      this.templateSettingsData = templateData;
      this.isLoading = false;
    },

    async saveGeneralSettings() {
      if (this.isSaving) return;
      this.isSaving = true;

      const { error } = await updateProjectGeneralSettings({
        org: this.org,
        project: this.project,
        showInPortfolio: this.showInPortfolio,
        general: this.generalSettingsData,
      })

      this.isSaving = false

      if (error) {
        this.$emit('failUpdate');
        return;
      }

      this.$emit('successUpdate');
    },

    async saveTemplateSettings() {
      if (this.isSaving) return;
      this.isSaving = true;

      const { error } = await updateProjectTemplateSettings({
        org: this.org,
        project: this.project,
        isTemplate: this.templateSettingsData.isTemplate,
        description: this.templateSettingsData.description?.replaceAll('\n', ' ') || '',
        tags: this.templateSettingsData.tags,
      });

      this.isSaving = false;

      if (error) {
        if (error === 'Repository is private.') {
          toastService.error(this.$t('settings.general.templateSettings.errors.private'));
        } else {
          this.$emit('failUpdate');
        }

        return;
      }

      this.$emit('successUpdate');
    },

    async deleteSite() {
      if (this.isSaving) return;
      this.isSaving = true;
      this.closeModal();

      const { error } = await deleteSite(this.org as string, this.project as string);

      this.isSaving = false;

      if (error) {
        toastService.show({
          message: this.$t('settings.general.delete.error'),
          type: 'error'
        })
        return;
      }

      toastService.show({
        message: this.$t('settings.general.delete.success'),
        type: 'success'
      });

      this.$store.dispatch('site/reset');

      this.$router.push({ name: 'Projects' });
    },

    showModal() {
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
    },
  },
});
</script>

<style scoped>
  .settings__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    margin-top: 16px;
  }

  :deep(.settings__field) {
    width: var(--single-col-setting-field-width);
  }

  .general__form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .form__section + .form__section {
    border-top: 2px solid hsla(0, 0%, 100%, 0.1);
    margin-top: 36px;
    padding-top: 36px;
  }

  .settings__link {
    font-size: 16px;
    font-weight: 700;
    color: #F6AE2D;
  }
  
  .delete__modal__title {
    font-weight: 700;
    font-size: 23px;
    line-height: 26px;
    letter-spacing: -0.04em;
    margin-block: 0 16px;
    color: hsla(355, 78%, 60%, 1);
  }

  .delete__modal__text{
    font-size: 20px;
    line-height: 1.5;
  }

  .delete__modal__text + .delete__modal__text {
    margin-top: 8px;
  }

  .delete__modal__confirmation {
    margin-block: 20px;
    padding: 10px 12px;
    width: 100%;
    box-sizing: border-box;
  }

  .delete__modal__buttons{
    display: flex;
    justify-content: space-between;
  }

  .delete__modal__button {
    padding: 13px 26px;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    border: none;
    border-radius: 2px;
  }

  .delete__modal__button:where(:not(:disabled)) {
    cursor: pointer;
  }

  .delete__modal__button:disabled {
    background-color: hsla(0, 0%, 50%, 1);
    color: hsla(0, 0%, 0%, 1);
  }

  .delete__modal__cancelBtn {
    background-color: hsl(0, 100%, 0%);
    color: hsla(0, 0%, 100%, 1);
  }

  .delete__modal__cancelBtn:where(:not(:disabled)):hover {
    background-color: hsl(0, 100%, 0%);
  }

  .delete__modal__deleteBtn {
    color: hsla(0, 0%, 100%, 1);
    background-color: hsla(355, 78%, 60%, 1);
  }

  .delete__modal__deleteBtn:where(:not(:disabled)):hover {
    background-color: hsla(0, 0%, 95%, 1);
  }
</style>
