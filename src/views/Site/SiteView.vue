<template>
  <div class="page__container">
    <BackButton :to="{ name: 'Projects' }" />
    <BohrSiteHeader
      :pageName="pageName"
      :breadcrumbs="[$route.params.org, $route.params.project]"
      :flavorText="flavorText"
    />
    <div class="code__links">
      <BohrIconButton
        component="a"
        :href="previewUrl"
        target="_blank"
        rel="noreferrer"
        :label="previewUrl"
        :backgroundColor="previewUrl ? '#F6AE2D' : '#999'"
        :withoutHoverEffect="true"
      >
        <NewWIndowIcon :sizePx="18" color="#111B22" />
      </BohrIconButton>
      <span class="separator"></span>
      <BohrIconButton
        component="a"
        :href="`https://github.com/${org}/${project}`"
        target="_blank"
        rel="noreferrer"
        :label="`https://github.com/${org}/${project}`"
      >
        <GithubIcon />
      </BohrIconButton>
      <span class="separator"></span>
      <BohrIconButton
        component="a"
        :href="`https://github.dev/${org}/${project}`"
        target="_blank"
        rel="noreferrer"
        :label="`https://github.dev/${org}/${project}`"
        class="vscode__link"
      >
        <VSCodeIcon :sizePx="32" type="light" />
      </BohrIconButton>
    </div>
    <div class="site__container">
      <BohrSiteBar v-if="!isSettingsPage" />
      <router-view />
    </div>
  </div>
  <BohrPreviewBar />
</template>

<script lang="ts">
import BackButton from '@/components/BackButton.vue';
import BohrIconButton from '@/components/BohrIconButton.vue';
import BohrPreviewBar from '@/components/BohrPreviewBar.vue';
import BohrSiteBar from '@/components/BohrSiteBar.vue';
import BohrSiteHeader from "@/components/BohrSiteHeader.vue";
import GithubIcon from '@/components/icons/GithubIcon.vue';
import VSCodeIcon from '@/components/icons/VSCodeIcon.vue';
import NewWIndowIcon from '@/components/icons/NewWIndowIcon.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    BackButton,
    BohrIconButton,
    BohrPreviewBar,
    BohrSiteHeader,
    BohrSiteBar,
    GithubIcon,
    VSCodeIcon,
    NewWIndowIcon
  },
  data() {
    return {
      isModalOpen: false,
      org: this.$route.params.org,
      project: this.$route.params.project,
    }
  },
  computed: {
    pageName() {
      const { pageName } = this.$route.meta;
      return this.$t(`common.${pageName}`);
    },

    isSettingsPage() {
      const projectSettingsMatch = this.$route.matched.find((match) => match.name === 'ProjectSettings');
      return Boolean(projectSettingsMatch);
    },

    flavorText() {
      const { pageName } = this.$route.meta;
      const { locale, messages } = this.$i18n as any;
      const hasFlavorText = Boolean(messages[locale][pageName as string]?.flavorText);

      if (!hasFlavorText) return;

      return this.$t(`${pageName}.flavorText`);
    },

    selectedPreviewData() {
      return this.$store.getters['site/selectedPreviewData'];
    },

    previewUrl() {
      if (this.selectedPreviewData) {
        const url = this.selectedPreviewData.liveUrl || this.selectedPreviewData.url;
        return location.protocol + '//' + url;
      } else {
        return '';
      }
    }
  },
  created() {
    this.$store.dispatch('site/get', {
      orgName: this.$route.params.org,

      siteName: this.$route.params.project,
    })
  },
  unmounted() {
    this.$store.dispatch('site/reset');
  },
});
</script>

<style scoped>
.page__container {
  position: relative;
  max-width: 1152px;
  margin-inline: auto;
}

.code__links {
  display: flex;
  align-items: center;
  gap: 16px;
  position: absolute;
  right: 0;
  top: 0;
}

.code__links a {
  width: 32px;
  height: 32px;
}

.code__links .separator {
  width: 1px;
  height: 32px;
  background: linear-gradient(180deg, hsl(39, 92%, 57%) 0%, hsl(21, 89%, 52%) 15.15%, hsl(355, 78%, 60%) 100%);
  border-radius: 1px;
}

.site__container {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: 'sidebar main';
  width: 100%;
}

.site__error__button {
  margin-top: 20px;
}

@media screen and (max-width: 1023px) {
  .site__container {
    display: block;
  }
}

@media screen and (max-width: 767px) {
  .code__links {
    top: -46px;
  }

}
</style>