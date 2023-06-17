<template>
  <main class="sites__page">
    <section class="sites__section">
      <div class="sites__top">
        <header class="sites__header">
          <BohrPageTitle :pageName="$t('projects.top100')" shadowText="Top 100" />
          <BohrTypography tag="p" class="sites__subtitle">{{ $t('projects.subtitle') }}</BohrTypography>
        </header>
      </div>
      <div class="sites__list">
        <template v-for="publicProject  in publicProjects" :key="`${publicProject.name}`">
          <SiteCardPublic :project="publicProject" />
        </template>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import BohrPageTitle from '@/components/BohrPageTitle.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import SiteCardPublic from '@/components/SiteCardPublic.vue';
import { defineComponent } from 'vue';
import { Project } from '@/types'
import bohrFetch from '@/utils/bohrFetch';

export default defineComponent({
  components: {
    BohrPageTitle,
    BohrTypography,
    SiteCardPublic,
  },
  data() {
    return {
      selectedFilter: localStorage.getItem('sitesFilter') || 'all',
      publicProjects: [] as Project[],
    };
  },
  async created() {
    const bohrRes = await bohrFetch('/api/public/projects/stars');
    this.publicProjects = bohrRes.data;
  },
  watch: {
    selectedFilter() {
      localStorage.setItem('sitesFilter', this.selectedFilter);
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

@media screen and (max-width: 767px) {
  .sites__header {
    margin-bottom: 48px;
  }

  .sites__top {
    flex-direction: column;
  }
}
</style>