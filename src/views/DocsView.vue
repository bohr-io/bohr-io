<template>
  <main class="iframe__container">
    <iframe :src="iframeSrc" class="docs__iframe"></iframe>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  computed: {
    iframeSrc() {
      const docPath = this.$route.params.docPath;
      const docsLocalePathMap = {
        'pt-br': '',
        'en-us': '/en',
      }

      const currentBohrLocale = this.$i18n.locale.toLowerCase();
      const docsLocale = (currentBohrLocale in docsLocalePathMap ? currentBohrLocale : 'en-us') as keyof typeof docsLocalePathMap;

      const currentLocalePath = docsLocalePathMap[docsLocale];
      console.log(currentLocalePath)

      const baseUrl = `https://docs.bohr.io${currentLocalePath}/docs`

      if (!Array.isArray(docPath) || docPath.length === 0) {
        return baseUrl + '/start';
      }

      return baseUrl + `/${docPath.join('/')}`
    },
  },
  mounted() {
    console.log(this.$route)
    this.$store.commit('lockScroll');
  },
  unmounted() {
    this.$store.commit('unlockScroll');
  },
});
</script>

<style scoped>
.iframe__container {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.docs__iframe {
  width: 100%;
  height: 100%;
  border: 2px solid #444950;
  border-radius: 10px;
  flex: 1;
}
</style>