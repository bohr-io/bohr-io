<template>
  <div class="placeholder__page">
    <div class="placeholder__text">
      <BohrTypography tag="h2" class="placeholder__title">
        {{ $t('components.placeholderPage.title') }}
      </BohrTypography>
      <BohrTypography variant="title2" class="placholder__description">
        {{ $t('components.placeholderPage.description') }}
      </BohrTypography>
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
          class="discord__text"
        >
          {{ $t('components.placeholderPage.joinServer') }}
        </BohrTypography>
      </a>

      <NewsletterComponent />
    </div>
    <img
      src="/assets/svg/placeholderpage-image.svg"
      role="presentation"
      alt=""
      class="placeholder__image"
    >
  </div>
</template>

<script lang="ts">
import BohrTypography from '@/components/BohrTypography.vue';
import NewsletterComponent from '@/components/NewsletterComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    BohrTypography,
    NewsletterComponent
  },
  methods: {
    gtagEvent(e: MouseEvent) {
      if (![0, 1].includes(e.button)) {
        return;
      }

      this.$gtag.event('discord_link_internal', {
        'app_name': 'bohr.io',
        'screen_name': this.$route.name,
      });
    }
  },
});
</script>

<style scoped>
.placeholder__page {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.placeholder__title {
  background-clip: text;
  background-image: linear-gradient(180deg, hsl(181, 69%, 61%) 0%, hsl(131, 67%, 60%) 100%);;
  color: transparent;
  font-weight: 700;
  font-size: 36px;
  line-height: 41px;
  letter-spacing: -0.04em;
}

.placholder__description {
  font-weight: 400;
  max-width: 80%;
  margin-block: 24px 36px;
}

.discord__link {
  display: inline-flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
  padding: 15px 20px;
  border-radius: 9999px;
  background-color: hsla(235, 86%, 65%, 1);
}

.discord__logo {
  width: 20px;
}

.discord__text {
  text-transform: uppercase;
  font-size: 17px;
}

.placeholder__image {
  max-width: 100%;
  margin-left: auto;
}

@media screen and (max-width: 767px) {
  .placeholder__page {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
