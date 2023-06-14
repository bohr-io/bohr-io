<template>
  <section class="main__deploy">
    <div class="main__deploy__info">
      <BohrTypography tag="h2" variant="title2" color="hsl(181, 69%, 61%)" class="main__deploy__title">
        <SkeletonLoading :isShowing="!hasDeploy" borderRadius="circle" inline height="17px">
          <StatusIndicator :status="status" />
        </SkeletonLoading>
        <SkeletonLoading :isShowing="!hasDeploy" inline>
          {{ $t('overview.mainDeploy') }}
        </SkeletonLoading>
      </BohrTypography>
    </div>
    <div class="preview__column">
      <component :is="previewComponent"/>
    </div>
    <div class="main__deploy__info">
      <BohrTypography tag="p" variant="title4" class="last__update__title">
        <SkeletonLoading :isShowing="!hasDeploy" inline>
          {{ $t('components.mainDeployCard.lastUpdate') }}
        </SkeletonLoading>
      </BohrTypography>
      <BohrTypography tag="p" variant="body1" class="commit__title">
        <SkeletonLoading :isShowing="!hasDeploy" inline>
          {{ deployData.name }}
        </SkeletonLoading>
      </BohrTypography>
      <BohrTypography tag="p" variant="body3" color="hsl(0, 0%, 60%)" class="commit__date__author">
        <SkeletonLoading :isShowing="!hasDeploy" inline>
          {{ $t('components.mainDeployCard.updated') + ' ' + dateText + ' ' + $t('common.by') }} <a class="info__link">{{ deployData.userName }}</a>
        </SkeletonLoading>
      </BohrTypography>
      <BohrTypography tag="p" variant="body3" color="hsl(0, 0%, 60%)" class="commit__hash">
        <SkeletonLoading :isShowing="!hasDeploy" inline>
          {{ $t('components.mainDeployCard.hashAddress') }}: <a class="info__link">{{ deployData.hash.slice(0, 7) }}</a>
        </SkeletonLoading>
      </BohrTypography>
      <BohrTypography tag="p" variant="body3" color="hsl(0, 0%, 60%)" class="site__url">
        <SkeletonLoading :isShowing="!hasDeploy" inline>
          https://{{ deployData.url }}
        </SkeletonLoading>
      </BohrTypography>
    
      <div class="main__deploy__buttons">
        <SkeletonLoading :isShowing="!hasDeploy" inline>
          <BohrButton
            :component="deployData.githubActionsRunId ? 'a' : 'button'"
            :href="`https://github.com/${org}/${project}/actions/runs/${deployData.githubActionsRunId}`"
            target="_blank"
            rel="noreferrer"
            variant="ghost"
            size="sm"
            class="deploy__card__button"
            :disabled="!deployData.githubActionsRunId"
          >
            {{ $t('common.view') + ' ' + $t('common.logs') }}
          </BohrButton>
        </SkeletonLoading>
        <SkeletonLoading :isShowing="!hasDeploy" inline>
          <BohrButton @click="openPreview">
            {{ $t('common.view') + ' ' + $tc('common.project', 1) }}
          </BohrButton>
        </SkeletonLoading>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import BohrButton from '@/components/BohrButton.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import SitePreview from '@/components/SitePreview.vue';
import SitePreviewPublic from '@/components/SitePreviewPublic.vue';
import SkeletonLoading from '@/components/SkeletonLoading.vue';
import StatusIndicator from '@/components/StatusIndicator.vue';
import getDeployStatusType from '@/utils/getDeployStatusType';
import getRelativeTime from '@/utils/getRelativeTime';
import { defineComponent } from 'vue';

const fakeDeploy = {
  name: "fakedeploy",
  status: "BUILDING",
  hash: "1234567",
  type: "BRANCH",
  url: "localhost",
  liveUrl: "localhost",
  userName: "fakeuser",
  updatedAt: new Date().toString(),
};

export default defineComponent({
  components: {
    BohrButton,
    BohrTypography,
    SitePreview,
    SkeletonLoading,
    StatusIndicator,
    SitePreviewPublic,
  },
  props: ['deploy'],
  computed: {
    deployData() {
      return this.deploy || fakeDeploy
    },

    hasDeploy() {
      return Boolean(this.deploy);
    },

    dateText() {
      return getRelativeTime(this.$i18n.locale, new Date(this.deployData.updatedAt));
    },

    status() {
      return getDeployStatusType(this.deployData.status);
    },

    org() {
      return this.$route.params.org;
    },

    project() {
      return this.$route.params.project;
    },
    previewComponent() {
      if (this.$route.path.includes("/public/")) {
        return SitePreviewPublic;
      } else {
        return SitePreview;
      }
    }
  },
  methods: {
    openPreview() {
      if (!this.hasDeploy) return;
      if (!this.$mq.tablet) {
        this.$store.commit('setPreview', true);
      } else {
        const selectedPreviewData = this.$store.getters['site/selectedPreviewData'];
        window.open(location.protocol + '//' + selectedPreviewData.liveUrl, '_blank');
      }
    },
  }
})
</script>

<style scoped>
.main__deploy {
  display: grid;
  grid-template-columns: 32.16% 1fr;
  padding: 36px;
  border-radius: 8px;
  background-image: linear-gradient(292.48deg, transparent 38.89%, hsla(0, 0%, 0%, 0.425) 80.13%);
}

.main__deploy__title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.last__update__title {
  margin-top: 36px;
}

.commit__title {
  margin-top: 8px;
}

.commit__date__author {
  margin-top: 24px;
}

.info__link {
  color: hsl(39, 92%, 57%);
  font-weight: 700;
}

.site__url {
  margin-top: 24px;
}

.main__deploy__buttons {
  display: flex;
  gap: 24px;
  margin-top: 36px;
}

.main__deploy__buttons > :nth-child(1) {
  flex-grow: 1;
}

.main__deploy__buttons > :nth-child(2) {
  flex-grow: 1.25;
}

.preview__column {
  --transition: 1s linear;  

  position: relative;
  margin-left: auto;
  padding-right: 36px;
  width: 468px;
  box-sizing: border-box;
}

.main__deploy__no-data {
  position: relative;
  margin-top: 36px;
  grid-column: span 2;
}

@media screen and (max-width: 767px) {
  .main__deploy {
    grid-template-columns: 1fr;
  }

  .preview__column {
    width: 100%;
    padding-right: 0;
  }

  .preview__container {
    position: relative;
    width: 100%;
    top: 16px;
    transform: none;
  }
}
</style>
