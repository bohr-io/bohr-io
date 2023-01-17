<template>
  <div class="page__title__container">
    <BohrTypography v-if="pagePath" variant="title3" color="hsl(47, 62%, 47%)" class="page__path">
      {{ pagePath }}
    </BohrTypography>
    <BohrTypography tag="h1" variant="title1" color="hsl(47, 89%, 59%)" class="page__title" :class="{ capitalize: !withoutTextTransform }">
      {{ pageName }}
      <BohrHelpLink v-if="helpLinkTopic" :topic="helpLinkTopic" color="hsla(47, 89%, 59%, 1)" class="help__link" />
    </BohrTypography>
    <span ref="pageTitleShadow" class="page__title__shadow">{{ pageTitleShadow }}</span>
  </div>
</template>

<script lang="ts">
import BohrHelpLink from '@/components/BohrHelpLink.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    BohrHelpLink,
    BohrTypography
  },
  props: {
    pageName: {
      type: String,
      required: true,
    },

    withoutTextTransform: Boolean,
    pagePath: String,
    shadowText: String,
    shadowVerticalOffset: String,
  },
  data() {
    return {
      shadowMaxWidth: 'max-content',
    };
  },
  computed: {
    helpLinkTopic() { return this.$route.meta.helpLinkTopic as typeof BohrHelpLink['topic'] },
    pageTitleShadow() { return `${this.shadowText || this.pageName}` },
    shadowTop() {
      if (this.shadowVerticalOffset) {
        return `calc(-0.3em + ${this.shadowVerticalOffset})`;
      }

      return '-0.3em';
    },
  },
  mounted() {
    this.setShadowMaxWidth();
    window.addEventListener('resize', this.setShadowMaxWidth);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.setShadowMaxWidth);
  },
  methods: {
    setShadowMaxWidth() {
      const { left } = (this.$refs.pageTitleShadow as HTMLElement).getBoundingClientRect();
      const pageWidth = document.body.clientWidth;
      const offset = pageWidth - left;
      this.shadowMaxWidth = `${offset}px`;
    },
  },
});
</script>

<style scoped>
.page__title__container {
  position: relative;
  z-index: 0;
}

.page__path::before {
  content: '/';
  font-size: 18px;
  color: #625217;
  margin-right: 4px;
}

.page__title.capitalize {
  text-transform: capitalize;
}

.page__title__shadow {
  position: absolute;
  top: v-bind(shadowTop);
  left: 0.02em;
  z-index: -1;
  font-weight: 700;
  font-size: 240px;
  letter-spacing: -0.1em;
  color: #000000;
  opacity: 0.1;
  pointer-events: none;
  text-transform: lowercase;
  max-width: v-bind(shadowMaxWidth);
  white-space: nowrap;
  user-select: none;
}

.help__link {
  position: relative;
  top: -20px;
  left: -10px;
}
</style>