<template>
  <ModalBase
    class="github__app__modal"
    :isVisible="open"
    @close="closeModal"
  >
    <div class="modal__content">
      <div class="text__container">
        <BohrTypography tag="h1" variant="title2" color="hsl(355, 78%, 60%)">
          {{ $t('components.githubAppModal.title') }}
        </BohrTypography>
        <BohrTypography tag="p" class="text">
          {{ $t('components.githubAppModal.text') }}
        </BohrTypography>
        <div class="actions__container">
          <BohrButton
            component="a"
            :href="installUrl"
            target="_blank"
            rel="noreferrer"
            isFullWidth
          >
            {{ $t('components.githubAppModal.button') }}
          </BohrButton>
          <BohrButton
            variant="text"
            color="black"
            isFullWidth
            @click="closeModal"
          >
            {{ $t('common.cancel') }}
          </BohrButton>
        </div>
      </div>
      <img
        width="500"
        height="500"
        src="/assets/img/github-install.png"
        :alt="$t('components.githubAppModal.imgAlt')"
        class="installation__img"
      />
    </div>
  </ModalBase>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BohrButton from '@/components/BohrButton.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import ModalBase from '@/components/ModalBase.vue';

export default defineComponent({
  components: {
    BohrTypography,
    BohrButton,
    ModalBase,
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
  display: grid;
  align-items: center;
  text-align: center;
}

.text__container {
  display: contents;
}

.text {
  margin-block: 24px;
  line-height: 28px;
}

.actions__container {
  margin-top: 24px;
  padding-inline: 22px;
  order: 1;
}

.actions__container > :nth-child(2) {
  margin-top: 16px;
}

.installation__img {
  width: 100%;
  height: auto;
}

@media screen and (min-width: 767px) {
  .modal__content {
    gap: 48px;
    grid-template-columns: 1fr 1fr;
  }

  .text__container {
    display: block;
  }
}
  
@media screen and (min-width: 992px) {
  .modal__content {
    margin: -24px;
    grid-template-columns: 1fr 2fr;
  }

  .actions__container {
    margin-top: 50px;
  }
}
</style>