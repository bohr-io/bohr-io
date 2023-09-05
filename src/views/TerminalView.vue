<template>
  <main class="container">
    <BackButton :to="{ name: 'Projects' }" />
    <header class="header__container">
      <p class="header__comment">{{ $t('common.project', 2) }}</p>
      <h1 class="header__title">Terminal</h1>
    </header>
    <iframe ref="iframeTerminal" class="iframeTerminal" sandbox="allow-same-origin allow-top-navigation allow-forms allow-popups allow-scripts allow-pointer-lock allow-modals allow-popups-to-escape-sandbox"></iframe>
  </main>
</template>

<script lang="ts">
import BackButton from "@/components/BackButton.vue";
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    BackButton
  },
  mounted() {
    const token = this.getCookie('BohrSession');
    if (token && this.$refs.iframeTerminal) {
      (this.$refs.iframeTerminal as HTMLIFrameElement).src = `/terminal/iframe.html?token=${token}`;
    }

    window.addEventListener('message', this.messageListener);
  },
  beforeUnmount() {
    window.removeEventListener('message', this.messageListener);
  },
  methods: {
    messageListener({ data }: MessageEvent<{ owner: string, repo: string }>) {
      this.$router.push({
        name: 'ProjectOverview',
        params: {
          org: data.owner,
          project: data.repo,
        }
      })
    },

    getCookie(name: string) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop()?.split(';').shift();
      }
    }
  }
});
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  font-family: "Helvetica", sans-serif;
}

.header__container {
  margin: 0 0 32px;
  position: relative;
}

.header__comment {
  color: #c3a32e;
  font-size: 18px;
  font-weight: 700;
  line-height: 21px;
  margin: 0;
}

.header__comment::before {
  content: "/";
  margin-right: 4px;
  color: #625217;
}

.header__title {
  color: #f4cc3a;
  font-weight: 700;
  font-size: 48px;
  line-height: 55px;
  margin: 0 0 24px;
}

.header__help__link {
  position: relative;
  top: -20px;
  left: -10px;
}

.header__description {
  font-size: 14px;
  line-height: 18px;
  margin: 0;
  white-space: pre-line;
  display: none;
}

@media screen and (max-width: 992px){
  .header__container{
    padding-top: 20px;
  }
}

.iframeTerminal{
  width: 100%;
  height: 660px;
  border: none;
}
</style>
