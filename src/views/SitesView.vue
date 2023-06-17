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
      </div>

    </section>
  </main>
</template>

<script lang="ts">
import BohrCustomSelect from '@/components/BohrCustomSelect.vue';
import BohrPageTitle from '@/components/BohrPageTitle.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import SiteCard from '@/components/SiteCard.vue';
import NewSiteLink from '@/components/NewSiteLink.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    BohrCustomSelect,
    BohrPageTitle,
    BohrTypography,
    SiteCard,
    NewSiteLink
  },
  data() {
    return {
      selectedFilter: localStorage.getItem('sitesFilter') || 'all',
    };
  },
  watch: {
    selectedFilter() {
      localStorage.setItem('sitesFilter', this.selectedFilter);
    },
  },
  computed: {
    filterOptions() {
      return this.$store.state.me?.orgs;
    },
    
    projects() {
      if (!this.$store.state.me) return [];
      if (this.selectedFilter === 'all') return this.$store.state.me.sites;
      return this.$store.state.me.sites.filter(({ org }) => org === this.selectedFilter);
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
