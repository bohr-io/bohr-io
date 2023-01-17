<template>
  <header class="home__header">
    <h1 class="home__title" :class="{ small: $i18n.locale === 'pt-br' }">
      {{ $t('home.welcome') }}{{ !displayWelcomeBackMessage ? '!' : '' }}
    </h1>
    <p class="home__username">
      @{{ username }}
    </p>
    <p v-if="displayWelcomeBackMessage" class="home__back__message" :class="{ small: $i18n.locale === 'pt-br' }">
      {{ $t('home.back') }}
    </p>
  </header>

  <main class="home__main">

    <div class="video__container">
      <iframe style="margin:0 auto;max-width: 100%;" width="672" height="378" src="https://www.youtube.com/embed/yKNBdCSvUgk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>

    <template v-if="hasProjects">
      <section class="home__section">
        <BohrTypography tag="h2" variant="title2" color="#55DDE0" class="section__title">
          {{ $t('home.section.lastProjects.title') }}
        </BohrTypography>

        <div class="last__sites" @mouseleave="intentionCardLeave()">
          <template v-for="project in projects" :key="project.name">
            <SiteCard :project="project" />
          </template>
          <router-link class="see__all__sites" :to="{ name: 'Projects' }">
            <ArrowIcon direction="right" :sizePx="32" isGradient />
            <BohrTypography
              variant="title3">
              {{ $t('home.section.lastProjects.seeAll') }}
            </BohrTypography>
          </router-link>
        </div>
      </section>
    </template>
      
    <template v-else>
      <section class="home__section">
        <div class="no__sites__actions" data-intro-anchor="firstSite">
          <NewSiteLink withText @click="firstSiteClick" />
        </div>
        <!-- <BohrTypography tag="h2" variant="title2" color="#55DDE0" class="section__title">
          {{ $t('home.section.intention.title') }}
        </BohrTypography>

        <div class="intention__options" @mouseleave="intentionCardLeave()">
          <template v-for="(option, i) in interactionOptions" :key="option.title">
            <BohrBox
              :variant="intentionBoxVariant[i]"
              class="intention__card"
              :class="intentionBoxFadeClass(i)"
              @mouseover="intentionCardHover(i)"
            >
              <component :is="option.icon" :sizePx="96" isGradient />
              <BohrTypography tag="h3" variant="title3" class="option__title">
                {{ option.title }}
              </BohrTypography>
              <BohrTypography tag="p" variant="body1" class="option__description">
                {{ option.description }}
              </BohrTypography>
              <BohrButton
                component="router-link"
                :to="{ name: 'New', params: { org: username } }"
                size="lg"
                class="option__btn"
                @focus="intentionCardHover(i)"
                @blur="intentionCardLeave()"
              >
                {{ option.buttonText }}
              </BohrButton>
            </BohrBox>
          </template>
        </div> -->
      </section>
    </template>

    <section v-if="globalPresenceOther">
      <BohrTypography tag="h2" variant="title2" color="#55DDE0" class="section__title">
        {{ $t('home.section.developersOnline.title') }}
      </BohrTypography>

      <ul class="global__presence">
        <li>
          <PresenceAvatar
            :username="$store.state.me?.username"
            :avatarUrl="$store.state.me?.avatarUrl"
            :sizePx="60"
          />
        </li>
        
        <template v-for="other in globalPresenceOther" :key="other.connectionId">
          <li>
            <PresenceAvatar
              :username="other.info.username"
              :avatarUrl="other.info.avatarUrl"
              :profileUrl="other.info.mainSiteUrl"
              :colorSeed="other.connectionId"
              :sizePx="60"
            />
          </li>
        </template>
      </ul>
    </section>

    <!-- <section class="home__section">
      <BohrTypography tag="h2" variant="title2" color="#55DDE0" class="section__title">
        {{ $t('home.section.whatsNew.title') }}
      </BohrTypography>

      <div class="whats__new">
        <BohrBox variant="glass">
          <img width="508" height="290" class="whats__new__img" src="/assets/img/placeholder-img.jpg" alt="" />
        </BohrBox>
        <div class="whats__new__info">
          <BohrTypography tag="h3" variant="subtitle1" color="#E84855">
            {{ $t('home.section.whatsNew.info.title') }}
          </BohrTypography>
          <BohrTypography tag="p" variant="body2">
            {{ $t('home.section.whatsNew.info.text') }}
          </BohrTypography>
          <BohrButton size="lg">{{ $t('home.section.whatsNew.info.buttonText') }}</BohrButton>
        </div>
      </div>
    </section>

    <section class="home__section">
      <BohrTypography tag="h2" variant="title2" color="#55DDE0" class="section__title">
        {{ $t('home.section.doMore.title') }}
      </BohrTypography>

      <div class="do__more">
        <template v-for="item in moreWith" :key="item.text">
          <div class="more__item">
            <component :is="item.icon" :sizePx="120" isGradient />
            <BohrTypography tag="p" variant="title2" class="more__item__text">
              {{ item.text }}
            </BohrTypography>
          </div>
        </template>
      </div>
    </section> -->
  </main>
</template>

<script lang="ts">
import BohrTypography from '@/components/BohrTypography.vue';
import APIIcon from '@/components/icons/APIIcon.vue';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import CMSIcon from '@/components/icons/CMSIcon.vue';
import DevelopIcon from '@/components/icons/DevelopIcon.vue';
import DiscordIcon from '@/components/icons/DiscordIcon.vue';
import FrontEndIcon from '@/components/icons/FrontEndIcon.vue';
import ProfileIcon from '@/components/icons/ProfileIcon.vue';
import NewSiteLink from '@/components/NewSiteLink.vue';
import PresenceAvatar from '@/components/PresenceAvatar.vue';
import SiteCard from '@/components/SiteCard.vue';
import { defaultIntro, introJs } from '@/utils/siteIntro';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    BohrTypography,
    NewSiteLink,
    SiteCard,
    ArrowIcon,
    PresenceAvatar,
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
      intetionCardHovered: -1,
    };
  },
  computed: {
    hasProjects() { return Array.isArray(this.$store.state.me?.sites) && Boolean(this.$store.state.me?.sites.length) },

    username() { return this.$store.state.me?.username },

    projects() { return this.$store.state.me?.sites.slice(0, 2) },

    globalPresenceOther() { return this.$store.state.globalPresenceOther },

    interactionOptions() {
      return [
        {
          title: this.$t('home.section.intention.options[0].title'),
          description: this.$t('home.section.intention.options[0].description'),
          buttonText: this.$t('home.section.intention.options[0].buttonText'),
          icon: FrontEndIcon,
        },
        {
          title: this.$t('home.section.intention.options[1].title'),
          description: this.$t('home.section.intention.options[1].description'),
          buttonText: this.$t('home.section.intention.options[1].buttonText'),
          icon: CMSIcon,
        },
        {
          title: this.$t('home.section.intention.options[2].title'),
          description: this.$t('home.section.intention.options[2].description'),
          buttonText: this.$t('home.section.intention.options[2].buttonText'),
          icon: APIIcon,
        },
      ];
    },

    moreWith() {
      return [
        {
          icon: DevelopIcon,
          text: this.$t('home.section.doMore.items[0].text'),
        },
        {
          icon: ProfileIcon,
          text: this.$t('home.section.doMore.items[1].text'),
        },
        {
          icon: DiscordIcon,
          text: this.$t('home.section.doMore.items[2].text'),
        },
      ];
    },

    intentionBoxVariant() {
      const highlightVariant = 'outline-highlight';
      const normalVariant = 'outline';
      const variantArr = [highlightVariant, highlightVariant, highlightVariant];

      if (this.intetionCardHovered === undefined) return variantArr;

      return variantArr.map((_, i) => {
        if (this.intetionCardHovered === i) return highlightVariant;
        return normalVariant;
      });
    },
  },
  mounted() {
    if (!this.hasProjects) defaultIntro([{
      title: this.$t('intro.firstSite.title'),
      intro: this.$t('intro.firstSite.text'),
      element: '[data-intro-anchor="firstSite"]',
    }], this.$i18n.locale).start();
  },
  methods: {
    firstSiteClick() {
      introJs().exit();
    },

    intentionBoxFadeClass(i: number) {
      if (this.intetionCardHovered !== undefined && this.intetionCardHovered !== i) {
        return 'intention__card--fade';
      }

      return '';
    },

    intentionCardHover(i: number) {
      this.intetionCardHovered = i;
    },

    intentionCardLeave() {
      this.intetionCardHovered = -1;
    },
  },
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
  max-width: 896px;
  padding-inline: 33px;
  margin: auto;
}

.video__container {
  margin-bottom: 40px;
  margin-inline: -33px;
  width: calc(100% + 66px);
}

@media screen and (min-width: 767px) {
  .video__container {
    margin-top: -40px;
    margin-inline: auto;
    width: min(100%, 672px);
  }
}

.home__section {
  margin-bottom: 65px;
}

.section__title {
  margin-bottom: 36px;
}

.last__sites {
  display: flex;
  gap: 24px;
}

@media screen and (min-width: 767px) {
  .last__sites :deep(.site__card) {
    max-width: 336px;
    max-height: 192px;
  } 
}

.see__all__sites {
  position: relative;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  min-width: 176px;
  height: 190px;
  margin-bottom: 29px;
  border-radius: 4px;
  background-color: hsl(0, 0%, 0%, 0.2);
  cursor: pointer;
  color: inherit;
  text-decoration: none;
  transition: box-shadow var(--transition);
}

.see__all__sites:focus,
.see__all__sites:hover {
  box-shadow: 0px 12px 36px 0px rgba(255, 0, 13, 0.3);
}

.see__all__sites::before,
.see__all__sites::before {
  content: "";
  position: absolute;
  inset: -2px;
  z-index: 2;
  opacity: 0;
  transition: opacity var(--transition);
  border-radius: 4px;
  border: 2px solid transparent;
  background-image: linear-gradient(0deg, #E84856, #F16622, #F4CD3B); 
  background-origin: border-box;
  pointer-events: none;

  -webkit-mask: linear-gradient(#fff 0 0) padding-box,
                linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) padding-box,
                linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude; 
}

.see__all__sites:focus::before,
.see__all__sites:hover::before {
  opacity: 1;
}

.no__sites__actions {
  width: 336px;
  margin: auto;
}

.global__presence {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.intention__options {
  display: flex;
  gap: 58px
}

.intention__card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 34px 32px;
  text-align: center;
  white-space: pre-line;
  transition: opacity var(--transition);
}

.intention__card--fade {
  opacity: 0.5;
}

.option__title {
  margin-top: 30px;
}

.option__description {
  margin-block: 8px 36px;
}

.option__btn {
  margin-top: auto;
  width: 152px;
}

.whats__new {
  display: flex;
  gap: 48px;
}

.whats__new__img {
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  border-radius: var(--border-radius);
}

.whats__new__info {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;
}

.do__more {
  display: flex;
}

.more__item {
  position: relative;
  flex: 1;
  white-space: pre-line;
  text-align: center;
  border-left: 2px solid transparent;
}

.more__item + .more__item {
  border-left-color: hsl(0, 100%, 100%, 0.1);
}

.more__item + .more__item::before {
  content: 'or';
  position: absolute;
  top: 50%;
  left: -2px;
  transform: translate(-50%, -50%);
  border: 2px solid hsl(0, 100%, 100%, 0.1);
  border-radius: 100%;
  padding: 8px;
  background-color: #0E171D;
}

.more__item__text {
  margin-top: 38px;
}

@media screen and (max-width: 1023px) {
  .home__header {
    font-size: 20.25vw;
  }
}

@media screen and (max-width: 767px) {
  .last__sites {
    flex-direction: column;
  }
}
</style>
