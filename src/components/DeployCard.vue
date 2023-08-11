<template>
  <article class="deploy__card">
    <SkeletonLoading :isShowing="!hasData" borderRadius="circle" height="17px">
      <StatusIndicator :status="status" />
    </SkeletonLoading>

    <div class="deploy__indentification">
      <div class="deploy__indentification__title">
        <SkeletonLoading :isShowing="!hasData">
          <BohrTypography tag="p" variant="subtitle2">{{ deployData.name }}</BohrTypography>
        </SkeletonLoading>
        <SkeletonLoading :isShowing="!hasData">
          <span class="commit__tag">{{ deployData.type }}</span>
        </SkeletonLoading>
      </div>
      <div class="commit__info">
        <BohrTypography tag="p" variant="body3" color="var(--project-url)">
          <SkeletonLoading :isShowing="!hasData" inline>
            {{ $t('components.deployCard.updated') + ' ' + dateText + ' ' + $t('common.by') }} <a class="info__link">{{ deployData.userName || '------' }}</a>
          </SkeletonLoading>
        </BohrTypography>
        <BohrTypography tag="p" variant="body3" color="var(--project-url)">
          <SkeletonLoading :isShowing="!hasData" inline>
            {{ $t('components.deployCard.hashAddress') }}: <a class="info__link">{{ deployData.hash?.slice(0, 7) || '------' }}</a>
          </SkeletonLoading>
        </BohrTypography>
      </div>
    </div>

    <div class="deploy__buttons">
      <SkeletonLoading :isShowing="!hasData" inline>
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

      <BohrButton
        v-if="viewProjectAsATag"
        component="a"
        :href="`https://${deployData.url}`"
        target="_blank"
        rel="noreferrer"
        size="sm"
        class="deploy__card__button"
      >
        {{ $t('common.view') + ' ' + $t('common.project', 1) }}
      </BohrButton>

      <SkeletonLoading v-else :isShowing="!hasData" inline>
        <BohrButton
          size="sm"
          @click="handleViewProject"
          class="deploy__card__button"
        >
          {{ $t('common.view') + ' ' + $t('common.project', 1) }}
        </BohrButton>
      </SkeletonLoading>
    </div>
  </article>
</template>

<script lang="ts">
import BohrButton from '@/components/BohrButton.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import SkeletonLoading from '@/components/SkeletonLoading.vue';
import StatusIndicator from '@/components/StatusIndicator.vue';
import { DeployGroup } from '@/types';
import getDeployStatusType from '@/utils/getDeployStatusType';
import getRelativeTime from '@/utils/getRelativeTime';
import { defineComponent } from '@vue/runtime-core';
import { PropType } from 'vue';

const fakeDeploy: DeployGroup = {
  name: "fakedeploy",
  id: 'asd123',
  deployId: 'asd123',
  status: "BUILDING",
  hash: "1234567",
  type: "BRANCH",
  url: "localhost",
  liveUrl: "localhost",
  userName: "fakeuser",
  updatedAt: new Date().toString(),
  githubActionsRunId: '',
};

export default defineComponent({
  components: {
    BohrButton,
    BohrTypography,
    SkeletonLoading,
    StatusIndicator,
  },
  props: {
    deploy: {
      type: Object as PropType<DeployGroup>,
    },

    viewProjectAsATag: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    deployData() {
      return this.deploy || fakeDeploy;
    },    

    hasData() {
      return Boolean(this.deploy);
    },

    dateText() {
      return getRelativeTime(this.$i18n.locale, new Date(this.deployData.updatedAt || (this.deployData as any).createdAt));
    },

    status() {
      return getDeployStatusType(this.deployData.status as any);
    },

    org() {
      return this.$route.params.org;
    },

    project() {
      return this.$route.params.project;
    },
  },
  methods: {
    handleViewProject() {
      if (!this.deploy) return;

      this.$store.commit('site/setSelectedPreview', {
        type: this.deployData.type,
        name: this.deployData.name,
      });

      if (!this.$mq.tablet) {
        this.$store.dispatch('openPreview');
      } else {
        const url = this.deployData.liveUrl || this.deployData.url;
        window.open(location.protocol + '//' + url, '_blank');
      }
    },
  }
});
</script>

<style scoped>
.deploy__card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  justify-content: flex-start;
  align-items: center;
  gap: 22px;
  margin-inline: 20px;
  padding-left: 10px;
  padding-block: 24px;
}

.deploy__card + .deploy__card {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.deploy__indentification {
  flex-grow: 1;
  display: flex;
  align-items: center;
  gap: 7px;
}

.deploy__indentification__title {
  display: flex;
  gap: 7px;
}

.commit__tag {
  background: rgba(0, 0, 0, 0.6);

  font-weight: 700;
  font-size: 8px;
  line-height: 9px;
  text-align: center;
  text-transform: uppercase;
  
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 2px;
  padding: 3px 6px;
}

.commit__info {
  text-align: center;
  margin-left: auto;
}

.info__link {
  font-weight: 700;
  text-decoration: none;
  color:  #F6AE2D;
}

.deploy__buttons {
  display: flex;
  align-items: center;
  gap: 5px;
}

.deploy__card__button {
  min-width: 100px;
}
@media screen and (max-width: 767px) {
  .deploy__card {
    grid-template-columns: auto 1fr;
    grid-template-areas:
      "status info"
      "status buttons";
  }
  
  .deploy__indentification {
    grid-area: info;
    flex-direction: column;
    align-items: flex-start;
  }

  .deploy__buttons {
    grid-area: buttons;
    justify-content: center;
  }

  .commit__info {
    text-align: left;
    margin-left: 0;
  }
}
</style>
