<template>
  <div class="informative__plan">
    <InsightIcon class="insight__icon" />
    <div class="text__container">
      <p>
        {{ $t('components.informativePlan.text1') }}
      </p>
      <p>
        {{ $t('components.informativePlan.text2') }}
      </p>
    </div>
    <a
      href="https://bohr.io/api/stripe/payment"
      target="_blank"
      rel="noreferrer"
      class="stripe__link"
    >
      <BohrTypography
        variant="subtitle2"
        color="hsla(203, 37%, 20%, 1)"
      >
        {{ $t('components.informativePlan.textBottom') }}
      </BohrTypography>
    </a>
  
    <div class="stripes">
      <svg width="320" height="72" viewBox="0 0 320 72" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="stripes-gradient" x1="328" y1="36" x2="2.46232e-06" y2="36" gradientUnits="userSpaceOnUse">
            <stop stop-color="white" stop-opacity="0.9"/>
            <stop offset="1" stop-color="white" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 72L40 0H24L0 72H16ZM56 0L32 72H48L72 0H56ZM64 72L88 0H104L80 72H64ZM120 0L96 72H112L136 0H120ZM128 72L152 0H168L144 72H128ZM184 0L160 72H176L200 0H184ZM192 72L216 0H232L208 72H192ZM248 0L224 72H240L264 0H248ZM256 72L280 0H296L272 72H256ZM328 0H312L288 72H304L328 0Z" fill="url(#stripes-gradient)"/>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import BohrTypography from '@/components/BohrTypography.vue';
import InsightIcon from '@/components/icons/InsightIcon.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    BohrTypography,
    InsightIcon,
  },
});
</script>

<style scoped>
.informative__plan {
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
  /* background: linear-gradient(180deg, hsla(47, 89%, 59%, 1) 0%, hsla(39, 92%, 57%, 1) 100%); */
  background: linear-gradient(180deg, #55DDE0 0%, #53DD6C 100%);
}

@media screen and (min-width: 768px) {
  .informative__plan {
    display: flex;
  }
}

.insight__icon {
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

.stripe__link {
  grid-area: discord;
  display: inline-flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
  padding: 15px 20px;
  font-size: 16px;
  border-radius: 8px;
  background-color: #FFFFFF;
  text-align: center;
}

.discord__logo {
  width: 20px;
}

.stripes {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0.25;
  z-index: -1;
}

.stripes > svg {
  display: block;
  width: 100%;
  height: 100%;
}
</style>