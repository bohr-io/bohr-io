<template>
  <div class="bohr__image">
    <BohrIcon class="bohr__image__fallback" :sizePx="72" />
    <img
      :src="src"
      :width="width"
      :height="height"
      class="bohr__image_img"
      :class="{ hidden: !isLoaded }"
      @load="isLoaded = true"
      v-bind="$attrs"
      loading="lazy"
    />
    <canvas
      v-if="hash && !isLoaded"
      ref="canvas"
      class="bohr__image__canvas"
      :width="canvasWidth"
      :height="canvasHeight"
    ></canvas>
  </div>
</template>

<script lang="ts">
import BohrIcon from '@/components/icons/BohrIcon.vue';
import { decode } from 'blurhash';
import { defineComponent } from 'vue';

export default defineComponent({
  inheritAttrs: false,
  components: {
    BohrIcon,
  },
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    hash: {
      type: String,
    },
    src: {
      type: String,
      required: true,
    },
    objectFit: {
      type: String,
      default: 'cover',
    }
  },
  data() {
    const canvasWidth = 30;
    const imageRatio = this.width / this.height;
    const canvasHeight = Math.floor(canvasWidth / imageRatio);

    return {
      isLoaded: false,
      canvasWidth,
      canvasHeight,
    }
  },
  mounted() {
    this.setCanvas();
  },
  methods: {
    setCanvas() {
      const canvas = this.$refs.canvas as HTMLCanvasElement;

      if (!this.hash || !canvas) {
        return;
      }

      const pixels = decode(this.hash, this.canvasWidth, this.canvasHeight);
      const ctx = canvas.getContext('2d');
      const imageData = ctx?.createImageData(this.canvasWidth, this.canvasHeight);
      imageData?.data.set(pixels);
      if (imageData) ctx?.putImageData(imageData, 0, 0);
    },
  },
});
</script>

<style>
.bohr__image {
  position: relative;
  width: 100%;
  height: 100%;
}

.bohr__image__fallback {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: -1;
  transform: translate(-50%, -50%);
}

.bohr__image_img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: v-bind(objectFit);
}

.bohr__image_img.hidden {
  opacity: 0;
}

.bohr__image__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>
