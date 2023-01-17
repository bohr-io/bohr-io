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

export default {
  name: 'OrgSettings',
  components: {
    BohrSelector,
    BohrPageTitle
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
