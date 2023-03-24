<template>
  <main v-if="selectedQueryData">
    <BohrBox class="settings__container">
      <div class="selects__container">
        <BohrSelect :label="$t('common.query')" v-model="selectedQueryIndex">
          <option v-for="query, index in savedQuerys" :key="query.id" :value="index">{{ query.name }}</option>
        </BohrSelect>
        <DateInput
          :label="$t('common.period')"
          id="query-range"
          v-model="selectedPeriod"
          range
        ></DateInput>
      </div>
      <button
        class="advanced__toggle"
        @click="showAdvanced = !showAdvanced"
      >
        {{ $t('analytics.advancedSettings') }}
        <ArrowIcon
          :sizePx="16"
          :direction="showAdvanced ? 'top' : 'bottom'"
          style="margin-left: 10px"
          isGradient
        >
          <template #gradient>
            <stop offset="0%" style="stop-color:#55DDE0;stop-opacity:1" />
          </template>
        </ArrowIcon>
      </button>
      <div class="advanced__settings" :class="{ show: showAdvanced }">
        <BohrTypography tag="p" variant="title4">
          SQL
          <a
            href="https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/"
            target="_blank"
            rel="noreferrer"
            style="color:#F6AE2D"
          >
            ({{ $t('common.reference') }})
          </a>
        </BohrTypography>
        <MonacoEditor
          theme="vs-dark"
          language="sql"
          :options="{
            automaticLayout: true,
            minimap: { enabled: false },
          }"
          :height="200"
          v-model:value="selectedQueryData.query"
        ></MonacoEditor>
        <p class="available__columns"><span>{{ $t('analytics.availableColumns') }}:</span> host, path, browser, referer, country, city, isp, user_agent, method, branch, branchtype, status, device_type, operational_system, timestamp</p>
        <div class="advanced__controls">
          <fieldset style="margin-right:auto" class="view__type">
            <legend>{{ $t('analytics.viewResultAs') }}</legend>
            <label>
              <input type="radio" value="table" name="view-type" v-model="selectedQueryData.chartSettings.viewType" />
              {{ $t('common.table') }}
            </label>
            <label>
              <input type="radio" value="chart" name="view-type" v-model="selectedQueryData.chartSettings.viewType" />
              {{ $t('common.chart') }}
            </label>
            <BohrIconButton
              :label="`Highchart ${$t('common.settings')}`"
              @click="openChartModal"
            >
              <AccountIcon
                :sizePx="16"
                isGradient
                isFilled
              >
                <template #gradient>
                  <stop offset="0%" style="stop-color:#F4CC3A;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#F6AE2D;stop-opacity:1" />
                </template>
              </AccountIcon>
            </BohrIconButton>
          </fieldset>
          <BohrCheckBox
            v-if="isBohrCore"
            :label="$t('analytics.isDefaultLabel')"
            id="default-query"
            v-model="selectedQueryData.isDefault"
          />
          <div class="buttons__container">
            <BohrButton
              v-if="!selectedQueryData.isDefault || isBohrCore"
              @click="handleDelete"
              isDanger
              :disabled="requestingType"
            >
              {{ $t('common.delete') }}
            </BohrButton>
            <BohrButton
              v-if="!selectedQueryData.isDefault || isBohrCore"
              @click="handleSave"
              :disabled="requestingType"
            >
              {{ $t('common.save') }}
            </BohrButton>
            <BohrButton
              @click="openSaveAsModal"
              :disabled="requestingType"
            >
              {{ $t('common.saveAs') }}...
            </BohrButton>
            <BohrButton
              @click="handleExecute"
              :disabled="requestingType || !selectedQueryData?.query"
            >
              {{ $t('common.run') }}
            </BohrButton>
          </div>          
        </div>
      </div>
    </BohrBox>
    <div class="data__container">
      <div>
        <BohrTypography tag="h2" variant="title2" color="hsl(181, 69%, 61%)">
          {{ selectedQueryData.name || 'query' }}
        </BohrTypography>
        <BohrTypography tag="p">
          {{ `${$t('common.between')} ${$d(selectedPeriod[0])} ${$t('common.and')} ${$d(selectedPeriod[1])}` }}
        </BohrTypography>
      </div>

      <div class="export__container">
        <BohrButton @click="handleExport" :disabled="data.length < 1">
          {{ $t('common.export') }}
        </BohrButton>
      </div>

      <div class="data__view">
        <AnalyticsTable
          v-if="selectedQueryData.chartSettings.viewType === 'table'"
          :data="data"
        />
  
        <AnalyticsChart
          v-if="selectedQueryData.chartSettings.viewType === 'chart'"
          :data="data"
          :chartOptionsStr="selectedQueryData.chartSettings.optionsGenerator"
        />
      </div>
    </div>

    <HighchartSettingsModal
      :isVisible="showChartModal"
      :initialSettings="selectedQueryData.chartSettings.optionsGenerator"
      @close="showChartModal = false"
      @newSettings="handleNewHighchartSettings"
    />

    <ModalBase
      class="saveas__modal"
      :isVisible="showSaveAsModal"
      @close="showSaveAsModal = false"
    >
      <BohrTypography id="saveas-title" tag="h2" variant="title2" color="hsl(355, 78%, 60%)">
        {{ $t('analytics.saveAsModal.title') }}
      </BohrTypography>
      <input
        class="saveas__name__input"
        aria-labelledby="saveas-title"
        v-model="saveAsName"
      />
      <div class="saveas__modal__btns">
        <BohrButton
          @click="showSaveAsModal = false"
          color="black"
        >
          {{ $t('common.cancel') }}
        </BohrButton>
        <BohrButton
          @click="handleSaveAs"
          :disabled="!saveAsName"
        >
          {{ $t('common.save') }}
        </BohrButton>
      </div>
    </ModalBase>
  </main>
</template>

<script setup lang="ts">
import MonacoEditor from 'monaco-editor-vue3';
</script>

<script lang="ts">
import AnalyticsChart from '@/components/AnalyticsChart.vue';
import AnalyticsTable from '@/components/AnalyticsTable.vue';
import BohrBox from '@/components/BohrBox.vue';
import BohrButton from '@/components/BohrButton.vue';
import BohrCheckBox from '@/components/BohrCheckBox.vue';
import BohrIconButton from '@/components/BohrIconButton.vue';
import BohrSelect from '@/components/BohrSelect.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import DateInput from '@/components/DateInput.vue';
import HighchartSettingsModal from '@/components/HighchartSettingsModal.vue';
import AccountIcon from '@/components/icons/AccountIcon.vue';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import ModalBase from '@/components/ModalBase.vue';
import { createAnalyticsQuery, deleteAnalyticsQuery, executeAnalyticsQuery, getAnalyticsQuerys, updateAnalyticsQuery } from '@/services/api';
import toastService from '@/services/ToastService';
import { defineComponent } from 'vue';

type Query = {
  id: string
  siteId: string
  name: string
  query: string
  chartSettings: {
    viewType: 'chart' | 'table'
    optionsGenerator: string
  }
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export default defineComponent({
  components: {
    AnalyticsChart,
    AnalyticsTable,
    AccountIcon,
    ArrowIcon,
    BohrBox,
    BohrButton,
    BohrCheckBox,
    BohrIconButton,
    BohrSelect,
    BohrTypography,
    DateInput,
    HighchartSettingsModal,
    ModalBase,
  },
  data() {
    const sevenDaysInMiliSec = 604800000;
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - sevenDaysInMiliSec);

    const org = this.$route.params.org as string;
    const project = this.$route.params.project as string;
    const isBohrCore = org === 'bohr-io' && project === 'core';

    return {
      org,
      project,
      showChartModal: false,
      showSaveAsModal: false,
      saveAsName: '',
      hasChanges: false,
      showAdvanced: false,
      selectedQueryIndex: 0,
      selectedPeriod: [sevenDaysAgo, now],
      savedQuerys: [] as Query[],
      requestingType: 'read' as undefined | 'delete' | 'update' | 'read' | 'create',
      isBohrCore,
      removeRequestingToast: () => {},
      data: [],
    }
  },
  computed: {
    selectedQueryData() {
      return this.savedQuerys[this.selectedQueryIndex] || null;
    },

    projectId() {
      return this.$store.getters['site/projectId'];
    },
  },
  watch: {
    requestingType() {
      this.removeRequestingToast();

      if (this.requestingType) {
        this.removeRequestingToast = toastService.warn(this.requestingType, { isFixed: true });
      }
    },

    projectId() {
      this.getQueryList();
    },

    selectedQueryData(newData: Query) {
      if (!newData) {
        return;
      }

      this.handleExecute();
    },

    selectedPeriod: {
      deep: true,
      handler() {
        this.handleExecute();
      }
    }
  },
  mounted() {
    this.getQueryList();
  },
  methods: {
    async getQueryList() {
      if (!this.projectId) {
        return;
      }

      const { data, error } = await getAnalyticsQuerys(this.projectId);

      if (error) {
        toastService.error('failed to get saved querys');
        return;
      }

      this.savedQuerys = data;
      this.requestingType = undefined;
    },

    async handleDelete() {
      this.requestingType = 'delete';
      const { error } = await deleteAnalyticsQuery(this.selectedQueryData.id);
      this.requestingType = undefined;

      if (error) {
        toastService.error('fail');
        return;
      }

      this.savedQuerys.splice(this.selectedQueryIndex, 1);
      this.selectedQueryIndex = 0;
      this.hasChanges = false;

      toastService.success('query deleted');
    },

    async handleSave() {
      this.requestingType = 'update'

      const { error } = await updateAnalyticsQuery({
        orgName: this.org,
        repoName: this.project,
        name: this.selectedQueryData.name,
        query: this.selectedQueryData.query,
        chartSettings: this.selectedQueryData.chartSettings,
        queryId: this.selectedQueryData.id,
        isDefault: this.selectedQueryData.isDefault,
      });

      this.requestingType = undefined;
      
      if (error) {
        toastService.error('fail');
        return;
      }

      toastService.success('saved');
      this.hasChanges = false;
    },

    async handleSaveAs() {
      this.requestingType = 'create';
      this.showSaveAsModal = false;

      const { data, error } = await createAnalyticsQuery({
        orgName: this.org,
        repoName: this.project,
        name: this.saveAsName,
        query: this.selectedQueryData.query,
        chartSettings: this.selectedQueryData.chartSettings,
      });
      this.requestingType = undefined;

      if (error) {
        toastService.error('fail');
        return;
      }

      toastService.success('created');
      const newQueryIndex = this.savedQuerys.length;
      this.savedQuerys[newQueryIndex] = data;
      this.selectedQueryIndex = newQueryIndex;
      this.saveAsName = '';
    },

    async handleExecute() {
      this.data = [];
      const { data, error } = await executeAnalyticsQuery({
        owner: this.org,
        project: this.project,
        query: this.selectedQueryData.query,
        startDate: this.selectedPeriod[0].toString(),
        endDate: this.selectedPeriod[1].toString(),
      });

      if (error) {
        console.log(error);
        toastService.error(error.message)
        return;
      }

      this.data = data.data;
    },

    handleExport() {
      const downloadLinkEl = document.createElement('a');
      const fileName = `${this.org}-${this.project}-${this.selectedQueryData.name}.csv`;
      const csvContent = Object.keys(this.data[0]).join(',') + '\n' + this.data.map((row) => Object.values(row).join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);

      downloadLinkEl.setAttribute('href', url);
      downloadLinkEl.setAttribute('download', fileName);
      downloadLinkEl.click();
    },

    handleNewHighchartSettings(newSettings: string) {
      this.selectedQueryData.chartSettings.optionsGenerator = newSettings;
      this.showChartModal = false;
    },

    openChartModal() {
      this.showChartModal = true;
    },

    openSaveAsModal() {
      this.showSaveAsModal = true;
    },
  },
});
</script>

<style scoped>
.settings__container {
  padding: 36px;
}

.selects__container {
  display: grid;
  grid-template-columns: 0.75fr 0.25fr;
  gap: 16px;
}

.advanced__toggle {
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -0.04em;
  color: hsl(181, 69%, 61%);
  text-transform: capitalize;
  background: none;
  margin-top: 30px;
  border: none;
  cursor: pointer;
}

.advanced__settings {
  display: none;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  margin-top: 30px;
}

.advanced__settings.show {
  display: flex;
}

:deep(.sql__textarea) {
  resize: vertical;
}

.available__columns {
  font-size: 12px;
}

.available__columns > span {
  color: hsl(39, 92%, 57%);
}

.advanced__controls {
  margin-top: 12px;
}

.buttons__container {
  display: flex;
  justify-content: flex-end;
  gap: 25px;
  margin-top: 48px;
}

.view__type {
  display: flex;
  align-items: center;
  border: none;
  padding: 0;
  gap: 10px;
  margin-bottom: 10px;
}

.view__type > legend {
  display: block;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 8px;
}

label {
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-transform: capitalize;
}

label + label {
  margin-left: 20px;
}

input[type=radio] {
  position: relative;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  border: 1px solid hsl(0, 0%, 100%);
  background: linear-gradient(180deg, transparent 0%, hsla(0, 0%, 100%, 0.05) 100%);
}

input[type=radio]::after {
  content: '';
  position: absolute;
  inset: 5px;
  background: linear-gradient(180deg, #55DDE0 0%, #53DD6C 100%);
  border-radius: 9999px;
  opacity: 0;
}

input[type=radio]:checked::after {
  opacity: 1;
}

.data__container {
  margin-top: 55px;
  display: grid;
  grid-template-areas: "text button" "data data";
  grid-template-columns: 1fr auto;
}

.export__container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.data__view {
  margin-top: 24px;
  grid-area: data;
}

.saveas__modal {
  width: 80vw;
  max-width: 400px;
}

.saveas__name__input {
  box-sizing: border-box;
  margin-top: 20px;
  width: 100%;
}

.saveas__modal__btns {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
