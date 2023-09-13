<template>
  <main class="sites__page">
    <section class="sites__section">
      <div class="sites__top">
        <header class="sites__header">
          <BohrPageTitle :pageName="$t('projects.title')" />
          <BohrTypography tag="p" class="sites__subtitle">{{ $t('projects.subtitle') }}</BohrTypography>
          <BohrTypography tag="h6" variant="title2" color="#55DDE0" class="see__Our__Community">
            {{ $t('projects.top3Projects') }}
          </BohrTypography>
        </header>
        <div class="sites__controls__group">
          <div class="sites__controls">
            <BohrCustomSelect
              v-if="filterOptions && filterOptions.length > 1"
              id="account-context-select"
              :aria-label="$t('common.account')"
              v-model="selectedFilter"
              :options="[
                { label: $t('projects.allAccounts'), value: $t('projects.allAccounts') },
                ...filterOptions.map((a) => ({ value: a })),
              ]"
            />
          </div>
          <div class="sites__controls">
            <BohrCustomSelectProject
              v-if="projectFilterOptions && projectFilterOptions.length > 1"
              id="project-context-select"
              :aria-label="$t('common.project')"
              v-model="selectedProjectFilter"
              :options="[
                { label: $t('projects.allProjects'), value: $t('projects.allProjects') },
                ...projectFilterOptions.map((a) => ({ value: `${a.name}` })),
              ]"
            />
          </div>
        </div>
      </div>
      <BohrTypography tag="h2" variant="title2" color="#55DDE0" class="section__title">
        {{ $t('home.section.featuredProjects.title') }}
      </BohrTypography>
      
      <div class="sites__list">
        <template v-for="project in featuredProjects" :key="`${project.org} - ${project.name}`">
          <SiteCard :project="project" />
        </template>
      </div>
      <div class="sites__all">
        <router-link class="sites__all__link" :to="{ name: 'FeaturedProjects' }">
          <BohrTypography
            variant="title3">
            {{ $t('home.section.featuredProjects.seeAll') }}
          </BohrTypography>
          <ArrowIcon direction="right" :sizePx="24" isGradient />
        </router-link>
      </div>


      <BohrTypography tag="h2" variant="title2" color="#55DDE0" class="section__my__projects">
        {{ $t('projects.myProjects') }}
      </BohrTypography>
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
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import BohrCustomSelect from '@/components/BohrCustomSelect.vue';
import BohrCustomSelectProject from '@/components/BohrCustomSelectProject.vue';
import BohrPageTitle from '@/components/BohrPageTitle.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import SiteCard from '@/components/SiteCard.vue';
import SkeletonLoading from '@/components/SkeletonLoading.vue';
import NewSiteLink from '@/components/NewSiteLink.vue';
import i18n from '@/i18n';
import { getFeaturedProjects, getPublicUserProjects } from '@/services/api';
import { Projects } from '@/types';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';


interface StorageParse {
  data: any;
  expiry: number;
}


export default defineComponent({
  setup(){
    const {t} = useI18n();
    return {
      t
    };
  },
  components: {
    ArrowIcon,
    BohrCustomSelect,
    BohrCustomSelectProject,
    BohrPageTitle,
    BohrTypography,
    SiteCard,
    NewSiteLink,
    SkeletonLoading
},

  data(): {
    selectedFilter: string,
    selectedProjectFilter: string,
    publicUserProjects: Projects | undefined,
    isLoading: boolean,
    featuredProjects: object,
    } {
    return {
      selectedFilter: localStorage.getItem('sitesFilter') || this.t('projects.allAccounts'),
      selectedProjectFilter: localStorage.getItem('sitesProjectsFilter') || this.t('projects.allProjects'),
      publicUserProjects: undefined,
      isLoading: true,
      featuredProjects: [],
    };
  },
  async beforeRouteEnter(to, from, next) {
    let currentTime =  new Date();

    let featuredProjectsPromise: Promise<any> | undefined;
    const featuredProjectsStorage = sessionStorage.getItem('featuredProjects');
    const featuredProjectsStorageParse: StorageParse = featuredProjectsStorage && JSON.parse(featuredProjectsStorage);

    if (!featuredProjectsStorageParse || !featuredProjectsStorageParse.data || featuredProjectsStorageParse.expiry < currentTime.getTime()) { // TO DO: Check Expiry
      featuredProjectsPromise = getFeaturedProjects(3)
    }

    const featuredProjectsResult = featuredProjectsStorageParse || await featuredProjectsPromise

    next((vm: any) => {
      if (featuredProjectsPromise !== undefined) {
        currentTime = new Date();
        const expiry = currentTime.setMinutes(currentTime.getMinutes() + 5);
        sessionStorage.setItem('featuredProjects', JSON.stringify({
          data: featuredProjectsResult.data,
          expiry
        }))
      }
      vm.featuredProjects = featuredProjectsResult.data
    })
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
    selectedProjectFilter() {
      localStorage.setItem('sitesProjectsFilter', this.selectedProjectFilter);
    },
  },
  computed: {
    projectFilterOptions() {
      return this.publicUserProjects?.sites?.sort(function(a, b) { return (a.org > b.org ? 1 : (a.org === b.org ? 0 : -1)) });
    },
    filterOptions() {
      return this.publicUserProjects?.orgs;
    },
    
    projects() {
      if (this.publicUserProjects && this.publicUserProjects.sites) {
        if (this.selectedFilter === this.t('projects.allAccounts')){
          if(this.selectedProjectFilter === this.t('projects.allProjects')) return this.publicUserProjects.sites;
          return this.publicUserProjects.sites.filter(({ name }) => name.includes(this.selectedProjectFilter));
        }
        if(this.selectedProjectFilter === this.t('projects.allProjects')) return this.publicUserProjects.sites.filter(({ org }) => org === this.selectedFilter);
        return this.publicUserProjects.sites.filter(({ org, name }) => org === this.selectedFilter && name.includes(this.selectedProjectFilter));
      } else {
        return [];
      };
    },
  },
});
</script>

<style scoped>

.see__Our__Community {
  color: white;
  font-size: 12px;
  padding-top: 20px;
}

.section__title {
  padding: 30px 0px 30px 0px;
}
.section__my__projects {
  padding: 0px 0px 20px 0px;
}
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

.sites__controls__group {
  display: flex;
  gap: 20px;
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

.sites__all {
  display: flex;
  justify-content: flex-end;
}

.sites__all__link {
  display: flex;
  align-items: center;
}

.sites__all__link span {
  line-height: 2em;
  background: linear-gradient(180deg, #F26419 0%, #E84855 100%);
  color: transparent;
  -webkit-background-clip: text;
          background-clip: text;
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
