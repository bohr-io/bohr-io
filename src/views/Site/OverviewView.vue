<template>
  <main class="site__overview">
    <ErrorDiscordCTA
      v-if="mainDeploy?.status === 'ERROR'"
      class="deploy__error__message"
    />

    <MainDeployDash :deploy="mainDeploy" />
    
    <section>
      <BohrTypography tag="h2" variant="title2" color="hsl(181, 69%, 61%)" class="section__title">
        {{ $t('overview.previewDeploys') }}
        <BohrHelpLink topic="previewDeploy" color="hsla(181, 69%, 61%, 1)" />
      </BohrTypography>
      <BohrBox class="deploys__list">
        <template v-for="deploy in deploys" :key="deploy.hash">
          <DeployCard :deploy="deploy" />
        </template>

        <template v-if="!deploys">
          <DeployCard />
          <DeployCard />
          <DeployCard />
        </template>

        <div
          v-if="deploys && deploys.length < 1"
          class="no__deploys"
        >
          <BohrTypography tag="p" variant="title2" textAlign="center" color="hsl(0, 0%, 40%)">
            {{ $t('overview.noDeploys') }}
          </BohrTypography>
        </div>
      </BohrBox>
    </section>
    
    <section v-if="hasPermission">
      <BohrTypography tag="h2" variant="title2" color="hsl(181, 69%, 61%)" v-show="viewLocalHost">
        {{ $t('overview.localhosts') }}
        <BohrHelpLink topic="localhost" color="hsla(181, 69%, 61%, 1)" />
      </BohrTypography>

      <div class="localhost__list">
        <template v-for="localhost in localhosts" :key="localhost.branch">
          <LocalhostCard :localhost="localhost" />
        </template>
        
        <template v-if="!localhosts">
          <LocalhostCard />
          <LocalhostCard />
        </template>
      </div>

      <div class="clone__command">
        <div class="clone__command__text">
          <BohrTypography
            v-for="line in cloneCommandLines"
            :key="line"
            tag="p"
            variant="title3"
            color="hsl(202, 18%, 80%)"
          >
            {{ line }}
          </BohrTypography>
        </div>
        <BohrButton @click="handleCommandCopy">{{ $t('common.copy') }}</BohrButton>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import BohrBox from '@/components/BohrBox.vue';
import BohrButton from '@/components/BohrButton.vue';
import BohrHelpLink from '@/components/BohrHelpLink.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import DeployCard from '@/components/DeployCard.vue';
import ErrorDiscordCTA from '@/components/ErrorDiscordCTA.vue';
import LocalhostCard from '@/components/LocalhostCard.vue';
import MainDeployDash from '@/components/MainDeployDash.vue';
import { getOverview } from '@/services/api';
import { DeployGroup, LocalhostData } from '@/types/index';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SiteOverview',
  components: {
    BohrBox,
    BohrButton,
    BohrTypography,
    DeployCard,
    MainDeployDash,
    LocalhostCard,
    BohrHelpLink,
    ErrorDiscordCTA
  },
  data() {
    return {
      orgOrUser: this.$route.params.org,
      repoName: this.$route.params.project,
      mainDeploy: null as null | DeployGroup,
      deploys: null as null | DeployGroup[],
      localhosts: null as null | LocalhostData[],
      deploysUpdateIntervalId: null as null | number,
      org: this.$route.params.org,
      project: this.$route.params.project,
      username: this.$store.state.me?.username,
      permission: '',
    }
  },
  computed: {
    cloneCommandLines() {
      return [
        `git clone https://github.com/${this.org}/${this.project}.git`,
        `cd ${this.project}`,
        'npx -y bohr@latest dev',
      ];
    },
    viewLocalHost () {
      return this.localhosts && this.localhosts.length != 0 || window.screen.width >= 500
    },
    hasPermission() {
      return this.permission === 'write'
    },
  },
  created() {
    this.getOverviewData();
    this.deploysUpdateIntervalId = setInterval(this.getOverviewData, 1000);
  },
  beforeUnmount() {
    if (this.deploysUpdateIntervalId !== null) {
      clearInterval(this.deploysUpdateIntervalId);
    }
  },
  methods: {
    async getOverviewData() {
      const { org, project } = this.$route.params as { org: string, project: string };
      const { data, error } = await getOverview(org, project);

      if (error) {
        return;
      }

      const {
        mainDeployGroup,
        parsedDeploysGroups,
        localhosts,
      } = data;

      if (new URL(location.href).hostname == 'localhost' && mainDeployGroup != undefined) {
        mainDeployGroup.url = new URL(location.href).host;
        mainDeployGroup.liveUrl = new URL(location.href).host;
      }

      if (mainDeployGroup.status === 'SUCCESS' && this.deploysUpdateIntervalId) {
        clearInterval(this.deploysUpdateIntervalId);
      }

      this.mainDeploy = mainDeployGroup;
      this.deploys = parsedDeploysGroups || [];
      this.localhosts = localhosts || [];
      this.createPreviewOptions();
      this.$data.permission = data.permission;
    },

    createPreviewOptions() {
      if (
        !this.mainDeploy ||
        !this.deploys ||
        !this.localhosts
      ) {
        return;
      }

      const options = {
        [this.mainDeploy.type]: [
          {
            name: this.mainDeploy.name,
            url: this.mainDeploy.url,
            liveUrl: this.mainDeploy.liveUrl,
            type: this.mainDeploy.type as string,
            status: this.mainDeploy.status,
          }
        ],
      };
      
      this.deploys.forEach((deploy) => {
        if (!options[deploy.type]) options[deploy.type] = [];
        options[deploy.type].push({
          name: deploy.name,
          url: deploy.url,
          liveUrl: deploy.liveUrl,
          type: deploy.type,
          status: deploy.status,
        });
      });

      this.localhosts.forEach((localhost) => {
        if (!options.LOCALHOST) options.LOCALHOST = [];
        options.LOCALHOST.push({
          name: localhost.userName,
          url: localhost.url,
          liveUrl: localhost.url,
          type: 'LOCALHOST',
          status: localhost.status,
        });
      });

      this.$store.commit('site/setPreviewOptions', options);
    },

    handleCommandCopy() {
      navigator.clipboard.writeText(this.cloneCommandLines.join('\n'));
    },
  },
});
</script>

<style scoped>
.deploy__error__message {
  margin-bottom: 48px;
}

.section__title {
  margin-block: 45px 24px;
}

.deploys__list {
  margin-top: 24px;
}

.no__deploys {
  padding: 64px 16px;
}

.clone__command {
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.25);
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 36px;
}

.localhost__list {
  margin-top: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: row;
  column-gap: 48px;
  row-gap: 35px;
}

@media screen and (max-width: 767px) {
  .localhost__list {
    display: block;
  }

  .clone__command {
    display: none;
    flex-direction: column;
  }

  .clone__command__text {
    align-self: flex-start;
  }
}
</style>
