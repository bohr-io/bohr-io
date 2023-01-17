<template>
  <router-link
    class="new__site"
    :aria-label="!withText ? $t('components.newSiteLink') : ''"
    :to="{ name: 'New' }"
  >
    <PlusIcon isGradient />
    <BohrTypography
      v-if="withText"
      variant="title3"
      class="new__site__text"
    >
      {{ $t('components.newSiteLink') }}
    </BohrTypography>
  </router-link>
</template>

<script>
import PlusIcon from '@/components/icons/PlusIcon.vue';
import BohrTypography from '@/components/BohrTypography.vue';

export default {
  components: {
    PlusIcon,
    BohrTypography,
  },
  props: {
    withText: Boolean,
  },
  computed: {
    username() { return this.$store.state.me?.username }
  }
}
</script>

<style scoped>
.new__site {
  position: relative;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border: 2px dashed hsl(0, 100%, 100%, 0.2);
  border-radius: 4px;
  background-color: hsl(0, 0%, 0%, 0.2);
  cursor: pointer;
  color: inherit;
  text-decoration: none;
  transition: box-shadow var(--transition);
  aspect-ratio: 1.75;
}

.new__site:focus,
.new__site:hover {
  box-shadow: 0px 12px 36px 0px rgba(255, 0, 13, 0.3);
}

.new__site::before,
.new__site::before {
  content: "";
  opacity: 0;
  transition: opacity var(--transition);
  position: absolute;
  inset: -2px;
  z-index: 2;
  border-radius: 4px;
  border: 2px solid transparent;
  background-image: linear-gradient(0deg, #E84856, #F16622, #F4CD3B); 
  background-origin: border-box;
  pointer-events: none;

  -webkit-mask: linear-gradient(#fff 0 0) padding-box,
                linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) padding-box,
                linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude; 
}

.new__site:focus::before,
.new__site:hover::before {
  opacity: 1;
}

.new__site__text {
  margin-left: 24px;
  text-transform: capitalize;
}
</style>