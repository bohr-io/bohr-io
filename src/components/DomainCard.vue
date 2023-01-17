<template>
  <li>
    <router-link :tabindex="isPlaceholder ? -1 : 0" :to="{ name: 'DomainDetail', params: { domain: domain.name } }" class="domain__card" :class="{ placeholder: isPlaceholder }">
      <SkeletonLoading :isShowing="isPlaceholder" borderRadius="16px">
        <figure class="domain__favicon">
          <img
            v-show="showDefaultFavicon"
            src="/favicon.ico"
            role="presentation"
            alt=""
            width="52"
            height="52"
          />
          <img
            v-show="!showDefaultFavicon"
            :src="domain.faviconUrl"
            role="presentation"
            alt=""
            width="52"
            height="52"
            @load="showDefaultFavicon = false"
            @error="showDefaultFavicon = true"
          />
          <div
            v-if="domain.status && domain.status !== 'ACTIVE'"
            class="not__active"
            v-tooltip="{
              content: $t('domains.notActiveLabel'),
            }"
          >
            <img
              src="/assets/svg/log-warn.svg"
              width="12"
              height="10"
              alt=""
            />
          </div>
        </figure>
      </SkeletonLoading>
      <BohrTypography variant="subtitle2" textAlign="center" class="domain__name">
        <SkeletonLoading :isShowing="isPlaceholder">
          {{ domain.name }}
        </SkeletonLoading>
      </BohrTypography>
      <BohrTypography variant="body3" textAlign="center" color="hsl(0, 0%, 60%)" class="domain__username">
        <SkeletonLoading :isShowing="isPlaceholder">
          {{ domain.username }}
        </SkeletonLoading>
      </BohrTypography>
    </router-link>
  </li>
</template>

<script lang="ts">
import BohrTypography from '@/components/BohrTypography.vue';
import { Domain } from '@/types';
import { defineComponent, PropType } from 'vue';
import SkeletonLoading from './SkeletonLoading.vue';

export default defineComponent({
  components: {
    BohrTypography,
    SkeletonLoading
  },
  props: {
    domain: {
      type: Object as PropType<Domain>,
      default: () => ({
        name: 'name.com',
        username: 'username',
        favicon: undefined,
      }),
    },

    isPlaceholder: Boolean,
  },
  data() {
    return {
      showDefaultFavicon: true,
    };
  },
});
</script>

<style scoped>
.domain__card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding-block: 40px 16px;
  padding-inline: 8px;
  background-color: hsla(0, 0%, 0%, 0.25);
  border-radius: 4px;
  cursor: pointer;
  transition: box-shadow var(--transition);
  color: inherit;
}

.domain__card.placeholder {
  pointer-events: none;
}

.domain__card:focus,
.domain__card:hover {
  box-shadow: 0px 12px 36px 0px rgba(255, 0, 13, 0.3);
}

.domain__card::before,
.domain__card::before {
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

.domain__card:focus::before,
.domain__card:hover::before {
  opacity: 1;
}

.domain__favicon {
  position: relative;
  border-radius: 16px;
  width: 52px;
  height: 52px;
  margin: 0;
  padding: 10px;
  background-color: hsl(0, 0%, 0%);
  box-shadow: 0 0 32px hsl(0, 0%, 100%, 0.1);
  font-size: 0;
}

.not__active {
  position: absolute;
  top: calc(100% - 5px);
  left: calc(100% - 5px);
  transform: translate(-50%, -50%);
  background: linear-gradient(180deg, hsla(204, 25%, 12%, 1) 0%, hsla(227, 17%, 10%, 1) 100%);
  border: 1px solid hsla(0, 0%, 100%, 0.1);
  padding: 6px;
  border-radius: 9999px;
  width: max-content;
  height: max-content;
}

.domain__name {
  margin-top: 42px;
}

.domain__username {
  margin-top: 8px;
}
</style>