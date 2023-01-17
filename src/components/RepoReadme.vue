<template>
  <div
    v-html="parsedMarkdown"
    ref="container"
    class="markdown__container"
  >
  </div>
</template>

<script lang="ts">
import { micromark } from "micromark";
import { gfm, gfmHtml } from "micromark-extension-gfm";
import { defineComponent, nextTick } from 'vue';
import sanitizeHtml from 'sanitize-html';

export default defineComponent({
  props: {
    markdown: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      copyButtons: [] as HTMLButtonElement[],
    };
  },
  computed: {
    parsedMarkdown() {
      if (!this.markdown) return '';

      const dangerousHTML = micromark(this.markdown, {
        extensions: [gfm()],
        htmlExtensions: [gfmHtml()],
        allowDangerousHtml: true,
      });

      const sanitizedHTML = sanitizeHtml(dangerousHTML, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          '*': [ 'align' ],
        },
      });

      return sanitizedHTML
        .replaceAll('<pre><code>', `<div class="code__wrapper"><pre class="code__block"><button class="copy__button" data-copy>${this.$t('common.copy')}</button><code>`)
        .replaceAll('</code></pre>', '</code></pre></div>');
    },
  },
  watch: {
    async parsedMarkdown() {
      this.removeListeners();

      await nextTick();
      this.copyButtons = Array.from((this.$refs.container as HTMLDivElement).querySelectorAll('[data-copy]'));
      this.addListeners();
    },
  },
  beforeUnmount() {
    this.removeListeners();
  },
  methods: {
    handleCopyButtonClick(e: Event) {
      const copyContent = (e.target as HTMLButtonElement).nextSibling?.textContent;

      if (copyContent) {
        navigator.clipboard.writeText(copyContent);
      }
    },

    addListeners() {
      this.copyButtons.forEach((btn) => {
        btn.addEventListener('click', this.handleCopyButtonClick);
      });
    },

    removeListeners() {
      this.copyButtons.forEach((btn) => {
        btn.removeEventListener('click', this.handleCopyButtonClick);
      });
    },
  },
});
</script>

<style scoped>
.markdown__container {
  color: var(--root-color);
}
</style>

<style>
.markdown__container .code__wrapper {
  position: relative;
}

.markdown__container .code__block {
  background: rgba(0, 0, 0, 0.25);
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 36px;
  overflow: auto;
}

.markdown__container .copy__button {
  position: absolute;
  top: 4px;
  right: 4px;

  box-sizing: border-box;
  border: none;
  border-radius: 2px;
  letter-spacing: 0.25px;
  font-weight: 700;
  color: #FFFFFF;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  padding: 11px;
  font-size: 12px;
  line-height: 14px;
  background-image: linear-gradient(0deg, hsla(355, 78%, 60%, 0.5), hsla(355, 78%, 60%, 0.5)),
                    linear-gradient(180deg, hsl(21, 89%, 52%) 0%, hsl(355, 78%, 60%) 100%);
}

.markdown__container .copy__button:active {
  box-shadow: inset 0px 6px 6px rgba(0, 0, 0, 0.25);
}

.markdown__container h1 {
  font-size: 32px;
}

.markdown__container h2 {
  font-size: 24px;
}

.markdown__container h3 {
  font-size: 20px;
}

.markdown__container h4 {
  font-size: 16px;
}

.markdown__container h5 {
  font-size: 14px;
}

.markdown__container h6 {
  font-size: 14px;
}

.markdown__container img {
  max-width: 100%;
}
</style>
