<template>
  <div v-if="!isLoading" class="bohr__app__container">
    <BohrMainBar />
    <div class="bohr__app__content" :class="{ no__padding: noAppContentPadding }">
      <router-view />
    </div>
  </div>
  <ToastDisplay />
  <GlobalPresenceRoom />
</template>

<script lang="ts">
import BohrMainBar from "@/components/BohrMainBar/BohrMainBar.vue";
import ToastDisplay from "@/components/ToastDisplay.vue";
import "intro.js/minified/introjs.min.css";
import { defineComponent } from 'vue';
import GlobalPresenceRoom from './components/GlobalPresenceRoom.vue';
import toastService from './services/ToastService';

export default defineComponent({
  name: "App",
  components: {
    BohrMainBar,
    ToastDisplay,
    GlobalPresenceRoom,
},
  data() {
    return {
      removeToast: () => {},
    }
  },
  computed: {
    spotlightYPosition() { return this.$route.meta.spotlightYPosition || 'top' },
    noAppContentPadding() { return this.$route.meta.noAppContentPadding },
    isLoading() { return !this.$store.state.me },
    isSaving() { return !this.$store.state.isSaving },
  },
  watch: {
    isSaving() {
      if (!this.isSaving) {
        this.removeToast = toastService.warn(this.$t('common.savingMessage'), { isFixed: true });
      } else {
        this.removeToast();
      }
    },
  },
  async beforeCreate() {
    await this.$store.dispatch('getMe');
  },
});
</script>

<style scoped>
.bohr__app__container {
  --spotlight-y-position: v-bind(spotlightYPosition);
  display: flex;
  background-image: radial-gradient(50vw 50vw at center var(--spotlight-y-position), #E8485533 0%, #0E171D33 50vw);
}

.bohr__app__content {
  width: 100%;
  padding: 72px 48px 48px;
  flex: 1;
  min-height: 100vh;
  box-sizing: border-box;
}

@media screen and (max-width: 1279px) {
  .bohr__app__container {
    overflow: hidden;
  }

  .bohr__app__content {
    padding-left: 36px;
    padding-right: 36px;
    transition: transform var(--transition);
  }
}

.bohr__app__content.no__padding {
  padding: 0px;
}
</style>

<style src="../public/assets/css/introjs.css"></style>
