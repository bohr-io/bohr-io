<template>
  <main class="sites__page">
    <section class="sites__section">
      <div class="sites__top">
        <header class="sites__header">
          <BohrPageTitle :pageName="$t('lastDeploys.title')" />
          <BohrTypography tag="p" class="sites__subtitle">{{ $t('projects.subtitle') }}</BohrTypography>
        </header>
        <div class="sites__controls">
          <BohrCustomSelect
            v-if="filterOptions && filterOptions.length > 1"
            id="account-context-select"
            :aria-label="$t('common.account')"
            v-model="selectedFilter"
            :options="[
              { label: $t('projects.allAccounts'), value: 'all' },
              ...filterOptions.map((a) => ({ value: a })),
            ]"
          />
        </div>
      </div>

      <div class="sites__list">
        <template v-for="(project, index) in filteredProjects" :key="`${project.createdBy} - ${index}`">
          <SiteCard :project="project" />
        </template>
      </div>

    </section>
  </main>
</template>

<script lang="ts">
import BohrCustomSelect from '@/components/BohrCustomSelect.vue';
import BohrPageTitle from '@/components/BohrPageTitle.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import SiteCard from '@/components/SiteCard.vue';
import { defineComponent } from 'vue';
import { getLastDeploys } from '@/services/api';

type LastDeployProject = {
  url: string
  favicon: string
  createdBy: string
  name: string
}

export default defineComponent({
  components: {
    BohrCustomSelect,
    BohrPageTitle,
    BohrTypography,
    SiteCard,
  },
  data() {
    return {
      selectedFilter: localStorage.getItem('sitesFilter') || 'all',
      projects: [] as LastDeployProject[],
    };
  },
  watch: {
    selectedFilter() {
      localStorage.setItem('sitesFilter', this.selectedFilter);
    },
  },
  computed: {
    filterOptions() {
      return this.projects.reduce((acc, cur) => {
        if (acc.some((str) => str === cur.createdBy)) return acc;
        acc.push(cur.createdBy);
        return acc;
      }, [] as string[]);
    },

    filteredProjects() {
      if (this.selectedFilter === 'all') return this.projects;
      return this.projects.filter(({ createdBy }) => createdBy === this.selectedFilter);
    },
  },
  async created() {
    const { data } = await getLastDeploys();
    this.projects = data;
  },
});
</script>

<style scoped>
.sites__page {
  max-width: 1056px;
  margin-inline: auto;
}

.sites__top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
}

.sites__subtitle {
  margin-top: 24px;
  display: none;
}

.sites__controls {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
}

.sites__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  list-style: none;
  padding: 0;
}

@media screen and (max-width: 767px) {
  .sites__header {
    margin-bottom: 48px;
  }

  .sites__top {
    flex-direction: column;
  }
}
</style>
