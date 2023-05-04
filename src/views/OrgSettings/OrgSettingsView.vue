<template>
  <main class="settings__page">
    <BohrPageTitle :pageName="$t('common.account')" />
    <div class="domains__controls">
      <BohrSelector
          v-if="filterOptions && filterOptions.length > 1"
          id="account-context-select"
          :aria-label="$t('common.account')"
          v-model="selectedFilter"
          :options="filterOptions.map((a) => ({ value: a }))"
          @selected="changeContext"
          :hideSelected="true"
        />
    </div>
    <BohrInformativePlan
      v-if="plan === 'FREE'"
      class="informative__plan"
    />
    <div class="settings__panel">
      <div class="settings__content">
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import BohrSelector from '@/components/BohrSelector.vue';
import BohrPageTitle from '@/components/BohrPageTitle.vue';
import BohrInformativePlan from '@/components/BohrInformativePlan.vue';
import { getDomains } from '@/services/api';
import toastService from '@/services/ToastService';
import { Domain } from '@/types';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'OrgSettings',
  components: {
    BohrSelector,
    BohrPageTitle,
    BohrInformativePlan,
  },
  data() {
    return {
      isPlaceholder: location.hostname === 'bohr.io',
      rawDomains: [] as Domain[],
      isFetchingData: true,
      selectedFilter: localStorage.getItem('sitesFilter') || 'all',
      palavraEntreBarras: '',
    }
  },
  methods: {
    async getDomains() {
      const { data, error } = await getDomains();

      this.isFetchingData = false;

      if (error) {
        toastService.error(this.$t('domains.loadFail'));
        return;
      }

      this.rawDomains = data;
    },
    changeContext(newContext: any) {
      this.$router.push({
        name: 'OrgSettingsGeneral',
        params: {
          org: newContext
        }
      });
    },
  },
  watch: {
    selectedFilter() {
      localStorage.setItem('sitesFilter', this.selectedFilter);
    },
  },
  computed: {
    plan() { return this.$store.state.me?.plan },
    filterOptions() {
      return this.$store.state.me?.orgs;
    },
    domains(){
      if(!this.rawDomains) return [];
      if(this.selectedFilter === 'all') return this.rawDomains;
      return this.rawDomains.filter(({ username }) => username === this.selectedFilter)
    }
  },
  mounted() {
    const url = window.location.pathname
    const match = url.match(/\/([^/]+)\//);
    if (match) {
      this.palavraEntreBarras = match[1];
    }
    if (this.palavraEntreBarras != this.selectedFilter){
      this.selectedFilter = this.palavraEntreBarras;
    }
  }
})
</script>

<style scoped>

.domains__controls{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}
.settings__page {
  display: flex;
  flex-direction: column;
  max-width: 1056px;
  margin-inline: auto;
}

.informative__plan {
  margin: 15px 0px 15px 0px;
}

  .settings__panel {
    display: flex;
    gap: 55px;
    margin-top: 16px;
  }

  .settings__content {
    display: flex;
    flex-direction: column;
    gap: 32px;
    flex: 1;
  }
</style>
