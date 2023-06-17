<template>
  <BohrBox
    variant="glass"
    class="site__card"
    component="router-link"
    isInteractive
    :to="{ name: 'ProjectOverviewPublic', params: { project: project.name, org: project.createdBy } }"
  >
    <div class="site__image">
      <BohrImage
        :width="336"
        :height="192"
        :hash="'U0TSUAj]IVog%MIUIVIVIVIVIVM{%MM{M{M{'"
        :src="project.imageUrl"
        role="presentation"
        alt=""
      />
    </div>
    <div class="site__info">
      <div>
        <img
          v-show="isFaviconLoaded"
          width="36"
          height="36"
          :src="project.favicon"
          role="presentation"
          alt=""
          @load="isFaviconLoaded = true"
        />
        <img
          v-if="!isFaviconLoaded"
          width="36"
          height="36"
          src="/favicon.ico"
          role="presentation"
          alt=""
        />
      </div>
      <div class="site__info__text">
        <BohrTypography tag="p" variant="body1" class="site__org">
          {{ project.createdBy }}
        </BohrTypography>
        <BohrTypography tag="p" variant="title3" class="site__name">
          {{ project.name }}
        </BohrTypography>
      </div>
    </div>
  </BohrBox>  
</template>

<script lang="ts">
import BohrBox from '@/components/BohrBox.vue';
import BohrImage from '@/components/BohrImage.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import { Project } from '@/types';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  components: {
    BohrBox,
    BohrImage,
    BohrTypography,
  },
  props: {
    project: {
      type: Object as PropType<Project>,
      required: true,
    },
  },
  data() {
    return {
      isImageLoaded: false,
      isFaviconLoaded: false,
    }
  },
});
</script>

<style scoped>
.site__card {
  position: relative;
  z-index: 0;
  width: 100%;
  aspect-ratio: 1.75;
  box-sizing: border-box;
  justify-self: center;
}

.site__image {
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: var(--border-radius);
  overflow: hidden;
  background-color: hsl(0, 0%, 0%);
}

.site__image :deep(.bohr__image) {
  pointer-events: none;
  object-fit: cover;
}

.site__info {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: 36px 1fr;
  align-content: flex-end;
  gap: 16px;
  padding: 16px;
  border-radius: var(--border-radius);
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6375) 66.67%);
  max-width: 100%;
}

.site__info__text {
  width: 100%;
  overflow: hidden;
}

.site__org,
.site__name {
  width: 100%;
  white-space: nowrap;                  
  overflow: hidden;
  text-overflow: ellipsis;
}

.site__name::before {
  content: '/';
  margin-right: 4px;
  color: #666666;
}

.v-enter-active,
.v-leave-active {
  transition: opacity var(--transition);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
