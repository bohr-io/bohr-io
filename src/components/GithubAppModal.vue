<template>
  <ModalBase
    class="github__app__modal"
    :isVisible="open"
    @close="closeModal"
  >
    <div class="modal__content">
      <BohrIconButton
        :label="$t('common.close')"
        class="close__btn"
        @click="closeModal"
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M31 16C31 24.2843 24.2843 31 16 31C7.71573 31 1 24.2843 1 16C1 7.71573 7.71573 1 16 1C24.2843 1 31 7.71573 31 16ZM32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16ZM21.6126 10.3874C21.096 9.87085 20.2583 9.87085 19.7416 10.3874L16 14.1291L12.2584 10.3874C11.7417 9.87085 10.904 9.87085 10.3874 10.3874C9.87085 10.9041 9.87085 11.7417 10.3874 12.2583L14.1292 16L10.3874 19.7417C9.87085 20.2583 9.87085 21.0959 10.3874 21.6125C10.904 22.1291 11.7417 22.1291 12.2584 21.6125L16 17.8708L19.7416 21.6125C20.2583 22.1291 21.096 22.1291 21.6126 21.6125C22.1291 21.0959 22.1291 20.2583 21.6126 19.7417L17.8708 16L21.6126 12.2583C22.1291 11.7417 22.1291 10.9041 21.6126 10.3874Z" fill="#FFFFFF"/>
        </svg>
      </BohrIconButton>

      <BohrTypography tag="h1" variant="title2" color="hsl(355, 78%, 60%)">
        {{ $t('components.githubAppModal.title') }}
      </BohrTypography>
      <div class="video__container">
        <video
          ref="video"
          class="video__frame"
          width="560"
          height="315"
          src="https://cdn.discordapp.com/attachments/779497275872772138/1062788325053825134/2023-01-11_14-38-10.mp4"
        ></video>
      </div>
      <BohrButton
        component="a"
        :href="installUrl"
        target="_blank"
        rel="noreferrer"
        size="lg"
      >
        {{ $t('components.githubAppModal.button') }}
      </BohrButton>
    </div>
  </ModalBase>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BohrButton from '@/components/BohrButton.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import ModalBase from '@/components/ModalBase.vue';
import BohrIconButton from '@/components/BohrIconButton.vue';

export default defineComponent({
  components: {
    BohrTypography,
    BohrButton,
    ModalBase,
    BohrIconButton
  },
  emits: ['appInstalled'],
  data() {
    return {
      open: false
    }
  },
  computed: {
    installUrl() {
      return window.location.host === "bohr.io"
        ? "https://github.com/apps/bohr-io/installations/new/"
        : "https://github.com/apps/bohr-rocks/installations/new/";
    }
  },
  mounted() {
    (this.$refs.video as HTMLVideoElement).currentTime = 5

    const broadcast = new BroadcastChannel("broadcast");
    broadcast.onmessage = (msg) => {
      if(msg.data === 'appInstalled') {
        broadcast.postMessage("Done");
        this.$emit('appInstalled');
        this.closeModal();
      }
    }

    if (this.$store.state.me) {
      const userHasApp = this.$store.state.me.orgsWithApp?.includes(this.$store.state.me.username);
      if (userHasApp) {
        return;
      }
    }

    this.open = true
  },
  methods: {
    closeModal() {
      this.open = false
    },
  },
});
</script>

<style scoped>
.github__app__modal {
  width: 80%;
  max-width: 810px;
}

.modal__content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
}

.close__btn {
  position: absolute;
  top: -15px;
  right: 0px;
}

.video__container {
  align-self: center;
}

.video__container {
  width: 100%;
  aspect-ratio: 16 / 9;
}

.video__frame {
  width: 100%;
  height: 100%;
}
</style>