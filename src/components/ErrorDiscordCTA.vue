<template>
  <div class="error__discord__cta">
    <ExclamationIcon class="exclamation__icon" />
    <div class="text__container">
      <p>
        {{ $t('components.errorDiscordCTA.text1') }}
      </p>
      <p>
        {{ $t('components.errorDiscordCTA.text2') }}
      </p>
    </div>
    <a
      href="https://discord.com/invite/p3hhfGg2Uy"
      target="_blank"
      rel="noreferrer"
      class="discord__link"
      @mousedown="gtagEvent"
    >
      <img
        src="/assets/svg/discord.svg"
        role="presentation"
        alt=""
        class="discord__logo"
      />
      <BohrTypography
        variant="subtitle2"
        color="hsl(0, 0%, 100%)"
        textTransform="uppercase"
      >
        {{ $t('components.errorDiscordCTA.joinServer') }}
      </BohrTypography>
    </a>
  
    <div class="error__stripes">
      <svg width="320" height="72" viewBox="0 0 320 72" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="stripes-gradient" x1="328" y1="36" x2="2.46232e-06" y2="36" gradientUnits="userSpaceOnUse">
            <stop stop-color="hsl(0, 0%, 0%)" stop-opacity="0.5"/>
            <stop offset="1" stop-color="hsl(0, 0%, 0%)" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 72L40 0H24L0 72H16ZM56 0L32 72H48L72 0H56ZM64 72L88 0H104L80 72H64ZM120 0L96 72H112L136 0H120ZM128 72L152 0H168L144 72H128ZM184 0L160 72H176L200 0H184ZM192 72L216 0H232L208 72H192ZM248 0L224 72H240L264 0H248ZM256 72L280 0H296L272 72H256ZM328 0H312L288 72H304L328 0Z" fill="url(#stripes-gradient)"/>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import BohrTypography from '@/components/BohrTypography.vue';
import ExclamationIcon from '@/components/icons/ExclamationIcon.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    BohrTypography,
    ExclamationIcon,
  },
  methods: {
    gtagEvent(e: MouseEvent) {
      if (![0, 1].includes(e.button)) {
        return;
      }

      this.$gtag.event('discord_link_deploy_error', {
        'app_name': 'bohr.io',
        'screen_name': this.$route.name,
      });
    }
  },
});
</script>

<style scoped>
.error__discord__cta {
  position: relative;
  z-index: 0;
  display: grid;
  grid-template-areas: "icon text" "discord discord";
  grid-template-columns: 24px 1fr;
  gap: 28px;
  justify-content: space-between;
  align-items: center;
  padding: 28px 36px;
  border-radius: 8px;
  background: linear-gradient(180deg, hsla(47, 89%, 59%, 1) 0%, hsla(39, 92%, 57%, 1) 100%);
}

@media screen and (min-width: 768px) {
  .error__discord__cta {
    display: flex;
  }
}

.exclamation__icon {
  flex-shrink: 0;
}

.text__container {
  margin-right: auto;
}

.text__container > p {
  color: hsl(0, 0%, 0%);
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  margin: 0;
}

.text__container > p + p {
  margin-top: 10px;
}

.discord__link {
  grid-area: discord;
  display: inline-flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
  padding: 15px 20px;
  border-radius: 9999px;
  background-color: hsla(235, 86%, 65%, 1);
  text-align: center;
}

.discord__logo {
  width: 20px;
}

.error__stripes {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0.25;
  z-index: -1;
}

.error__stripes > svg {
  display: block;
  width: 100%;
  height: 100%;
}
</style>