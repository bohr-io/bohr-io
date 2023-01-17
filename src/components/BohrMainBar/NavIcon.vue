<template>
  <div class="icon__container" :class="{ highlighted: isHighlighted }">
    <component
      :is="icon"
      :isFilled="isHighlighted"
      :sizePx="24"
    />
  </div>
</template>

<script lang="ts">
import AccountIcon from '@/components/icons/AccountIcon.vue';
import DiscordIcon from '@/components/icons/DiscordIcon.vue';
import DocsIcon from '@/components/icons/DocsIcon.vue';
import DomainsIcon from '@/components/icons/DomainsIcon.vue';
import HomeIcon from '@/components/icons/HomeIcon.vue';
import ProfileIcon from '@/components/icons/ProfileIcon.vue';
import SitesIcon from '@/components/icons/SitesIcon.vue';
import { markRaw } from '@vue/reactivity';
import { defineComponent } from 'vue';

const iconsMap = {
  AccountIcon,
  DiscordIcon,
  DomainsIcon,
  DocsIcon,
  HomeIcon,
  ProfileIcon,
  SitesIcon,
};

export default defineComponent({
  props: {
    isHighlighted: Boolean,

    iconName: {
      type: String,
      required: true,
      validator(value: string) {
        const availableIcons = Object.keys(iconsMap);
        const isValid = availableIcons.includes(value);
        
        if (!isValid) {
          console.warn('Invalid NavIcon prop: iconName.');
          console.warn('It should be one of: ', availableIcons);
        }
        
        return isValid;
      },
    },
  },
  data() {
    const icon = this.iconName in iconsMap
      ? markRaw(iconsMap[this.iconName as keyof typeof iconsMap])
      : 'div'

    return {
      icon,
    }
  }
});
</script>

<style scoped>
.icon__container {
  position: relative;
  width: 24px;
  height: 24px;
  z-index: 0;
}

.icon__container::before {
  content: '';
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: -1;
  transition: box-shadow var(--transition);
}

.icon__container.highlighted::before {
  box-shadow: 0px 0px 25px 12px var(--nav-shadow-color, #FFD000);
}
</style>