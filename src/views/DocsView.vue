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

      if (!Array.isArray(docPath) || docPath.length === 0) {
        return 'https://docs.bohr.io/docs/start';
      }

      return `https://docs.bohr.io/docs/${docPath.join('/')}`
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