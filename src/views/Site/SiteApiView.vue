<template>
  <main>
    <SiteContextSelector @change="changeContext" />
    <iframe v-if="apiUrl" :src="apiUrl" class="api__iframe"></iframe>
  </main>
</template>

<script lang="ts">
import SiteContextSelector from '@/components/SiteContextSelector.vue';
import { getSiteSettings } from '@/services/api/projectSettings';
import toastService from '@/services/ToastService';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    SiteContextSelector,
  },
  data() {
    return {
      apiUrl: '',
    }
  },
  methods: {
    async changeContext(newContext: string) {
      const org = this.$route.params.org as string;
      const project = this.$route.params.project as string;

      const { data, error } = await getSiteSettings(org, project, newContext);
      
      if (error) {
        toastService.error(this.$t('settings.message.failedToLoadSettings'));
        return;
      }

      this.apiUrl = `https://${data.url}/api`;
    },
  },
})
</script>

<style scoped>
.api__iframe {
  width: 100%;
  min-height: 557px;
  border: none;
  margin-top: 16px;
  background-color: hsl(0, 0%, 100%);
}
</style>
