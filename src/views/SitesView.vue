<template>
  <main class="sites__page">
    <section class="sites__section">
      <div class="sites__top">
        <header class="sites__header">
          <BohrPageTitle :pageName="$t('projects.title')" />
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
        <NewSiteLink withText />
        <template v-for="project in projects" :key="`${project.org} - ${project.name}`">
          <SiteCard :project="project" />
        </template>
        <template v-if="isLoading">
          <div class="site__placeholder">
            <SkeletonLoading width="100%" height="100%" :isShowing="true"></SkeletonLoading>
          </div>
          <div class="site__placeholder">
            <SkeletonLoading width="100%" height="100%" :isShowing="true"></SkeletonLoading>
          </div>
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
import SkeletonLoading from '@/components/SkeletonLoading.vue';
import NewSiteLink from '@/components/NewSiteLink.vue';
import { getPublicUserProjects } from '@/services/api';
import { Projects } from '@/types';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    BohrCustomSelect,
    BohrPageTitle,
    BohrTypography,
    SiteCard,
    NewSiteLink,
    SkeletonLoading
},
  data(): {
    selectedFilter: string,
    publicUserProjects: Projects | undefined,
    isLoading: boolean,
  } {
    return {
      selectedFilter: localStorage.getItem('sitesFilter') || 'all',
      publicUserProjects: undefined,
      isLoading: true,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const publicUserProjectsResult = await getPublicUserProjects();
      this.publicUserProjects = publicUserProjectsResult.data;
      this.isLoading = false;
    }
  },
  watch: {
    selectedFilter() {
      localStorage.setItem('sitesFilter', this.selectedFilter);
    },
  },
  computed: {
    filterOptions() {
      return this.publicUserProjects?.orgs;
    },
    
    projects() {
      if (this.publicUserProjects && this.publicUserProjects.sites) {
        if (this.selectedFilter === 'all') return this.publicUserProjects.sites;
        return this.publicUserProjects.sites.filter(({ org }) => org === this.selectedFilter);
      } else {
        return [];
      };
    },
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

.site__placeholder {
  margin-bottom: 20px;
  border-radius: 4px;
  overflow: hidden;
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
