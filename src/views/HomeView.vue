<template>
  <header class="home__header">
    <h1 class="home__title" :class="{ small: isSmallTitle }">
      {{ $t('home.welcome') }}{{ !displayWelcomeBackMessage ? '!' : '' }}
    </h1>
    <p class="home__username" v-if="username">
      @{{ username }}
    </p>
    <p v-if="displayWelcomeBackMessage" class="home__back__message" :class="{ small: isSmallTitle }">
      {{ $t('home.back') }}
    </p>
  </header>

  <main class="home__main">
    <section>
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
    </section>

    <section>
      <BohrTypography tag="h2" variant="title2" color="#55DDE0" class="section__title">
        {{ $t('home.section.lastDevs.title') }}
      </BohrTypography>

      <ul class="global__presence">
        <li v-for="other in lastDevs" :key="other.username">
          <LastDevs
            :username="other.username"
            :avatarUrl="other.avatarUrl"
            :plan="other.plan"
            :linkedinUrl="other.linkedinUrl"
            :githubUrl="other.githubUrl"
            :mainSiteUrl="other.mainSiteUrl"
            :sizePx="60"
          />
          </li>  
      </ul>
    </section>

  </main>
</template>

<script lang="ts">
import BohrTypography from '@/components/BohrTypography.vue';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import SiteCard from '@/components/SiteCard.vue';
import LastDevs from '@/components/LastDevs.vue';
import { getFeaturedProjects, getLastDevs } from '@/services/api';
import { defineComponent } from 'vue';

interface StorageParse {
  data: any;
  expiry: number;
}

export default defineComponent({
  components: {
    BohrTypography,
    SiteCard,
    LastDevs,
    ArrowIcon,
  },
  data() {
    const hasVisitedBefore = Boolean(localStorage.getItem('hasVisitedBefore'));
    const isFirstVisitSession = Boolean(sessionStorage.getItem('isFirstVisitSession'));
    
    if (!hasVisitedBefore) {
      localStorage.setItem('hasVisitedBefore', 'true');
      sessionStorage.setItem('isFirstVisitSession', 'true');
    }

    return {
      displayWelcomeBackMessage: hasVisitedBefore && !isFirstVisitSession,
      featuredProjects: [],
      lastDevs: [] as any[]
    };
  },
  async beforeRouteEnter(to, from, next) {
    let currentTime =  new Date();
    let lastDevsPromise: Promise<any> | undefined;
    const lastDevsStorage = sessionStorage.getItem('lastDevs');
    const lastDevsStorageParse: StorageParse = lastDevsStorage && JSON.parse(lastDevsStorage);

    let featuredProjectsPromise: Promise<any> | undefined;
    const featuredProjectsStorage = sessionStorage.getItem('featuredProjects');
    const featuredProjectsStorageParse: StorageParse = featuredProjectsStorage && JSON.parse(featuredProjectsStorage);

    if (!lastDevsStorageParse || !lastDevsStorageParse.data || lastDevsStorageParse.expiry < currentTime.getTime()) { // TO DO: Check Expiry
      lastDevsPromise = getLastDevs()
    }

    if (!featuredProjectsStorageParse || !featuredProjectsStorageParse.data || featuredProjectsStorageParse.expiry < currentTime.getTime()) { // TO DO: Check Expiry
      featuredProjectsPromise = getFeaturedProjects(9)
    }

    const lastDevsResult = lastDevsStorageParse || await lastDevsPromise
    const featuredProjectsResult = featuredProjectsStorageParse || await featuredProjectsPromise

    next((vm: any) => {
      if (lastDevsPromise !== undefined || featuredProjectsPromise !== undefined) {
        currentTime = new Date();
        const expiry = currentTime.setMinutes(currentTime.getMinutes() + 5);
        sessionStorage.setItem('lastDevs', JSON.stringify({
          data: lastDevsResult.data,
          expiry
        }))
        sessionStorage.setItem('featuredProjects', JSON.stringify({
          data: featuredProjectsResult.data,
          expiry
        }))
      }
      vm.featuredProjects = featuredProjectsResult.data
      vm.lastDevs = lastDevsResult.data
    })
  },
  computed: {
    username() { return this.$store.state.me?.username },

    globalPresenceOther() { return this.$store.state.globalPresenceOther },

    isSmallTitle() { return ['es-ES', 'pt-BR'].includes(this.$i18n.locale) },
  }
});
</script>

<style scoped>
.home__header {
  position: relative;
  margin-inline: auto;
  font-size: 240px;
  margin-bottom: 0.4583em;
  width: 4em;
}

.home__title {
  margin: 0;
  font-weight: 700;
  font-size: 1em;
  line-height: calc(1.15em - 0.1em);
  letter-spacing: -0.1em;
  text-align: center;
  padding-right: 0.1em;
  background: linear-gradient(180deg, #F26419 0%, #E84855 100%);
  color: transparent;
  -webkit-background-clip: text;
          background-clip: text;
}

html[lang^="pt"] .home__title {
  font-size: .825em;
}

.home__title.small {
  font-size: 0.85em;
}

.home__username {
  position: absolute;
  bottom: 0.2em;
  left: 5%;
  z-index: 1;
  margin: 0;
  font-weight: 700;
  font-size: 0.267em; /* 64px */
  letter-spacing: -0.04em;
  background: linear-gradient(180deg, #F4CC3A 0%, #F6AE2D 100%);
  /* text-shadow: 0px 8px 48px #000000; */
  color:transparent;
  -webkit-background-clip: text;
          background-clip: text;

  filter: drop-shadow(0px 0.125em 0.78125em #000000);
  white-space:nowrap
}

.home__back__message {
  position: absolute;
  right: 0.14375em;
  bottom: -0.21875em;
  margin: 0;
  padding-right: 0.1em;
  font-weight: 700;
  font-size: 0.667em; /* 160px */
  letter-spacing: -0.1em;
  background: linear-gradient(180deg, #55DDE0 0%, #53DD6C 100%);
  color: transparent;
  -webkit-background-clip: text;
          background-clip: text;
  filter: drop-shadow(0px 0.05em 0.3125em #000000);
}

html[lang^="pt"] .home__back__message {
  font-size: .5em;
}

.home__back__message.small {
  font-size: 0.41666em;
}

.home__main {
  max-width: 1056px;
  margin-inline: auto;
}

.home__main > section + section {
  margin-top: 30px;
}

.section__title {
  margin-bottom: 36px;
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

.global__presence {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

@media screen and (max-width: 1023px) {
  .home__header {
    font-size: 20.25vw;
  }
}

.sites__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  list-style: none;
  padding: 0;
}
</style>
