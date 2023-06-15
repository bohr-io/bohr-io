<template>
  <main class="sites__page">
    <section class="sites__section">
      <div class="sites__top">
        <header class="sites__header">
          <BohrPageTitle :pageName="$t('allprojects.title')" />
        </header>
      </div>

      <div class="sites__list">
        <template v-for="project in projects" :key="`${project.org} - ${project.name}`">
          <SiteCard :project="project" />
        </template>
      </div>

    </section>
  </main>
</template>

<script lang="ts">
import BohrPageTitle from '@/components/BohrPageTitle.vue';
import SiteCard from '@/components/SiteCard.vue';
import { defineComponent } from 'vue';
import { getAllSites } from '@/services/api';

export default defineComponent({
  components: {
    BohrPageTitle,
    SiteCard
  },
  data() {
    return {
      projects: null as any,
    };
  },
  async created() {
    let response = await getAllSites();
    this.projects = response.data;
  }
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
