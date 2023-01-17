<template>
  <div v-if="!isLoading" class="bohr__app__container">
    <BohrMainBar />
    <div class="bohr__app__content">
      <router-view />
    </div>
  </div>
  <ToastDisplay />
</template>

<script lang="ts">
import BohrMainBar from "@/components/BohrMainBar/BohrMainBar.vue";
import ToastDisplay from "@/components/ToastDisplay.vue";
import { UserPresenceInfo } from '@/types';
import { BaseUserMeta, LsonObject, Room } from '@liveblocks/core';
import "intro.js/minified/introjs.min.css";
import { defineComponent } from 'vue';
import toastService from './services/ToastService';

const bohrGlobalRoomId = 'BohrGlobal';
type GlobalPresenceRoom = Room<{}, LsonObject, BaseUserMeta & { info: UserPresenceInfo }, never>

export default defineComponent({
  name: "App",
  components: {
    BohrMainBar,
    ToastDisplay,
  },
  data() {
    return {
      globalPresenceRoom: null as null | GlobalPresenceRoom,
      unsubOthers: () => {},
      unsubErrors: () => {},
      removeToast: () => {},
    }
  },
  computed: {
    spotlightYPosition() { return this.$route.meta.spotlightYPosition || 'top' },
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
    // const themeClass =
    //   this.$store.state.theme.selected || this.$store.state.theme.default;
    // themeClass && document.querySelector(":root").classList.add(themeClass);

    await this.$store.dispatch('getMe');

  },
  mounted() {
    this.initLiveBlocks();
  },
  unmounted() {
    this.leaveLiveBlocks();
  },
  methods: {
    initLiveBlocks() {
      if (window.location.host !== 'bohr.io') {
        return;
      }

      const now = new Date();
      const lastInitDateString = localStorage.getItem('lastLiveBlocksInit');
      const lastInit = lastInitDateString ? new Date(lastInitDateString) : now;

      if (
        lastInitDateString &&
        (now.getTime() - lastInit.getTime()) < 5000
      ) {
        return;
      }

      localStorage.setItem('lastLiveBlocksInit', now.toString());

      this.globalPresenceRoom = this.$liveBlocks.enter(bohrGlobalRoomId, {
        initialPresence: {},
      });

      this.globalPresenceRoom.subscribe('connection', (status) => {
        if (status === 'open' && this.globalPresenceRoom) {
          this.unsubOthers = this.globalPresenceRoom.subscribe('others', (others) => {
            this.$store.state.globalPresenceOther = others;
          });

          this.unsubErrors = this.globalPresenceRoom.subscribe('error', (error) => {
            if (error.code === 4005) {
              this.$store.state.globalPresenceOther = undefined;
              this.leaveLiveBlocks();
            }
          });
        }
      });
    },

    leaveLiveBlocks() {
      this.unsubOthers();
      this.unsubErrors();
      this.$liveBlocks.leave(bohrGlobalRoomId);
    },
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
</style>

<style src="../public/assets/css/introjs.css"></style>
