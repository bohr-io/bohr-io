<template>
  <main class="settings__page">
    <div class="settings__panel">
      <SettingsSidebar :navLinks="links" />
      <div class="settings__content">
        <SiteContextSelector v-show="!hideContextSelector" hasAllDeploysContext @change="changeContext" />
        <router-view
          @successUpdate="handleSuccessUpdate"
          @failUpdate="handleFailUpdate"
        />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import SettingsSidebar from '@/components/SettingsSidebar.vue';
import SiteContextSelector from '@/components/SiteContextSelector.vue';
import toastService from '@/services/ToastService';
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  components: {
    SettingsSidebar,
    SiteContextSelector
},
  data() {
    return {
      projectName: this.$route.params.project,
    }
  },
  computed: {
    hideContextSelector() {
      return this.$route.meta.hideContextSelector
    },
    
    ...mapGetters({
      contextId: 'site/contextId',
    }),
    
    links() {
      const { $t } = this as any;
      return [
        { label: $t('settings.general.pageName'), routename: 'ProjectSettingsGeneral' },
        { label: $t('common.domain'), routename: 'ProjectSettingsDomain' },
        { label: $t('settings.envVars.pageName'), routename: 'ProjectSettingsEnvVariables' },
        { label: $t('settings.buildDev.pageName'), routename: 'ProjectSettingsBuildDev' },
        { label: $t('settings.auth.pageName'), routename: 'ProjectSettingsAuth' },
      ];
    },
  },
  beforeMount() {
    this.changeContext('all');
  },
  unmounted() {
    this.changeContext('all');
  },
  methods: {
    handleSuccessUpdate() {
      toastService.show({
        message: this.$t('settings.message.successToSave'),
        type: 'success'
      });
    },

    handleFailUpdate() {
      toastService.show({
        message: this.$t('settings.message.failedToSave'),
        type: 'error'
      })
    },

    changeContext(newContext: string) {
      this.$store.dispatch('site/changeContext', newContext)
        .catch(() => toastService.error(this.$t('settings.message.failedToLoadSettings')));
    },
  }
});
</script>

<style scoped>
  .settings__page {
    --single-col-setting-field-width: clamp(200px, 33.34vw, 480px);
    --two-col-settings-field-width: clamp(200px, 20vw, 343px);
    
    grid-area: main;
    width: 100%;
  }

  .loading__settings {
    grid-area: main;
    text-align: center;
    margin-top: 50px;
    padding: 8px 0;
  }

  .loading__logo {
    width: 150px;
    display: block;
    margin: 0 auto;
  }
  
  .settings__heading {
    display: inline-block;
    margin: 32px 8px 32px 0;
    font-size: 48px;
  }

  .settings__panel {
    display: flex;
    flex-direction: column;
  }

  .settings__content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    flex: 1;
  }

  @media screen and (min-width: 992px) {
    .settings__panel {
      flex-direction: row;
    }
  }
</style>
