<template>
  <main class="site__deploys">
    <div class="context__select">
      <BohrSelect name="context-select" v-model="selectedContext">
        <option value="all">All Deploys</option>
        <optgroup
          v-for="(groupOptions, groupName) in contexts"
          :key="groupName"
          :label="groupName"
        >
          <option
            v-for="option in groupOptions"
            :key="option"
            :value="option.id"
          >
            {{ option.name }}
          </option>
        </optgroup>
      </BohrSelect>
    </div>
    <section>
      <BohrBox>
        <template v-for="deploy in deploysOnDisplay" :key="deploy.id">
          <DeployCard :deploy="deploy" viewProjectAsATag />
        </template>
      </BohrBox>
    </section>
  </main>
</template>

<script>
import BohrBox from '@/components/BohrBox.vue';
import BohrSelect from '@/components/BohrSelect.vue';
import DeployCard from '@/components/DeployCard.vue';
import { getDeploys, getDeployGroup } from '@/services/api';

export default {
  components: {
    BohrBox,
    BohrSelect,
    DeployCard,
  },
  data() {
    return{
      orgOrUser: this.$route.params.org,
      repoName: this.$route.params.project,
      selectedContext: 'all',
      deploys: null,
      deployGroup: null,
    }
  },
  computed: {
    deploysOnDisplay() {
      return this.selectedContext === 'all'
        ? this.deploys
        : this.deploys?.filter(({ deployGroupId }) => {
          return deployGroupId === this.selectedContext;
        }
      );
    },

    contexts() {
      const contextMap = {
        'BRANCH': 'Branch',
        'PR': 'Pull Request',
        'TAG': 'Tag'
      };

      const contextData = this.deployGroup?.reduce((acc, cur) => {
        const optgroup = contextMap[cur.type];
        
        if (!acc[optgroup]) acc[optgroup] = [];

        acc[optgroup] = [
          ...acc[optgroup],
          { name: cur.name, id: cur.id }
        ];

        return acc;
      }, {})

      return contextData;
    },
  },
  async created() {
    try {
      const { org, project } = this.$route.params;
      const [
        { data: deploysData },
        { data: deployGroupData },
      ] = await Promise.all([
        getDeploys(org, project),
        getDeployGroup(org, project),
      ])

      this.deploys = deploysData.sort((deploy1, deploy2) => {
        return new Date(deploy2.createdAt) - new Date(deploy1.createdAt)
      });

      this.deployGroup = deployGroupData;
    } catch (err) {
      console.log(err);
    }
  },
}
</script>

<style scoped>
.site__deploys {
  position: relative;
}

.context__select {
  position: absolute;
  top: -16px;
  right: 0;
  transform: translateY(-100%);
}

.deploys__list {
  margin-top: 24px;
}
</style>
