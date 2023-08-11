<template>
  <BohrBox class="localhost__card">
    <div class="localhost__info">
      <SkeletonLoading :isShowing="!hasData" width="48px" height="48px" borderRadius="12">
        <img
          width="48"
          height="48"
          :src="localhostData.userImage"
          alt="avatar"
          class="localhost__avatar"
        />
      </SkeletonLoading>
      <div class="localhost__identification">
        <div class="localhost__header">
          <BohrTypography tag="p" variant="title3">
            <SkeletonLoading :isShowing="!hasData">
              {{ localhostData.deployGroupName }}
            </SkeletonLoading>
          </BohrTypography>
          <div class="localhost__status" :class="{ live: isLive }">
            <SkeletonLoading :isShowing="!hasData" borderRadius="circle" height="12px">
              <svg class="status__indicator" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="10" height="10" />
              </svg>
            </SkeletonLoading>
            <SkeletonLoading :isShowing="!hasData" borderRadius="circle" height="12px">
              <span class="status__text" >
                {{ isLive ? $t('common.live') : $t('common.offline') }}
              </span>
            </SkeletonLoading>
          </div>
        </div>
        <BohrTypography tag="p" variant="body3" color="var(--project-url)">
          <SkeletonLoading :isShowing="!hasData" inline>
            {{ $t('components.localhostCard.updated') + ' ' + lastUpdate + ' ' + $t('common.by') }} <a class="info__link">{{ localhostData.userName || '------' }}</a>
          </SkeletonLoading>
        </BohrTypography>
        <BohrTypography tag="p" variant="body3" color="var(--project-url)">
          <SkeletonLoading :isShowing="!hasData" inline>
            {{ $t('components.localhostCard.hashAddress') }}: <a class="info__link">{{ localhostData.hash.slice(0, 7) || '------' }}</a>
          </SkeletonLoading>
        </BohrTypography>
      </div>
    </div>
    <div class="view__site">
      <SkeletonLoading :isShowing="!hasData" width="100%">
        <BohrButton
          size="sm"
          color="secondary"
          class="view__button"
          :variant="isLive ? 'default' : 'ghost'"
          :disabled="!isLive"
          @click="handleViewProject"
        >
          {{ $t('common.view') + ' ' + $t('common.project', 1) }}
        </BohrButton>
      </SkeletonLoading>
      <BohrTypography
        tag="p"
        variant="body3"
        :color="isLive ? 'hsla(131, 66%, 84%, 1)' : 'hsla(0, 0%, 40%, 1)'"
      >
        <SkeletonLoading :isShowing="!hasData" inline>
          {{ onlineText }}
        </SkeletonLoading>
      </BohrTypography>
    </div>
  </BohrBox>
</template>

<script lang="ts">
import BohrBox from '@/components/BohrBox.vue';
import BohrButton from '@/components/BohrButton.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import getRelativeTime from '@/utils/getRelativeTime';
import { defineComponent } from 'vue';
import SkeletonLoading from './SkeletonLoading.vue';

const fakeLocalhost = {
  userName: "fakeuser",
  userImage: "",
  deployGroupName: "fakegroup",
  hash: "1234567",
  deployGroupUpdatedAt: new Date().toString(),
  updatedAt: new Date().toString(),
  status: "RUNNING",
  url: "localhost",
};

export default defineComponent({
  components: {
    BohrBox,
    BohrButton,
    BohrTypography,
    SkeletonLoading
},
  props: ['localhost'],
  data() {
    return {
      isLive: this.localhost?.status === 'RUNNING',
    };
  },
  computed: {
    localhostData() {
      return this.localhost || fakeLocalhost;
    },

    hasData() {
      return Boolean(this.localhost);
    },

    lastUpdate() {
      return getRelativeTime(this.$i18n.locale, new Date(this.localhostData.updatedAt));
    },

    onlineText() {
      const timeMiliseconds = new Date().getTime() - new Date(this.localhostData.updatedAt).getTime();
      const minutes = Math.floor((timeMiliseconds / (1000*60)) % 60);
      const hours = Math.floor(timeMiliseconds / (1000*60*60));

      if (this.isLive) return `${this.$t('components.localhostCard.onlineFor')} ${hours}h${minutes}min`;
      return `${this.$t('components.localhostCard.lastTimeOnline')} ${hours}h${minutes}min`;
    },
  },
  methods: {
    handleViewProject() {
      const { userName, url } = this.localhostData;
      this.$store.commit('site/setSelectedPreview', {
        type: 'LOCALHOST',
        name: userName,
      });

      if (!this.$mq.tablet) {
        this.$store.dispatch('openPreview');
      } else {
        window.open(location.protocol + '//' + url, '_blank');
      }
    }
  }
});
</script>

<style scoped>
.localhost__card {
  padding: 36px;
}

.localhost__info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.localhost__avatar {
  width: 48px;
  height: 48px;
  border-radius: 12px;
}

.localhost__identification {
  display: flex;
  flex-direction: column;
  min-height: 48px;
}

.localhost__header {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: auto;
}

.localhost__status {
  display: flex;
  align-items: center;
  gap: 4px;
}

.status__text {
  display: inline-block;
  font-weight: 700;
  font-size: 8px;
  line-height: 9px;
  color: hsl(0, 0%, 100%);
  padding: 0.5px 4px;
  text-transform: uppercase;
}

.status__indicator,
.status__text {
  background:  linear-gradient(180deg, hsl(202, 32%, 18%) 0%, hsl(204, 35%, 8%) 100%);
  box-shadow: 0 2px 4px hsla(216, 53%, 30%, 0.48);
  border: 1px solid hsla(0, 0%, 100%, 0.25);
  border-radius: 999px;
}

.localhost__status.live .status__indicator,
.localhost__status.live .status__text {
  background:  linear-gradient(180deg, hsl(21, 89%, 52%) 0%, hsl(355, 78%, 60%) 100%);
  box-shadow: none;
  border: 1px solid hsla(0, 0%, 100%, 0.5);
}

.info__link {
  font-weight: 700;
  text-decoration: none;
  color:  hsl(39, 92%, 57%);
}

.view__site {
  display: flex;
  gap: 24px;
  align-items: center;
  margin-top: 24px;
  margin-left: 64px;
}

.view__button {
  min-width: 78px;
  width: 100%;
}

@media screen and (max-width: 767px) {
  .localhost__card {
    padding: 24px;
  }

  .view__site {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
