<template>
  <BohrIconButton
    component="a"
    :href="url"
    target="_blank"
    :label="label"
    @mousedown="gtagEvent"
  >
    <HelpIcon :sizePx="16" :color="color" />
  </BohrIconButton>
</template>

<script lang="ts">
import BohrIconButton from './BohrIconButton.vue';
import { defineComponent, PropType } from 'vue';
import HelpIcon from './icons/HelpIcon.vue';

const topicDocUrlMap = {
  authentication: 'https://docs.bohr.io/docs/autenticacao', //
  domains: 'https://docs.bohr.io/docs/domains', //
  envVars: 'https://docs.bohr.io/docs/variaveis-de-ambiente', //
  import: 'https://docs.bohr.io/docs/importacao', //
  localhost: 'https://docs.bohr.io/docs/localhost', //
  logs: 'https://docs.bohr.io/docs/logs', //
  previewDeploy: 'https://docs.bohr.io/docs/preview-deploys', //
  projectSettings: 'https://docs.bohr.io/docs/project-settings', //
  templates: 'https://docs.bohr.io/docs/templates', //
  'portfolio-template': 'https://docs.bohr.io/docs/portfolio-template',
  'gatsby-portfolio-template': 'https://docs.bohr.io/docs/gastby-template',
  'dashboard-template': 'https://docs.bohr.io/docs/dashboard-template',
  'portfolio-template-dev': 'https://docs.bohr.io/docs/portfolio-template',
  'gatsby-portfolio-template-dev': 'https://docs.bohr.io/docs/gastby-template',
  'dashboard-template-dev': 'https://docs.bohr.io/docs/dashboard-template',
}

export default defineComponent({
  components: {
    BohrIconButton,
    HelpIcon,
  },
  props: {
    color: String,
    topic: {
      type: String as PropType<keyof typeof topicDocUrlMap>,
      required: true,
    }
  },
  computed: {
    label() {
      const docs = this.$t('components.bohrHelpLink.docs');
      const topic = this.$t(`components.bohrHelpLink.${this.topic}`);

      const labelMap = {
        'en-US': `${topic} ${docs}`,
        'pt-BR': `${docs} ${topic}`,
      };

      return labelMap[this.$i18n.locale as keyof typeof labelMap];
    },

    url() {
      return topicDocUrlMap[this.topic];
    },
  },
  methods: {
    gtagEvent(e: MouseEvent) {
      if (![0, 1].includes(e.button)) {
        return;
      }

      this.$gtag.event(`help_link_${this.topic}`, {
        'app_name': 'bohr.io',
        'screen_name': this.$route.name,
      });
    }
  },
});
</script>

<style scoped>
</style>