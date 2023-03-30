<template>
  <main class="settings__page">
    <BohrPageTitle :pageName="$t('common.account')" />
    <div class="settings__selector" v-if="$store.state.me.orgs.length > 1">
      <h1 class="settings__heading">{{ $route.params.org }}</h1>
      <BohrSelector
        :hideSelected="true"
        :defaultOption="$route.params.org"
        :options="$store.state.me.orgs"
        @selected="changeContext"
      />
    </div>
    <BohrInformativePlan
      v-if="plan === 'FREE'"
      class="informative__plan"
    />
    <div class="settings__panel">
      <div class="settings__content">
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>

<script>
import BohrSelector from '@/components/BohrSelector';
import BohrPageTitle from '@/components/BohrPageTitle.vue';
import BohrInformativePlan from '@/components/BohrInformativePlan.vue';

export default {
  name: 'OrgSettings',
  components: {
    BohrSelector,
    BohrPageTitle,
    BohrInformativePlan,
  },
  data() {
    return {
      lastRoute: { name: 'Projects' }
    }
  },
  methods: {
    changeContext(newContext) {
      this.$router.push({
        name: 'OrgSettingsGeneral',
        params: {
          org: newContext
        }
      });
    }
  },
  computed: {
    plan() { return this.$store.state.me?.plan },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.lastRoute = from;
    });
  }
}
</script>

<style scoped>
  .settings__page {
    display: flex;
    flex-direction: column;
    max-width: 1056px;
    margin-inline: auto;
  }

  .settings__selector{
    display: flex; 
    align-items: center;
  }

  .settings__back-btn {
    font-size: 18px;
    font-weight: 700;
    text-decoration: underline;
    padding-right: 2rem;
  }

  .settings__heading {
    display: inline-block;
    margin: 20px 8px 20px 0px;
    font-size: 48px;
  }

.informative__plan {
  margin: 15px 0px 15px 0px;
}

  .settings__panel {
    display: flex;
    gap: 55px;
    margin-top: 16px;
  }

  .settings__content {
    display: flex;
    flex-direction: column;
    gap: 32px;
    flex: 1;
  }
</style>
