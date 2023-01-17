<template>
  <component
    :is="profileUrlInternal ? 'a' : 'div'"
    :href="profileUrlInternal"
    rel="noreferrer"
    target="_blank"
    class="presence__avatar__container"
    v-tooltip="username"
  >
    <img
      class="presence__avatar__image"
      :width="sizePx"
      :height="sizePx"
      :src="avatarUrl"
      :alt="username"
    />
  </component>
</template>

<script lang="ts">
import getLiveBlocksColor from '@/utils/getLiveBlocksColor';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    colorSeed: {
      type: Number,
      default: 0,
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    username: {
      type: String,
      default: '',
    },
    sizePx: {
      type: Number,
      default: 30,
    },
    profileUrl: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      color: getLiveBlocksColor(this.colorSeed),
      profileUrlInternal: this.profileUrl && (this.profileUrl.startsWith('https://') ? this.profileUrl : `https://${this.profileUrl}`),
    };
  },
});
</script>

<style scoped>
.presence__avatar__container {
  display: inline-block;
}

.presence__avatar__image {
  display: block;
  border: 2px solid v-bind(color);
  border-radius: 9999px;
}
</style>