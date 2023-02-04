<template>
  <SettingsCard v-if="isAllDeploySettings">
    <template #content>
      <BohrTypography tag="h2" variant="title3" color="#55DDE0">
        {{ $t('settings.domain.allDeploys.title') }}
      </BohrTypography>
      <div class="settings__content">
        <BohrTypography tag="p" variant="body1">
          {{ $t('settings.domain.allDeploys.text') }}
        </BohrTypography>
      </div>
    </template>
  </SettingsCard>

  <SettingsCard v-else>
    <template #content>
      <form id="domain-form" @submit.prevent="saveDomainUrl">
        <BohrTypography tag="h2" variant="title3" color="#55DDE0">{{ $t('settings.domain.title') }}</BohrTypography>
        <div class="settings__content">
          <BohrTypography tag="p" variant="body1">{{ $t('settings.domain.text') }}</BohrTypography>
          <SubdomainDomainFields
            v-model:domain="domain"
            v-model:subdomain="subdomain"
            :currentProjectUrl="currentProjectUrl"
            :availableDomains="availableDomains"
            :isLoading="isLoading"
          />
        </div>
      </form>
    </template>

    <template #actions>
      <BohrButton
        type="submit"
        form="domain-form"
        size="md"
        :disabled="isSaving"
      >
        {{ $t('common.save') }}
      </BohrButton>
    </template>
  </SettingsCard>
</template>

<script lang="ts">
import BohrButton from '@/components/BohrButton.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import SettingsCard from '@/components/SettingsCard.vue';
import SubdomainDomainFields from '@/components/SubdomainDomainFields.vue';
import { getAvailableDomains } from '@/services/api';
import { getProjectGeneralSettings, updateProjectUrlSettings } from '@/services/api/projectSettings';
import toastService from '@/services/ToastService';
import { Domain } from '@/types';
import isSavingComputed from '@/utils/isSavingComputed';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    BohrButton,
    BohrTypography,
    SettingsCard,
    SubdomainDomainFields,
  },
  emits: ['successUpdate', 'failUpdate'],
  data() {
    return {
      currentProjectUrl: '',
      domain: '',
      subdomain: '',
      availableDomains: [] as Domain[],
      org: this.$route.params.org as string,
      project: this.$route.params.project as string,
      isLoading: true,
    }
  },
  computed: {
    ...isSavingComputed(),

    deployGroupId() {
      return this.$store.getters['site/contextId']
    },

    isAllDeploySettings() {
      return !this.$store.getters['site/contextId']
    },
  },
  watch: {
    deployGroupId() {
      this.initializeSettingsData();
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
        { data: { domainUrl } },
        { data: availableDomains },
      ] = await Promise.all([
        getProjectGeneralSettings(org, project, this.deployGroupId),
        getAvailableDomains(),
      ]);

      if (availableDomains) {
        this.availableDomains = availableDomains;
        this.currentProjectUrl = domainUrl;

        const domain = availableDomains.find((domain: Domain) => domainUrl.includes(domain.name))?.name || 'bohr.io';
        this.domain = domain;
        this.subdomain = domainUrl.replace(RegExp(`.?${domain}$`), '');
      }

      this.isLoading = false;
    },

    async saveDomainUrl() {
      if (this.isSaving) return;
      this.isSaving = true;

      const { error } = await updateProjectUrlSettings({
        org: this.org,
        project: this.project,
        deployGroupId: this.deployGroupId,
        url: this.subdomain ? `${this.subdomain}.${this.domain}` : this.domain,
      });

      this.isSaving = false;

      if (error) {
        if (error.error.code) {
          toastService.error(this.$t(`settings.domain.errors.${error.error.code}`));
          return;
        }

        this.$emit('failUpdate');
        return;
      }

      this.$emit('successUpdate');
    },
  },
});
</script>

<style scoped>
  .settings__content {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 24px;
    margin-top: 16px;
  }

  :deep(.settings__field) {
    width: 100%;
  }
</style>
